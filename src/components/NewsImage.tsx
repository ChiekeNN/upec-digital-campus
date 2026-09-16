"use client";

import { useState } from "react";

type NewsImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function NewsImage({ src, alt, className }: NewsImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      // object-top keeps the top of the photo visible: news photos are
      // mostly portrait phone shots, and object-cover's default
      // centre position was chopping off the top of the image
      className={`object-top ${className ?? ""}`.trim()}
      onError={() => {
        if (!failed) {
          setFailed(true);
          setImgSrc("/upec-building.png");
        }
      }}
    />
  );
}
