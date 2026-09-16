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
      className={className}
      onError={() => {
        if (!failed) {
          setFailed(true);
          setImgSrc("/upec-building.png");
        }
      }}
    />
  );
}
