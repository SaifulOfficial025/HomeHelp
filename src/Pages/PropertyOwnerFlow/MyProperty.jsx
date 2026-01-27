import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import PropertyCard from "../../Shared/PropertyCard";
import Button from "../../Shared/Button";
import { Link } from "react-router-dom";
import Footer from "../../Shared/Footer";
import { fetchProperties } from "../../Redux/GetProperty";

function MyProperty() {
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
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900">
              My Properties
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Manage your property listings and documentation
            </p>
            <div className="mt-4 text-sm text-slate-600">
              {properties.length} properties
            </div>
          </div>

          <div className="pt-2">
            <Link to="/add_property">
              <Button color="blue" size="md" rounded={false} shadow>
                + Add Property
              </Button>
            </Link>
          </div>
        </div>

        {loading && (
          <div className="mt-8 text-center text-slate-500">
            <p>Loading properties...</p>
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p>Error: {error}</p>
          </div>
        )}

        {!loading && !error && properties.length === 0 && (
          <div className="mt-8 text-center text-slate-500">
            <p>No properties found. Add your first property to get started!</p>
          </div>
        )}

        {!loading && properties.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((p) => (
              <PropertyCard
                key={p.id}
                slug={p.slug}
                title={p.propertyName}
                address={p.propertyAddress}
                image={p.propertyFeatureImage}
                beds={p.propertyBedrooms}
                baths={p.propertyBathrooms}
                parking={p.propertyParking}
                reportsCompleted={p.total_inspection_reports}
                reportsTotal={4}
                optionalCount={p.total_optional_reports}
                status={p.status}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default MyProperty;
