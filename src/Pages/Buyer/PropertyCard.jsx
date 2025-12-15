import React from "react";
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
    id = "0",
  } = props;

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-md mx-auto relative">
      <div className="relative">
        <img
          src={imageUrl}
          alt="Property"
          className="w-full h-60 object-cover transition"
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
          {!locked && badges.includes("Unlocked") && (
            <span className="bg-[#00c950] text-white text-sm font-semibold px-4 py-1 rounded-full shadow flex items-center gap-2">
              Unlocked
            </span>
          )}
          {/* Locked badge */}
          {locked && (
            <span className="bg-[#94a3b8] text-white text-sm font-semibold px-4 py-1 rounded-full shadow flex items-center gap-2">
              <FaLock /> Locked
            </span>
          )}
        </div>
        {/* Top right heart */}
        <button
          className={`absolute top-4 right-4 bg-white rounded-full p-2 shadow ${
            favorite ? "text-[#e23b5b]" : "text-slate-300"
          } hover:bg-slate-100`}
        >
          <FaHeart className="text-2xl" />
        </button>
        {/* Price Drop badge */}
        {priceDrop && !locked && (
          <span className="absolute left-4 bottom-4 bg-[#e23b5b] text-white text-sm font-semibold px-4 py-1 rounded-full flex items-center gap-1 shadow">
            <IoIosTrendingDown className="text-base" /> Price Drop
          </span>
        )}
      </div>
      <div className="p-6 pb-4">
        <div className="text-2xl font-extrabold text-slate-800 mb-1">
          {title}
        </div>
        <div className="flex items-center text-slate-500 text-base mb-4 gap-2">
          <FaMapMarkerAlt className="text-lg" />
          <span>{address}</span>
        </div>
        <div className="flex items-center gap-6 text-slate-700 text-lg mb-4">
          <span className="flex items-center gap-2">
            <FaBed /> {beds}
          </span>
          <span className="flex items-center gap-2">
            <FaBath /> {baths}
          </span>
          <span className="flex items-center gap-2">
            <FaCar /> {cars}
          </span>
        </div>
        <div className="flex items-center justify-between border-t pt-3 mt-2">
          <div className="text-slate-500 text-base">Built {built}</div>
          <button
            onClick={() =>
              navigate(`/property_details/${id}`, { state: { locked } })
            }
            className="text-[#18aa99] font-semibold text-lg hover:underline"
          >
            View Details &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
