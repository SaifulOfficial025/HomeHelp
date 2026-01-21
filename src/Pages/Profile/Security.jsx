import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { changePassword } from "../../Redux/ChangePassword";

function Security() {
  const [form, setForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const toggleShow = (key) => setShow((s) => ({ ...s, [key]: !s[key] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!form.current || !form.new || !form.confirm) {
      setError("All fields are required");
      return;
    }

    if (form.new !== form.confirm) {
      setError("New passwords do not match");
      return;
    }

    if (form.new.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await changePassword(form.current, form.new);

      if (response.success) {
        setSuccess("Password changed successfully!");
        // Clear form
        setForm({
          current: "",
          new: "",
          confirm: "",
        });
      }
    } catch (err) {
      setError(
        err.message ||
          "Failed to change password. Please check your current password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl shadow p-8 border border-slate-100">
        <h2 className="text-2xl font-extrabold text-slate-800">
          Change Password
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Ensure your account is secure with a strong password
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

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Current Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <FaLock />
              </span>
              <input
                type={show.current ? "text" : "password"}
                name="current"
                value={form.current}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full pl-10 pr-12 py-3 rounded-lg border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#18aa99]"
              />
              <button
                type="button"
                onClick={() => toggleShow("current")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {show.current ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">
              New Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <FaLock />
              </span>
              <input
                type={show.new ? "text" : "password"}
                name="new"
                value={form.new}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full pl-10 pr-12 py-3 rounded-lg border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#18aa99]"
              />
              <button
                type="button"
                onClick={() => toggleShow("new")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {show.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Confirm New Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <FaLock />
              </span>
              <input
                type={show.confirm ? "text" : "password"}
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full pl-10 pr-12 py-3 rounded-lg border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#18aa99]"
              />
              <button
                type="button"
                onClick={() => toggleShow("confirm")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {show.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#18aa99] hover:bg-[#139a89] text-white font-semibold py-3 rounded-lg text-base transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaLock />
              {loading ? "Updating Password..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Security;
