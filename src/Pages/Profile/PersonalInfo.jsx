import React, { useState, useRef } from "react";
import Button from "../../Shared/Button";
import { FaUser, FaEnvelope, FaPhone, FaCamera } from "react-icons/fa";
import profiledummyimg from "../../../public/profile.jpg";

function PersonalInfo() {
  const [form, setForm] = useState({
    fullName: "emonhasan016333",
    email: "emonhasan016333@gmail.com",
    phone: "+61 412 345 678",
    accountType: "Owner",
  });
  const [avatar, setAvatar] = useState(null);
  const fileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleChoose = () => fileRef.current?.click();

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setAvatar(URL.createObjectURL(f));
    e.target.value = null;
  };

  const handleSave = () => {
    // placeholder: wire to API
    console.log("Save profile", { ...form, avatar });
    alert("Changes saved (placeholder)");
  };

  const initials = form.fullName ? form.fullName.charAt(0).toUpperCase() : "E";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow p-8 border border-slate-100">
        <h2 className="text-2xl font-extrabold text-slate-800">
          Personal Information
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Manage your profile details
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="flex flex-col items-center md:items-start">
            <div className="relative">
              <div className="h-32 w-32 rounded-full bg-[#18aa99] text-white flex items-center justify-center text-2xl font-semibold">
                {avatar ? (
                  <img
                    src={profiledummyimg}
                    alt="avatar"
                    className="h-32 w-32 rounded-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>
              <button
                onClick={handleChoose}
                className="absolute -bottom-2 right-0 bg-white p-1 rounded-full shadow -translate-y-2"
              >
                <FaCamera className="text-slate-700" />
              </button>
            </div>
            <div className="text-xs text-slate-500 mt-3 ml-4">
              JPG, PNG or GIF
              <br />
              Max size: 5MB
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
          </div>

          <div className="md:col-span-2">
            <div className="space-y-4">
              <label className="block">
                <div className="text-sm text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-slate-400">
                    <FaUser />
                  </div>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="flex-1 border border-slate-200 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </label>

              <label className="block">
                <div className="text-sm text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-slate-400">
                    <FaEnvelope />
                  </div>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="flex-1 border border-slate-200 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </label>

              <label className="block">
                <div className="text-sm text-slate-700 mb-1">Phone Number</div>
                <div className="flex items-center gap-3">
                  <div className="text-slate-400">
                    <FaPhone />
                  </div>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="flex-1 border border-slate-200 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </label>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-700 mb-1">
                    Account Type
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-50 border border-amber-100 text-amber-700 text-sm font-medium">
                    {form.accountType}
                  </div>
                </div>
                <div />
              </div>

              <div className="mt-4">
                <Button
                  onClick={handleSave}
                  color="green"
                  rounded={false}
                  size="md"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
