#!/usr/bin/env bash
#
# Builds the FTP-ready package for the UPEC website:
#   1. Static export of the Next.js site (pages, images, PWA)
#   2. Pure-PHP form backend from deploy/ftp (all 4 forms keep working)
#
# Output:
#   ftp-deploy/      the complete, upload-ready folder
#   ftp-deploy.zip   zip of that folder for the FileZilla workflow
#
# The repository's own files are always restored, even if the build fails.

set -euo pipefail
cd "$(dirname "$0")/.."

BACKUP_DIR=".export-backup"
DEPLOY_SRC="deploy/ftp"
OUT_DIR="ftp-deploy"
ZIP_FILE="ftp-deploy.zip"
# Server-only parts of the app, replaced by PHP/static equivalents in deploy/ftp
APP_DIRS=("src/app/api" "src/app/admin" "src/app/(auth)")
# manifest.ts is swapped for a static manifest.webmanifest during export
APP_FILES=("src/app/manifest.ts")

rm -rf "$BACKUP_DIR"
mkdir -p "$BACKUP_DIR/app"

restore() {
  if [[ -f "$BACKUP_DIR/next.config.ts" ]]; then
    mv -f "$BACKUP_DIR/next.config.ts" next.config.ts
  fi
  for dir in "${APP_DIRS[@]}"; do
    local_base="$BACKUP_DIR/app/$(basename "$dir")"
    if [[ -d "$local_base" && ! -e "$dir" ]]; then
      mv "$local_base" "$dir"
    fi
  done
  for file in "${APP_FILES[@]}"; do
    local_base="$BACKUP_DIR/app/$(basename "$file")"
    if [[ -f "$local_base" && ! -e "$file" ]]; then
      mv "$local_base" "$file"
    fi
  done
  rm -rf "$BACKUP_DIR"
}
trap restore EXIT

echo "==> Preparing static-export build"
cp next.config.ts "$BACKUP_DIR/next.config.ts"
cat > next.config.ts <<'EOF'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
EOF

# Server-only parts of the app (API routes, admin area) are replaced by the
# PHP handlers in deploy/ftp for this export.
for dir in "${APP_DIRS[@]}"; do
  if [[ -d "$dir" ]]; then
    mv "$dir" "$BACKUP_DIR/app/$(basename "$dir")"
  fi
done

# Metadata routes (manifest.ts) cannot be statically exported by Next 16;
# a static manifest.webmanifest from deploy/ftp is used instead.
for file in "${APP_FILES[@]}"; do
  if [[ -f "$file" ]]; then
    mv "$file" "$BACKUP_DIR/app/$(basename "$file")"
  fi
done

echo "==> Installing dependencies (if needed)"
# --ignore-scripts: skips `prisma generate` (downloads engine binaries and is
# not needed for the static export — all DB code is excluded from this build).
if [[ ! -d node_modules/next ]]; then
  npm ci --ignore-scripts --no-audit --no-fund
fi

echo "==> Building static site"
rm -rf out
npx next build

echo "==> Assembling $OUT_DIR"
rm -rf "$OUT_DIR"
cp -r out "$OUT_DIR"
cp -r "$DEPLOY_SRC/." "$OUT_DIR/"
mkdir -p "$OUT_DIR/api/_submissions"
cp "$DEPLOY_SRC/api/_submissions/.htaccess" "$OUT_DIR/api/_submissions/.htaccess"
rm -f "$OUT_DIR/.htaccess.bak"

echo "==> Zipping"
rm -f "$ZIP_FILE"
(cd "$(dirname "$OUT_DIR")" && zip -rq "$ZIP_FILE" "$OUT_DIR")

echo ""
echo "Done."
echo "  Folder : $OUT_DIR/   (upload its contents to public_html)"
echo "  Zip    : $ZIP_FILE"
