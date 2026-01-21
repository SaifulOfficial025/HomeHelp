import React, { useState } from "react";
import Button from "../../Shared/Button";
import { MdPersonOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, verifyOTP } from "../../Redux/Signup";

export default function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState("owner");
  const [showPassword, setShowPassword] = useState(false);
  const [showOTPField, setShowOTPField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    otp: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await registerUser(
        formData.email,
        formData.password,
        role,
        formData.fullName,
      );

      if (response.success) {
        setSuccess(response.message);
        setShowOTPField(true);
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await verifyOTP(formData.email, formData.otp);

      if (response.success) {
        setSuccess("Registration completed successfully! Redirecting...");
        setTimeout(() => {
          navigate("/signin");
        }, 1500);
      }
    } catch (err) {
      setError(err.message || "OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5fbfb] px-6">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Form Card */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-sm text-slate-500 mt-2">
              Sign in to manage your property listings
            </p>

            <div className="mt-6 bg-slate-50 p-2 rounded-lg flex gap-3">
              <button
                type="button"
                onClick={() => setRole("owner")}
                className={`flex-1 py-3 rounded-lg transition-colors ${
                  role === "owner"
                    ? "bg-white border-2 border-[#18aa99] text-[#18aa99]"
                    : "text-slate-600"
                }`}
              >
                <MdPersonOutline className="inline-block mr-2 -mt-0.5 w-7 h-7" />{" "}
                <br />
                Property Owner
              </button>

              <button
                type="button"
                onClick={() => setRole("buyer")}
                className={`flex-1 py-3 rounded-lg transition-colors ${
                  role === "buyer"
                    ? "bg-white border-2 border-[#18aa99] text-[#18aa99]"
                    : "text-slate-600"
                }`}
              >
                <MdPersonOutline className="inline-block mr-2 -mt-0.5 w-7 h-7" />{" "}
                <br />
                Buyer
              </button>
            </div>

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

            <form
              onSubmit={showOTPField ? handleSignUp : handleConfirm}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="block text-sm text-slate-600">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-100 bg-slate-50"
                  placeholder="Your full name"
                  required
                  disabled={showOTPField}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-600">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-100 bg-slate-50"
                  placeholder="you@example.com"
                  required
                  disabled={showOTPField}
                />
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label className="text-sm text-slate-600">Password</label>
                </div>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-100 bg-slate-50 pr-12"
                    placeholder="••••••••"
                    required
                    disabled={showOTPField}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    disabled={showOTPField}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {!showOTPField && (
                <div className="pt-4">
                  <Button
                    type="submit"
                    color="blue"
                    size="md"
                    rounded={false}
                    shadow
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Sending OTP..." : "Confirm"}
                  </Button>
                </div>
              )}

              {showOTPField && (
                <>
                  <div>
                    <label className="block text-sm text-slate-600">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      name="otp"
                      value={formData.otp}
                      onChange={handleInputChange}
                      className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-100 bg-slate-50"
                      placeholder="Enter 4-digit OTP"
                      required
                      maxLength="4"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      color="blue"
                      size="md"
                      rounded={false}
                      shadow
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? "Verifying..." : "Sign Up"}
                    </Button>
                  </div>
                </>
              )}
            </form>
            <div className="mt-4 text-center text-sm text-slate-600 flex justify-center">
              Already have an account?{" "}
              <Link to="/signin" className="text-[#18aa99] ml-2">
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Image Card */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full h-full  overflow-hidden  relative">
            <img
              src="/authsideimg.png"
              alt="auth side"
              className="w-[80%] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
