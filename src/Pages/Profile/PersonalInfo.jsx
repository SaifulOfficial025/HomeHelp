import React, { useState, useRef, useEffect } from "react";
import Button from "../../Shared/Button";
import { FaUser, FaEnvelope, FaPhone, FaCamera } from "react-icons/fa";
import profiledummyimg from "../../../public/profile.jpg";
import { getProfileData, updateProfile } from "../../Redux/Profile";

function PersonalInfo() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    accountType: "",
    isAgent: false,
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setFetchLoading(true);
      const response = await getProfileData();

      if (response.success && response.user) {
        setForm({
          fullName: response.user.full_name || "",
          email: response.user.email || "",
          phone: response.user.phone || "",
          accountType: response.user.role || "user",
          isAgent: response.user.is_agent || false,
        });

        if (response.user.image) {
          setAvatar(response.user.image);
        }
      }
    } catch (err) {
      setError(err.message || "Failed to load profile data");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleChoose = () => fileRef.current?.click();

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    // Validate file size (5MB)
    if (f.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    setAvatarFile(f);
    setAvatar(URL.createObjectURL(f));
    e.target.value = null;
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const updateData = {
        full_name: form.fullName,
        phone: form.phone,
        is_agent: form.isAgent,
      };

      // Pass the file directly to the API function
      const response = await updateProfile(updateData, avatarFile);

      if (response.success) {
        setSuccess("Profile updated successfully!");
        // Refresh profile data
        await fetchProfileData();
        setAvatarFile(null);
      }
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const initials = form.fullName ? form.fullName.charAt(0).toUpperCase() : "U";

  if (fetchLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-8 border border-slate-100">
          <div className="text-center text-slate-600">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow p-4 sm:p-8 border border-slate-100">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
          Personal Information
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Manage your profile details
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
            {success}
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-start">
          <div className="flex flex-col items-center md:items-start">
            <div className="relative">
              <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-[#18aa99] text-white flex items-center justify-center text-xl sm:text-2xl font-semibold">
                {avatar ? (
                  <img
                    src={profiledummyimg}
                    alt="avatar"
                    className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>
              <button
                onClick={handleChoose}
                className="absolute -bottom-2 right-0 bg-white p-1 rounded-full shadow -translate-y-2"
              >
                <FaCamera className="text-slate-700 text-sm" />
              </button>
            </div>
            <div className="text-xs text-slate-500 mt-2 sm:mt-3 sm:ml-4 text-center md:text-left">
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
                    disabled
                    className="flex-1 border border-slate-200 rounded-md px-3 py-2 text-sm bg-slate-100 cursor-not-allowed"
                  />
                </div>
                <div className="text-xs text-slate-400 mt-1 ml-7">
                  Email cannot be changed
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

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isAgent"
                  checked={form.isAgent}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, isAgent: e.target.checked }))
                  }
                  className="w-4 h-4 text-[#18aa99] border-slate-300 rounded focus:ring-[#18aa99]"
                />
                <label
                  htmlFor="isAgent"
                  className="text-sm text-slate-700 cursor-pointer"
                >
                  Are you an agent?
                </label>
              </div>

              <div className="mt-4">
                <Button
                  onClick={handleSave}
                  color="green"
                  rounded={false}
                  size="md"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
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
