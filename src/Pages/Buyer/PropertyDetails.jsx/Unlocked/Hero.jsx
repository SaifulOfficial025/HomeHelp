import React, { useState } from "react";
import {
  FaHeart,
  FaShareAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useProperty } from "./Layout";
import { addPropertyBookmark } from "../../../../Redux/Bookmark";

function Hero() {
  const property = useProperty();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  return (
    <div className="w-full relative mb-28">
      <div className="w-full h-56 md:h-96 lg:h-[420px] overflow-hidden ">
        <img
          src={allImages[currentImageIndex] || "/propertydummyimage.jpg"}
          alt={property.propertyName}
          className="w-full h-full object-cover"
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
          <button className="bg-white/80 hover:bg-white p-2 rounded-full shadow flex items-center justify-center">
            <FaShareAlt className="text-slate-700" />
          </button>
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
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg animate-slide-up">
          {toast}
        </div>
      )}
    </div>
  );
}

export default Hero;
