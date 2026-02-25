import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LockedLayout from "./Locked/LockedLayout";
import UnlockedLayout from "./Unlocked/Layout";
import { fetchPropertyBySlug } from "../../../Redux/PropertyDetails";

function PropertyDetailsRouter() {
  const { slug } = useParams();
  const [isUnlocked, setIsUnlocked] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPropertyLockStatus = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchPropertyBySlug(slug);
        // Check the is_unlocked field from API response
        setIsUnlocked(data?.is_unlocked ?? false);
      } catch (err) {
        console.error("Error checking property lock status:", err);
        // Default to locked if there's an error
        setIsUnlocked(false);
      } finally {
        setLoading(false);
      }
    };

    checkPropertyLockStatus();
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

  return isUnlocked ? (
    <UnlockedLayout propertySlug={slug} />
  ) : (
    <LockedLayout propertySlug={slug} />
  );
}

export default PropertyDetailsRouter;
