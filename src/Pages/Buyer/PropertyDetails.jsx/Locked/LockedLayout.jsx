import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../PropertyOwnerFlow/Navbar";
import LockedHero from "./LockedHero";
import ProtectYourInvestment from "./ProtectYourInvestment";
import UnlockCard from "./UnlockCard";
import LockedPropertyDocumentation from "./LockedPropertyDocumentation";
import LockedPhotoGallery from "./LockedPhotoGallery";
import { fetchPropertyBySlug } from "../../../../Redux/PropertyDetails";

function LockedLayout({ propertySlug }) {
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
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <LockedHero property={property} />

        <div className="max-w-6xl mx-auto px-6 -mt-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <ProtectYourInvestment />
              <LockedPropertyDocumentation />
              <LockedPhotoGallery />
            </div>

            <aside className="lg:col-span-1">
              <UnlockCard propertySlug={propertySlug} />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LockedLayout;
