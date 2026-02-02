import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../PropertyOwnerFlow/Navbar";
import Hero from "./Hero";
import PropertyOverview from "./PropertyOverview";
import PropertyFeature from "./PropertyFeature";
import Floorplan from "./Floorplan";
import LocationInsights from "./LocationInsights";
import InspectedReports from "./InspectedReports";
import SimilarProperties from "./SimilarProperties";
import AgentCard from "./AgentCard";
import PriceDropAlert from "./PriceDropAlert";
import Footer from "../../../../Shared/Footer";
import { fetchPropertyBySlug } from "../../../../Redux/PropertyDetails";

// Create context to share property data across components
export const PropertyContext = createContext(null);

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperty must be used within PropertyContext.Provider");
  }
  return context;
};

function Layout({ propertySlug }) {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProperty = async () => {
      if (!propertySlug) {
        setError("No property slug provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchPropertyBySlug(propertySlug);
        setProperty(data);
      } catch (err) {
        setError(err.message || "Failed to load property details");
        console.error("Error loading property details:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [propertySlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-slate-600">
            Loading property details...
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">
            {error || "Property not found"}
          </div>
          <button
            onClick={() => navigate("/buyer_dashboard")}
            className="bg-[#18aa99] hover:bg-[#139a89] text-white font-semibold px-6 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <PropertyContext.Provider value={property}>
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <main>
          <Hero />

          <div className="max-w-6xl mx-auto px-6 -mt-12 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 flex flex-col gap-6 overflow-x-hidden">
                <PropertyOverview />
                <PropertyFeature />
                <Floorplan />
                <LocationInsights />
                <InspectedReports />
                <SimilarProperties />
              </div>

              <aside className="lg:col-span-1 flex flex-col gap-6">
                <AgentCard />
                <PriceDropAlert />
              </aside>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </PropertyContext.Provider>
  );
}

export default Layout;
