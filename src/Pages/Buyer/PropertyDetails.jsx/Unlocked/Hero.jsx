import React, { useState, useEffect } from "react";
import {
  FaHeart,
  FaShareAlt,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaSearchPlus,
  FaSearchMinus,
  FaExpand,
} from "react-icons/fa";
import { useProperty } from "./Layout";
import { addPropertyBookmark } from "../../../../Redux/Bookmark";

function Hero() {
  const property = useProperty();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Combine feature image with other images
  const allImages = [
    property.propertyFeatureImage,
    ...(property.images?.map((img) => img.image) || []),
  ].filter(Boolean);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1,
    );
  };

  const handleBookmark = async () => {
    if (!property.id) return;

    setBookmarkLoading(true);
    try {
      await addPropertyBookmark(property.id);
      setIsBookmarked(true);
      setToast("✓ Property added to bookmarks");
      setTimeout(() => setToast(""), 4000);
    } catch (err) {
      setToast(err.message || "Failed to bookmark property");
      setTimeout(() => setToast(""), 4000);
    } finally {
      setBookmarkLoading(false);
    }
  };

  // Lightbox functions
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setZoomLevel(1);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setZoomLevel(1);
    document.body.style.overflow = "auto";
  };

  const lightboxPrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    setZoomLevel(1);
  };

  const lightboxNext = () => {
    setLightboxIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    setZoomLevel(1);
  };

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };

  const resetZoom = () => {
    setZoomLevel(1);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <div className="w-full relative mb-28">
      <div
        className="w-full h-56 md:h-96 lg:h-[720px] overflow-hidden cursor-pointer"
        onClick={() => openLightbox(currentImageIndex)}
      >
        <img
          src={allImages[currentImageIndex] || "/propertydummyimage.jpg"}
          alt={property.propertyName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 flex gap-2 pointer-events-auto flex-wrap">
          {property.total_inspection_reports > 0 && (
            <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Inspection Report Available
            </span>
          )}
          {property.status && (
            <span className="bg-[#00c950] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Active Listing
            </span>
          )}
          {property.propertyType && (
            <span className="bg-amber-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              {property.propertyType}
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-3 pointer-events-auto">
          <button
            className={`p-2 rounded-full shadow flex items-center justify-center transition ${
              isBookmarked
                ? "bg-red-500 hover:bg-red-600"
                : "bg-white/80 hover:bg-white"
            }`}
            onClick={handleBookmark}
            disabled={bookmarkLoading}
          >
            <FaHeart
              className={`${isBookmarked ? "text-white" : "text-slate-700"}`}
            />
          </button>
          {/* <button className="bg-white/80 hover:bg-white p-2 rounded-full shadow flex items-center justify-center">
            <FaShareAlt className="text-slate-700" />
          </button> */}
        </div>

        {allImages.length > 1 && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 pointer-events-auto">
            <button
              className="bg-white/80 p-2 rounded-full shadow hover:bg-white"
              onClick={handlePrevImage}
            >
              <FaChevronLeft className="text-slate-700" />
            </button>
            <div className="bg-black/60 text-white text-xs px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {allImages.length}
            </div>
            <button
              className="bg-white/80 p-2 rounded-full shadow hover:bg-white"
              onClick={handleNextImage}
            >
              <FaChevronRight className="text-slate-700" />
            </button>
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg animate-slide-up z-40">
          {toast}
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/30 p-3 rounded-full transition z-50"
          >
            <FaTimes className="text-2xl" />
          </button>

          {/* Zoom controls */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 rounded-full px-4 py-2 z-50">
            <button
              onClick={zoomOut}
              disabled={zoomLevel <= 1}
              className="text-white hover:text-gray-300 disabled:text-gray-600 p-2 transition"
            >
              <FaSearchMinus className="text-lg" />
            </button>
            <span className="text-white text-sm min-w-[60px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={zoomIn}
              disabled={zoomLevel >= 3}
              className="text-white hover:text-gray-300 disabled:text-gray-600 p-2 transition"
            >
              <FaSearchPlus className="text-lg" />
            </button>
            <button
              onClick={resetZoom}
              className="text-white hover:text-gray-300 p-2 transition ml-2"
            >
              <FaExpand className="text-lg" />
            </button>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-4 py-2 rounded-full z-50">
            {lightboxIndex + 1} / {allImages.length}
          </div>

          {/* Previous button */}
          {allImages.length > 1 && (
            <button
              onClick={lightboxPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 p-4 rounded-full transition z-50"
            >
              <FaChevronLeft className="text-2xl" />
            </button>
          )}

          {/* Next button */}
          {allImages.length > 1 && (
            <button
              onClick={lightboxNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 p-4 rounded-full transition z-50"
            >
              <FaChevronRight className="text-2xl" />
            </button>
          )}

          {/* Main image */}
          <div className="w-full h-full flex items-center justify-center overflow-auto p-16">
            <img
              src={allImages[lightboxIndex]}
              alt={`${property.propertyName} - Image ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Thumbnail strip */}
          {allImages.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-2 rounded-lg max-w-[90vw] overflow-x-auto z-50">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setLightboxIndex(idx);
                    setZoomLevel(1);
                  }}
                  className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden transition ${
                    idx === lightboxIndex
                      ? "ring-2 ring-white opacity-100"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Hero;
