import React from "react";
import { useLocation, useParams } from "react-router-dom";
import LockedLayout from "./Locked/LockedLayout";
import UnlockedLayout from "./Unlocked/Layout";

function PropertyDetailsRouter() {
  const location = useLocation();
  const { id } = useParams();

  // Prefer navigation state (set when clicking card). Fallback to unlocked if not provided.
  const locked = location.state?.locked ?? false;

  return locked ? (
    <LockedLayout propertyId={id} />
  ) : (
    <UnlockedLayout propertyId={id} />
  );
}

export default PropertyDetailsRouter;
