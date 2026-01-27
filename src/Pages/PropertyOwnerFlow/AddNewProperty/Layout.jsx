import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import BasicPropertyInfo from "./BasicPropertyInfo";
import PropertyPhotos from "./PropertyPhotos";
import MandatoryReports from "./MandatoryReports";
import OptionalReports from "./OptionalReports";
import ReviewandPublish from "./ReviewandPublish";
import Navbar from "../Navbar";
import Footer from "../../../Shared/Footer";
import { getPropertyBySlug } from "../../../Redux/PropertyAddEdit";

const steps = [
  { id: "basic", label: "Basic Info" },
  { id: "photos", label: "Photos" },
  { id: "mandatory", label: "Mandatory Reports" },
  { id: "optional", label: "Optional Reports" },
  { id: "review", label: "Review & Publish" },
];

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isEditMode = location.pathname === "/edit_properties";
  const editSlug = location.state?.slug;

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    basicInfo: {},
    photos: { featureImage: null, images: [] },
    mandatoryReports: [],
    optionalReports: [],
    features: [],
  });

  useEffect(() => {
    if (isEditMode && editSlug) {
      loadPropertyData(editSlug);
    }
  }, [isEditMode, editSlug]);

  const loadPropertyData = async (slug) => {
    try {
      setLoading(true);
      const data = await getPropertyBySlug(slug);

      setFormData({
        basicInfo: {
          propertyName: data.propertyName,
          propertyAddress: data.propertyAddress,
          propertyType: data.propertyType,
          propertyBedrooms: data.propertyBedrooms,
          propertyBathrooms: data.propertyBathrooms,
          propertyParking: data.propertyParking,
          propertyBuildYear: data.propertyBuildYear,
          propertyHasPool: data.propertyHasPool,
          propertyIsStrataProperty: data.propertyIsStrataProperty,
          status: data.status,
        },
        photos: {
          featureImage: data.propertyFeatureImage,
          images: data.images || [],
        },
        mandatoryReports: data.inspection_reports || [],
        optionalReports: data.optional_reports || [],
        features: data.features || [],
      });
    } catch (error) {
      console.error("Error loading property:", error);
      alert("Failed to load property data");
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (section, data) => {
    const updatedFormData = { ...formData, [section]: data };
    setFormData(updatedFormData);

    // Save to localStorage for review page display (serialize carefully)
    try {
      const dataToSave = {
        basicInfo: updatedFormData.basicInfo || {},
        photos: {
          featurePreview: updatedFormData.photos?.featurePreview || null,
          images:
            updatedFormData.photos?.images?.map((img) => ({
              id: img.id,
              src: img.src,
              isExisting: img.isExisting,
            })) || [],
        },
        mandatoryReports:
          updatedFormData.mandatoryReports?.map((r) =>
            r
              ? { id: r.id, isExisting: r.isExisting, preview: r.preview }
              : null,
          ) || [],
        optionalReports: {
          files:
            updatedFormData.optionalReports?.files?.map((f) =>
              f
                ? { id: f.id, isExisting: f.isExisting, preview: f.preview }
                : null,
            ) || [],
          features: updatedFormData.optionalReports?.features || [],
        },
      };
      localStorage.setItem("propertyFormData", JSON.stringify(dataToSave));
    } catch (err) {
      console.error("Error saving to localStorage:", err);
    }
  };

  const goNext = (section, data) => {
    updateFormData(section, data);
    if (step < steps.length - 1) setStep((s) => s + 1);
  };

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const renderStep = () => {
    if (loading) {
      return (
        <div className="text-center py-10">
          <p className="text-slate-500">Loading property data...</p>
        </div>
      );
    }

    switch (step) {
      case 0:
        return (
          <BasicPropertyInfo
            onNext={(data) => goNext("basicInfo", data)}
            initialData={formData.basicInfo}
            isEditMode={isEditMode}
          />
        );
      case 1:
        return (
          <PropertyPhotos
            onNext={(data) => goNext("photos", data)}
            onBack={goBack}
            initialData={formData.photos}
            isEditMode={isEditMode}
          />
        );
      case 2:
        return (
          <MandatoryReports
            onNext={(data) => goNext("mandatoryReports", data)}
            onBack={goBack}
            initialData={formData.mandatoryReports}
            isEditMode={isEditMode}
          />
        );
      case 3:
        return (
          <OptionalReports
            onNext={(data) => goNext("optionalReports", data)}
            onBack={goBack}
            initialData={formData.optionalReports}
            initialFeatures={formData.features}
            isEditMode={isEditMode}
          />
        );
      case 4:
        return (
          <ReviewandPublish
            onBack={goBack}
            formData={formData}
            isEditMode={isEditMode}
            editSlug={editSlug}
            onSuccess={() => navigate("/my_properties")}
          />
        );
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
