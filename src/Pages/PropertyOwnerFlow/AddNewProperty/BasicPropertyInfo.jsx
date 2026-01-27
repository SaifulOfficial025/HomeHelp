import React, { useState, useEffect } from "react";
import Button from "../../../Shared/Button";
import { Link } from "react-router-dom";

function BasicPropertyInfo({
  onNext = () => {},
  initialData = {},
  isEditMode = false,
}) {
  const [form, setForm] = useState({
    propertyName: "",
    propertyAddress: "",
    propertyType: "",
    propertyBedrooms: "",
    propertyBathrooms: "",
    propertyParking: "",
    propertyBuildYear: "",
    propertyHasPool: false,
    propertyIsStrataProperty: false,
    status: true,
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <div className="max-w-3xl mx-auto mb-6">
      <div className="bg-white rounded-2xl shadow p-8 border border-slate-100">
        <h2 className="text-2xl font-extrabold text-slate-800">
          Basic Property Information
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Enter the essential details about your property
        </p>

        <div className="mt-6 space-y-4">
          <label className="block">
            <div className="text-sm text-slate-700 mb-1">
              Property Name <span className="text-rose-500">*</span>
            </div>
            <input
              name="propertyName"
              value={form.propertyName}
              onChange={handleChange}
              placeholder="e.g., Modern Family Home with Pool"
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-white"
            />
          </label>

          <label className="block">
            <div className="text-sm text-slate-700 mb-1">
              Address <span className="text-rose-500">*</span>
            </div>
            <input
              name="propertyAddress"
              value={form.propertyAddress}
              onChange={handleChange}
              placeholder="123 Main Street, Suburb, State, Postcode"
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-white"
            />
          </label>

          <label className="block">
            <div className="text-sm text-slate-700 mb-1">
              Property Type <span className="text-rose-500">*</span>
            </div>
            <input
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              placeholder="e.g., House, Apartment, Townhouse, Villa"
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-white"
            />
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <label className="block">
              <div className="text-xs text-slate-600 mb-1">Bedrooms</div>
              <input
                name="propertyBedrooms"
                value={form.propertyBedrooms}
                onChange={handleChange}
                placeholder="4"
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-white"
              />
            </label>

            <label className="block">
              <div className="text-xs text-slate-600 mb-1">Bathrooms</div>
              <input
                name="propertyBathrooms"
                value={form.propertyBathrooms}
                onChange={handleChange}
                placeholder="2"
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-white"
              />
            </label>

            <label className="block">
              <div className="text-xs text-slate-600 mb-1">Parking</div>
              <input
                name="propertyParking"
                value={form.propertyParking}
                onChange={handleChange}
                placeholder="2"
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-white"
              />
            </label>

            <label className="block">
              <div className="text-xs text-slate-600 mb-1">
                Year Built <span className="text-rose-500">*</span>
              </div>
              <input
                name="propertyBuildYear"
                value={form.propertyBuildYear}
                onChange={handleChange}
                placeholder="2020"
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-white"
              />
            </label>
          </div>

          <div>
            <div className="text-sm text-slate-700 mb-2">
              Additional Features
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="propertyHasPool"
                  checked={form.propertyHasPool}
                  onChange={handleChange}
                />
                <span>Has Pool / Spa</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="propertyIsStrataProperty"
                  checked={form.propertyIsStrataProperty}
                  onChange={handleChange}
                />
                <span>Is Strata Property</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="status"
                  checked={form.status}
                  onChange={handleChange}
                />
                <span>Active Status (Publicly visible)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Link to="/my_properties">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-slate-200 text-sm text-slate-700 bg-white"
            >
              Cancel
            </button>
          </Link>

          <Button
            onClick={() => onNext(form)}
            color="green"
            size="md"
            rounded={false}
            shadow
          >
            Next: Upload Photos
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BasicPropertyInfo;
