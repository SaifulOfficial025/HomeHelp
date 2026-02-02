import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBed,
  FaBath,
  FaCar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { fetchFeaturedProperties } from "../../../Redux/FeaturedProperty";

function Featured() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFeaturedProperties();
        setProperties(data || []);
      } catch (err) {
        setError(err.message || "Failed to load featured properties");
        console.error("Error loading featured properties:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? properties.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === properties.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="px-2 md:px-8 py-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-72 bg-gray-100 rounded-3xl">
          <p className="text-slate-600">Loading featured properties...</p>
        </div>
      </div>
    );
  }

  if (error || properties.length === 0) {
    return (
      <div className="px-2 md:px-8 py-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-72 bg-gray-100 rounded-3xl">
          <p className="text-slate-600">
            {error || "No featured properties available"}
          </p>
        </div>
      </div>
    );
  }

  const property = properties[currentIndex];

  return (
    <div className="px-2 md:px-8 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-extrabold text-slate-800">
          Featured Properties
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center bg-white hover:bg-slate-100 text-slate-500"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center bg-white hover:bg-slate-100 text-slate-500"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="relative rounded-3xl overflow-hidden shadow-lg max-w-7xl mx-auto">
        <img
          src={property.propertyFeatureImage}
          alt={property.propertyName}
          className="w-full h-72 object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        {/* Content */}
        <div className="absolute left-0 right-0 bottom-0 p-8">
          {/* Badges */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {property.total_inspection_reports > 0 && (
              <span className="text-white text-xs font-semibold px-3 py-1 rounded-full shadow bg-[#18aa99]">
                Inspection Report Available
              </span>
            )}
            {property.status && (
              <span className="text-white text-xs font-semibold px-3 py-1 rounded-full shadow bg-[#00c950]">
                Listed
              </span>
            )}
            {!property.is_unlocked && (
              <span className="text-slate-800 text-xs font-semibold px-3 py-1 rounded-full shadow bg-[#f59e0b]">
                Locked - ${property.unlock_price}
              </span>
            )}
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-white mb-1">
            {property.propertyName}
          </div>
          <div className="text-white text-base mb-4">
            {property.propertyAddress}
          </div>
          <div className="flex items-center gap-6 text-white text-lg mb-6">
            <span className="flex items-center gap-2">
              <FaBed /> {property.propertyBedrooms}
            </span>
            <span className="flex items-center gap-2">
              <FaBath /> {property.propertyBathrooms}
            </span>
            <span className="flex items-center gap-2">
              <FaCar /> {property.propertyParking}
            </span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() =>
                navigate(`/property_details/${property.slug}`, {
                  state: { locked: !property.is_unlocked },
                })
              }
              className="bg-[#18aa99] hover:bg-[#139a89] text-white font-semibold px-7 py-3 rounded-lg text-base transition"
            >
              View Details
            </button>
            {/* <button className="text-white font-semibold px-7 py-3 rounded-lg text-base border border-slate-300 transition hover:bg-slate-100 hover:text-slate-800">
              Book Inspection
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
