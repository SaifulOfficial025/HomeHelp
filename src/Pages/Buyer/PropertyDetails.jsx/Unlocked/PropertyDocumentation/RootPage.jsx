import React from "react";
import Hero from "../Hero";
import PropertyDocumentation from "./PropertyDocumentation";
import DocumentationScore from "./DocumentationScore";
import SecureAccess from "./SecureAccess";
import NeedHelp from "./NeedHelp";
import Navbar from "../../../../PropertyOwnerFlow/Navbar";
import Footer from "../../../../../Shared/Footer";

function RootPage() {
  return (
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
  );
}

export default RootPage;
