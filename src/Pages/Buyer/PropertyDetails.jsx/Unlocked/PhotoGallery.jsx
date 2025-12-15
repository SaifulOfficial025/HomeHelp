import React from "react";

function PhotoGallery() {
  const imageUrl =
    "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80";
  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-slate-100 max-w-xl mx-auto">
      <div className="text-xl font-extrabold text-slate-800 mb-3">
        Photo Gallery <span className="font-bold">(1)</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-28 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
          <img
            src={imageUrl}
            alt="Gallery"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default PhotoGallery;
