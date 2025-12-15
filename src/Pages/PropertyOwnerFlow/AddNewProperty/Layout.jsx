import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import BasicPropertyInfo from "./BasicPropertyInfo";
import PropertyPhotos from "./PropertyPhotos";
import MandatoryReports from "./MandatoryReports";
import OptionalReports from "./OptionalReports";
import ReviewandPublish from "./ReviewandPublish";
import Navbar from "../Navbar";
import Footer from "../../../Shared/Footer";

const steps = [
  { id: "basic", label: "Basic Info" },
  { id: "photos", label: "Photos" },
  { id: "mandatory", label: "Mandatory Reports" },
  { id: "optional", label: "Optional Reports" },
  { id: "review", label: "Review & Publish" },
];

function Layout() {
  const location = useLocation();
  const isEditMode = location.pathname === "/edit_properties";
  const [step, setStep] = useState(0);

  const goNext = (data) => {
    if (step < steps.length - 1) setStep((s) => s + 1);
  };
  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <BasicPropertyInfo onNext={goNext} />;
      case 1:
        return <PropertyPhotos onNext={goNext} onBack={goBack} />;
      case 2:
        return <MandatoryReports onNext={goNext} onBack={goBack} />;
      case 3:
        return <OptionalReports onNext={goNext} onBack={goBack} />;
      case 4:
        return <ReviewandPublish onBack={goBack} onPublish={() => {}} />;
      default:
        return null;
    }
  };

  return (
    <section>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 mt-6 mb-16">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            {isEditMode ? "Edit Property" : "Add New Property"}
          </h1>
          <p className="text-sm text-slate-500">
            {isEditMode
              ? "Update your property details"
              : "Complete all steps to generate your QR code and publish"}
          </p>
        </header>

        <nav className="flex items-center gap-6 mb-6">
          {steps.map((s, idx) => {
            const completed = idx < step;
            const active = idx === step;
            return (
              <div key={s.id} className="flex items-center gap-3">
                <button
                  onClick={() => idx <= step && setStep(idx)}
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    completed
                      ? "bg-[#18aa99] text-white"
                      : active
                      ? "bg-slate-800 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                  aria-current={active}
                  aria-label={s.label}
                >
                  {completed ? <FaCheck className="w-5 h-5 " /> : idx + 1}
                </button>
                <div
                  className={`text-sm ${
                    active ? "text-slate-800 font-medium" : "text-slate-500"
                  }`}
                >
                  {s.label}
                </div>
              </div>
            );
          })}
        </nav>

        <section>{renderStep()}</section>
      </div>
      <Footer />
    </section>
  );
}

export default Layout;
