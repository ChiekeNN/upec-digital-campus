import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "UPEC | University of Port Harcourt Entrepreneurial Centre",
    short_name: "UPEC",
    description:
      "Learn entrepreneurship, apply to programmes, access courses and grow your enterprise with the University of Port Harcourt Entrepreneurial Centre.",
    start_url: "/",
    display: "standalone",
    background_color: "#003b73",
    theme_color: "#003b73",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["education", "business", "productivity"],
  };
}
