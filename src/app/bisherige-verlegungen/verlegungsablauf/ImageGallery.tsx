"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";
import { PROCESS_QUERYResult } from "@/sanity/types";

type ProcessData = NonNullable<PROCESS_QUERYResult>;
type GalleryImage = NonNullable<ProcessData["images"]>[number];

export default function ImageGallery({ images }: { images: GalleryImage[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const goToImage = (index: number) => setCurrentImageIndex(index);

  // Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) nextImage();
    if (distance < -50) prevImage();

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentImage = images[currentImageIndex];

  return (
    <div className="bg-white rounded-lg shadow-sm w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto overflow-hidden">
      {/* Main Image */}
      <div
        className="relative w-full bg-gray-100 flex justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {currentImage.asset && (
          <Image
            src={urlFor(currentImage.asset).url()}
            alt={currentImage.caption ?? ""}
            width={800} // realistische Basisbreite
            height={600} // realistische Höhe
            className="w-full h-auto object-contain"
            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw"
            priority
          />
        )}

        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-opacity"
          aria-label="Vorheriges Bild"
        >
          ‹
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-opacity"
          aria-label="Nächstes Bild"
        >
          ›
        </button>

        {/* Counter */}
        <div className="absolute top-4 right-4 bg-black/60 text-white px-4 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Caption */}
      {currentImage.caption && (
        <div className="p-6 bg-gray-50">
          <p className="text-gray-700 text-center text-sm sm:text-base">
            {currentImage.caption}
          </p>
        </div>
      )}

      {/* Thumbnails */}
      <div className="p-4 border-t overflow-x-hidden">
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image._key}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden ${
                index === currentImageIndex
                  ? "ring-2 ring-blue-600"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {image.asset && (
                <Image
                  src={urlFor(image.asset).url()}
                  alt={image.caption ?? ""}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  sizes="80px"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
