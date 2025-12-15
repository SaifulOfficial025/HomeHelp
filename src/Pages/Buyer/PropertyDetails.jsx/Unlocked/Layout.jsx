import React from "react";
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

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <Hero />

        <div className="max-w-6xl mx-auto px-6 -mt-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
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
  );
}

export default Layout;
