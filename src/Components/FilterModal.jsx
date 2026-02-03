import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

function FilterModal({ isOpen, onClose, onApplyFilters }) {
  const [filters, setFilters] = useState({
    bedrooms: "",
    bathrooms: "",
    parking: "",
    has_pool: null,
    is_strata: null,
  });

  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApply = () => {
    // Filter out empty values
    const activeFilters = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== "" && filters[key] !== null) {
        activeFilters[key] = filters[key];
      }
    });
    onApplyFilters(activeFilters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      bedrooms: "",
      bathrooms: "",
      parking: "",
      has_pool: null,
      is_strata: null,
    });
    onApplyFilters({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-2xl font-bold text-slate-800">
            Filter Properties
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Bedrooms
            </label>
            <div className="flex gap-2 flex-wrap">
              {["1", "2", "3", "4", "5+"].map((num) => (
                <button
                  key={num}
                  onClick={() =>
                    handleChange("bedrooms", num === "5+" ? "5" : num)
                  }
                  className={`px-5 py-2.5 rounded-lg font-medium transition ${
                    filters.bedrooms === (num === "5+" ? "5" : num)
                      ? "bg-[#18aa99] text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Bathrooms
            </label>
            <div className="flex gap-2 flex-wrap">
              {["1", "2", "3", "4+"].map((num) => (
                <button
                  key={num}
                  onClick={() =>
                    handleChange("bathrooms", num === "4+" ? "4" : num)
                  }
                  className={`px-5 py-2.5 rounded-lg font-medium transition ${
                    filters.bathrooms === (num === "4+" ? "4" : num)
                      ? "bg-[#18aa99] text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Parking */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Parking Spaces
            </label>
            <div className="flex gap-2 flex-wrap">
              {["0", "1", "2", "3", "4+"].map((num) => (
                <button
                  key={num}
                  onClick={() =>
                    handleChange("parking", num === "4+" ? "4" : num)
                  }
                  className={`px-5 py-2.5 rounded-lg font-medium transition ${
                    filters.parking === (num === "4+" ? "4" : num)
                      ? "bg-[#18aa99] text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Pool */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Has Pool
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleChange("has_pool", true)}
                className={`flex-1 px-5 py-2.5 rounded-lg font-medium transition ${
                  filters.has_pool === true
                    ? "bg-[#18aa99] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => handleChange("has_pool", false)}
                className={`flex-1 px-5 py-2.5 rounded-lg font-medium transition ${
                  filters.has_pool === false
                    ? "bg-[#18aa99] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                No
              </button>
              <button
                onClick={() => handleChange("has_pool", null)}
                className={`flex-1 px-5 py-2.5 rounded-lg font-medium transition ${
                  filters.has_pool === null
                    ? "bg-[#18aa99] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Any
              </button>
            </div>
          </div>

          {/* Strata */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Is Strata
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleChange("is_strata", true)}
                className={`flex-1 px-5 py-2.5 rounded-lg font-medium transition ${
                  filters.is_strata === true
                    ? "bg-[#18aa99] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => handleChange("is_strata", false)}
                className={`flex-1 px-5 py-2.5 rounded-lg font-medium transition ${
                  filters.is_strata === false
                    ? "bg-[#18aa99] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                No
              </button>
              <button
                onClick={() => handleChange("is_strata", null)}
                className={`flex-1 px-5 py-2.5 rounded-lg font-medium transition ${
                  filters.is_strata === null
                    ? "bg-[#18aa99] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Any
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-200">
          <button
            onClick={handleReset}
            className="flex-1 px-6 py-3 rounded-lg font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
          >
            Reset All
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-6 py-3 rounded-lg font-semibold text-white bg-[#18aa99] hover:bg-[#159988] transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
