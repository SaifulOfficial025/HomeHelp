import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../../Redux/config";

function UnlockedPhotoGallery() {
  const { slug } = useParams();
  const [images, setImages] = useState([]);
  const [featureImage, setFeatureImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    fetchPropertyData();
  }, [slug]);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${BASE_URL}/api/v1/property/${slug}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (result.success) {
        const allImages = [];

        // Add feature image first
        if (result.data.propertyFeatureImage) {
          setFeatureImage(result.data.propertyFeatureImage);
          allImages.push(result.data.propertyFeatureImage);
        }

        // Add additional images
        if (result.data.images && result.data.images.length > 0) {
          result.data.images.forEach((img) => {
            allImages.push(img.image);
          });
        }

        setImages(allImages);
      }
    } catch (error) {
      console.error("Error fetching property data:", error);
    } finally {
      setLoading(false);
    }
  };

  const openFullscreen = (index) => {
    setSelectedImageIndex(index);
    setZoom(1);
  };

  const closeFullscreen = () => {
    setSelectedImageIndex(null);
    setZoom(1);
  };

  const goToNext = () => {
    if (selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
      setZoom(1);
    }
  };

  const goToPrev = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
      setZoom(1);
    }
  };

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleKeyDown = (e) => {
    if (selectedImageIndex === null) return;

    switch (e.key) {
      case "Escape":
        closeFullscreen();
        break;
      case "ArrowRight":
        goToNext();
        break;
      case "ArrowLeft":
        goToPrev();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (selectedImageIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedImageIndex]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-600">Loading images...</div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-600">No images available</div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-white border rounded-2xl border-slate-200 px-6 shadow-lg ">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Photo Gallery</h2>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => openFullscreen(index)}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
          >
            <img
              src={image}
              alt={`Property ${index + 1}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              {index + 1}
              {/* /{images.length} */}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Image Viewer */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            title="Close (Esc)"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold">
            {selectedImageIndex + 1} / {images.length}
          </div>

          {/* Previous Button */}
          {selectedImageIndex > 0 && (
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2"
              title="Previous (←)"
            >
              <svg
                className="w-10 h-10"
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
          )}

          {/* Next Button */}
          {selectedImageIndex < images.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2"
              title="Next (→)"
            >
              <svg
                className="w-10 h-10"
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
          )}

          {/* Zoom Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/60 px-4 py-2 rounded-lg">
            <button
              onClick={zoomOut}
              disabled={zoom <= 0.5}
              className="text-white hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Zoom Out"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                />
              </svg>
            </button>
            <span className="text-white text-sm font-semibold min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={zoomIn}
              disabled={zoom >= 3}
              className="text-white hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Zoom In"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                />
              </svg>
            </button>
          </div>

          {/* Image */}
          <div className="max-w-7xl max-h-[85vh] overflow-auto">
            <img
              src={images[selectedImageIndex]}
              alt={`Property ${selectedImageIndex + 1}`}
              className="max-w-full h-auto transition-transform"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UnlockedPhotoGallery;
