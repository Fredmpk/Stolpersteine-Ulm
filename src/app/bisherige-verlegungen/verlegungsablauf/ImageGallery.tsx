// app/bisherige-verlegungen/verlegungsablauf/ImageGallery.tsx
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

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full sm:w-[350px] md:w-full">
      {/* Main Image */}
      <div
        className="relative w-full aspect-4/3  bg-gray-200 group touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images[currentImageIndex].asset && (
          <Image
            src={urlFor(images[currentImageIndex].asset).url()}
            alt={images[currentImageIndex].caption ?? ""}
            fill
            className="object-contain"
            priority
          />
        )}

        {/* Navigation Buttons - Hidden on mobile, visible on hover on desktop */}
        <button
          onClick={prevImage}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all opacity-0 md:group-hover:opacity-100 touch-manipulation"
          aria-label="Vorheriges Bild"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextImage}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all opacity-0 md:group-hover:opacity-100 touch-manipulation"
          aria-label="Nächstes Bild"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Image Counter */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/60 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>

        {/* Swipe indicator for mobile */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden">
          <div className="flex gap-1 items-center text-white/70 text-xs bg-black/40 px-3 py-1 rounded-full">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span>Wischen</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="p-4 sm:p-6 bg-gray-50">
        <p className="text-gray-700 text-center text-sm sm:text-base">
          {images[currentImageIndex].caption}
        </p>
      </div>

      {/* Thumbnail Navigation - Scrollable on mobile */}
      <div className="p-3 sm:p-4 bg-white border-t w-full overflow-hidden">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {images.map((image, index) => (
            <button
              key={image._key}
              onClick={() => goToImage(index)}
              className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all touch-manipulation ${
                index === currentImageIndex
                  ? "ring-2 sm:ring-4 ring-blue-600 scale-105"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {image.asset && (
                <Image
                  src={urlFor(image.asset).url()}
                  alt={image.caption ?? ""}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Dot indicators for mobile - alternative navigation */}
      <div className="flex justify-center gap-2 p-3 bg-white border-t md:hidden">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-2 h-2 rounded-full transition-all touch-manipulation ${
              index === currentImageIndex ? "bg-blue-600 w-6" : "bg-gray-300"
            }`}
            aria-label={`Gehe zu Bild ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
