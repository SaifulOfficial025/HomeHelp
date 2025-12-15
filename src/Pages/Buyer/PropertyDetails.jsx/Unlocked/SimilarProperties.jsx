import React from "react";
import { FaBed, FaBath } from "react-icons/fa";

const properties = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80",
    title: "Coastal Family Home",
    price: "$2.6M",
    beds: 3,
    baths: 2,
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80",
    title: "Modern Beachside Apartment",
    price: "",
    beds: 2,
    baths: 2,
  },
];

function SimilarProperties() {
  return (
    <div className="py-6">
      <div className="text-xl font-extrabold text-slate-800 mb-4">
        Similar Properties
      </div>
      <div className="flex gap-5">
        {properties.map((p, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow p-0 w-64 overflow-hidden"
          >
            <img
              src={p.imageUrl}
              alt={p.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <div className="font-bold text-slate-800 text-base mb-1 leading-tight">
                {p.title}
              </div>
              {p.price && (
                <div className="text-[#18aa99] text-sm font-bold mb-1">
                  {p.price}
                </div>
              )}
              <div className="flex items-center gap-4 text-slate-500 text-xs">
                <span className="flex items-center gap-1">
                  <FaBed /> {p.beds}
                </span>
                <span className="flex items-center gap-1">
                  <FaBath /> {p.baths}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimilarProperties;
