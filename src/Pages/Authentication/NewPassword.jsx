import React, { useState } from "react";
import Button from "../../Shared/Button";
import { resetPassword } from "../../Redux/ForgetPassword";
import { useNavigate } from "react-router-dom";

function NewPassword({ onClose, onSet, email }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirm) {
      setError("Please fill both fields");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword(email, password);

      if (response.success) {
        setSuccess("Password reset successfully! Redirecting to sign in...");
        setTimeout(() => {
          if (onSet) onSet(password);
          if (onClose) onClose();
          navigate("/signin");
        }, 1500);
      }
    } catch (err) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-md mx-4">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Set New Password
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Choose a strong password to secure your account.
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="ml-4 text-slate-500 hover:text-slate-700"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-slate-600 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-100 bg-slate-50"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-100 bg-slate-50"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-500 p-3 bg-red-50 border border-red-200 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="text-sm text-green-500 p-3 bg-green-50 border border-green-200 rounded-lg">
                {success}
              </div>
            )}

            <div>
              <Button
                color="blue"
                size="md"
                rounded
                shadow
                className="w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? "Resetting Password..." : "Set New Password"}
              </Button>
            </div>

            <div className="text-center mt-2 text-sm text-slate-500">
              <button type="button" onClick={onClose} className="underline">
                Back to Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
