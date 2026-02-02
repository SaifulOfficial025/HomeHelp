import React from "react";
import { FaCheckCircle, FaChevronDown } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useProperty } from "./Layout";

function PropertyFeature() {
  const property = useProperty();

  // Use features from API or show default property characteristics
  const features =
    property.features?.length > 0
      ? property.features.map((f) => f.feature)
      : [
          property.propertyHasPool && "Swimming pool",
          property.propertyIsStrataProperty && "Strata property",
          `${property.propertyType} property`,
          `Built in ${property.propertyBuildYear}`,
        ].filter(Boolean);

  if (features.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow p-8 border border-slate-100 max-w-7xl ">
      <div className="flex items-center justify-between mb-2">
        <div className="text-2xl font-extrabold text-slate-800">
          Property Features
        </div>
        {/* <FaChevronDown className="text-slate-300 text-xl" /> */}
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
