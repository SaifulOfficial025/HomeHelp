import React, { useState, useEffect } from "react";
import PropertyCard from "../PropertyCard";
import { fetchProperties } from "../../../Redux/GetProperty";

function AllProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProperties();
        setProperties(data);
      } catch (err) {
        setError(err.message || "Failed to fetch properties");
        console.error("Error loading properties:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

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

      {loading && (
        <div className="text-center text-slate-500">
          <p>Loading properties...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p>Error: {error}</p>
        </div>
      )}

      {!loading && !error && properties.length === 0 && (
        <div className="text-center text-slate-500">
          <p>No properties available at the moment.</p>
        </div>
      )}

      {!loading && properties.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              propertyId={property.id}
              slug={property.slug}
              title={property.propertyName}
              address={property.propertyAddress}
              imageUrl={property.propertyFeatureImage}
              beds={property.propertyBedrooms}
              baths={property.propertyBathrooms}
              parking={property.propertyParking}
              reportsCompleted={property.total_inspection_reports}
              reportsTotal={4}
              optionalCount={property.total_optional_reports}
              status={property.status}
              isLocked={!property.is_unlocked}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllProperties;
