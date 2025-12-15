import React from "react";
import PropertyCard from "../PropertyCard";

const properties = [
  {
    id: "modern-1",
    title: "Modern",
    address: "123 Seaside Avenue, Bondi Beach NSW 2026",
    beds: 4,
    baths: 3,
    cars: 2,
    built: 2018,
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    badges: ["Inspection Report Ready", "Unlocked"],
    priceDrop: true,
    favorite: true,
    locked: false,
  },
  {
    id: "luxury-2",
    title: "Luxury City Apartment",
    address: "789 George Street, Sydney NSW 2000",
    beds: 2,
    baths: 2,
    cars: 1,
    built: 2020,
    imageUrl:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
    badges: ["Inspection Report Ready"],
    priceDrop: false,
    favorite: false,
    locked: true,
  },
  {
    id: "coastal-3",
    title: "Coastal Retreat",
    address: "21 Beach Road, Manly NSW 2095",
    beds: 5,
    baths: 3,
    cars: 3,
    built: 2019,
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    badges: ["Inspection Report Ready", "Unlocked"],
    priceDrop: false,
    favorite: false,
    locked: false,
  },
];

function AllProperties() {
  return (
    <div className="px-2 md:px-8 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800">
          All Properties
        </h2>
        <div className="text-slate-500 text-base">
          {properties.length} properties available
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {properties.map((property, idx) => (
          <PropertyCard key={idx} {...property} />
        ))}
      </div>
    </div>
  );
}

export default AllProperties;
