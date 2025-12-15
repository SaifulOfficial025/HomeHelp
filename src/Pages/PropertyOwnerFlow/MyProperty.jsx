import React from "react";
import Navbar from "./Navbar";
import PropertyCard from "../../Shared/PropertyCard";
import Button from "../../Shared/Button";
import DummyImage from "../../../public/propertydummyimage.jpg";
import { Link } from "react-router-dom";
import Footer from "../../Shared/Footer";

function MyProperty() {
  const properties = [
    { id: 1, title: "Modern Waterfront Villa", image: DummyImage },
    { id: 2, title: "Elegant Family Home", image: DummyImage },
    { id: 3, title: "Luxury City Apartment", image: DummyImage },
    { id: 4, title: "Coastal Retreat", image: DummyImage },
  ];

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

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((p) => (
            <PropertyCard key={p.id} title={p.title} image={p.image} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MyProperty;
