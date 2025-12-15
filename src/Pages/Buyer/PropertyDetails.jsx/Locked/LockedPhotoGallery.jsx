import React from "react";
import { FaLock } from "react-icons/fa";

function LockedPhotoGallery() {
  const imageUrl =
    "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80";
  return (
    <div className="w-full bg-white rounded-2xl shadow p-6 border border-slate-100 max-w-full mx-auto">
      <div className="text-xl font-extrabold text-slate-800 mb-3">
        Photo Gallery
      </div>
      <div className="flex items-center gap-8">
        <div className="w-40 h-28 rounded-lg overflow-hidden bg-slate-100 flex-none">
          <img
            src={imageUrl}
            alt="Gallery preview"
            className="w-full h-full object-cover blur-sm select-none pointer-events-none"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <FaLock className="text-slate-400 text-2xl mb-1" />
          <div className="text-slate-500 text-xs">
            More photos available after unlock
          </div>
        </div>
      </div>
    </div>
  );
}

export default LockedPhotoGallery;
