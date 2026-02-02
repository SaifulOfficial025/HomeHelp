import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Hero from "../Hero";
import PropertyDocumentation from "./PropertyDocumentation";
import DocumentationScore from "./DocumentationScore";
import SecureAccess from "./SecureAccess";
import NeedHelp from "./NeedHelp";
import Navbar from "../../../../PropertyOwnerFlow/Navbar";
import Footer from "../../../../../Shared/Footer";
import { PropertyContext } from "../Layout";
import { fetchPropertyBySlug } from "../../../../../Redux/PropertyDetails";

function RootPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperty = async () => {
      if (!slug) {
        setError("No property slug provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchPropertyBySlug(slug);
        setProperty(data);
      } catch (err) {
        setError(err.message || "Failed to load property details");
        console.error("Error loading property details:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [slug]);

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
      <div>
        <Navbar />
        <Hero />

        <div className="max-w-7xl mx-auto mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <PropertyDocumentation />
            </div>

            <div className="flex flex-col gap-6 mb-6">
              <DocumentationScore />
              <SecureAccess />
              <NeedHelp />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </PropertyContext.Provider>
  );
}

export default RootPage;
