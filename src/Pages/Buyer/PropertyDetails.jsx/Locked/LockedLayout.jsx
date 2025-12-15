import React from "react";
import Navbar from "../../../PropertyOwnerFlow/Navbar";
import LockedHero from "./LockedHero";
import ProtectYourInvestment from "./ProtectYourInvestment";
import UnlockCard from "./UnlockCard";
import LockedPropertyDocumentation from "./LockedPropertyDocumentation";
import LockedPhotoGallery from "./LockedPhotoGallery";

function LockedLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <LockedHero />

        <div className="max-w-6xl mx-auto px-6 -mt-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <ProtectYourInvestment />
              <LockedPropertyDocumentation />
              <LockedPhotoGallery />
            </div>

            <aside className="lg:col-span-1">
              <UnlockCard />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LockedLayout;
