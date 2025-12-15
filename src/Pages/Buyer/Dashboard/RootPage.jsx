import React from "react";
import Navbar from "../../PropertyOwnerFlow/Navbar";
import Hero from "./Hero";
import Featured from "./Featured";
import Recommendation from "./Recommendation";
import AllProperties from "./AllProperties";
import Footer from "../../../Shared/Footer";

function RootPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Featured />
      <Recommendation />
      <AllProperties />
      <Footer />
    </div>
  );
}

export default RootPage;
