import React from "react";
import { FaCheckCircle, FaChevronDown } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const features = [
  "Solar panels installed",
  "Hardwood flooring throughout",
  "Landscaped gardens",
  "Double-glazed windows",
  "Renovated kitchen with stone benchtops",
  "Ducted air conditioning",
  "Security alarm system",
  "Built-in wardrobes",
];

function PropertyFeature() {
  return (
    <div className="bg-white rounded-2xl shadow p-8 border border-slate-100 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div className="text-2xl font-extrabold text-slate-800">
          Property Features
        </div>
        <FaChevronDown className="text-slate-300 text-xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 mt-4">
        {features.map((feature, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-lg text-slate-700"
          >
            <IoMdCheckmarkCircleOutline className="text-[#18aa99] text-xl" />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyFeature;
