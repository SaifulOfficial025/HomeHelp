import React, { useState } from "react";
import {
  FaHeart,
  FaBed,
  FaBath,
  FaCar,
  FaMapMarkerAlt,
  FaArrowDown,
  FaLock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoIosTrendingDown } from "react-icons/io";
import { addPropertyBookmark } from "../../Redux/Bookmark";

function PropertyCard(props) {
  const {
    imageUrl,
    title,
    address,
    beds,
    baths,
    cars,
    built,
    badges = [],
    priceDrop,
    favorite,
    locked,
    isLocked,
    slug = "",
    propertyId = "",
  } = props;

  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(favorite || false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [toast, setToast] = useState("");

  // Use isLocked prop if provided, otherwise fall back to locked
  const isPropertyLocked = isLocked !== undefined ? isLocked : locked;

  const handleBookmark = async (e) => {
    e.stopPropagation();

    if (!propertyId) return;

    setBookmarkLoading(true);
    try {
      await addPropertyBookmark(propertyId);
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
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden w-80 h-[520px] mx-auto relative flex flex-col">
      <div className="relative flex-shrink-0">
        <img
          src={imageUrl}
          alt="Property"
          className="w-full h-48 object-cover"
        />
        {/* Top left badges or Locked */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {/* Inspection Report Ready badge */}
          {badges.includes("Inspection Report Ready") && (
            <span className="bg-[#18aa99] text-white text-sm font-semibold px-4 py-1 rounded-full shadow flex items-center gap-2">
              Inspection Report Ready
            </span>
          )}
          {/* Unlocked badge */}
          {!isPropertyLocked && badges.includes("Unlocked") && (
            <span className="bg-[#00c950] text-white text-sm font-semibold px-4 py-1 rounded-full shadow flex items-center gap-2">
              Unlocked
            </span>
          )}
          {/* Locked badge */}
          {isPropertyLocked && (
            <span className="bg-[#94a3b8] text-white text-sm font-semibold px-4 py-1 rounded-full shadow flex items-center gap-2">
              <FaLock /> Locked
            </span>
          )}
        </div>
        {/* Top right heart */}
        <button
          onClick={handleBookmark}
          disabled={bookmarkLoading}
          className={`absolute top-4 right-4 bg-white rounded-full p-2 shadow transition ${
            isBookmarked ? "text-[#e23b5b]" : "text-slate-300"
          } hover:bg-slate-100`}
        >
          <FaHeart className="text-xl" />
        </button>
        {/* Price Drop badge */}
        {priceDrop && !isPropertyLocked && (
          <span className="absolute left-4 bottom-4 bg-[#e23b5b] text-white text-sm font-semibold px-4 py-1 rounded-full flex items-center gap-1 shadow">
            <IoIosTrendingDown className="text-base" /> Price Drop
          </span>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <div className="text-xl font-extrabold text-slate-800 mb-2 h-14 overflow-hidden line-clamp-2">
            {title}
          </div>
          <div className="flex items-start text-slate-500 text-sm mb-4 gap-2 h-12 overflow-hidden">
            <FaMapMarkerAlt className="text-base flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2 leading-5">{address}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-700 text-base mb-4 truncate">
            <span className="flex items-center gap-1 flex-shrink-0">
              <FaBed className="text-sm" /> {beds}
            </span>
            <span className="flex items-center gap-1 flex-shrink-0">
              <FaBath className="text-sm" /> {baths}
            </span>
            <span className="flex items-center gap-1 flex-shrink-0">
              <FaCar className="text-sm" /> {cars}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between border-t pt-3 mt-auto overflow-hidden">
          <div className="text-slate-500 text-sm truncate mr-2">
            Built {built}
          </div>
          <button
            onClick={() =>
              navigate(`/property_details/${slug}`, {
                state: { locked: isPropertyLocked },
              })
            }
            className="text-[#18aa99] font-semibold text-base hover:underline flex-shrink-0"
          >
            View Details &rarr;
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg animate-slide-up z-50">
          {toast}
        </div>
      )}
    </div>
  );
}

export default PropertyCard;
