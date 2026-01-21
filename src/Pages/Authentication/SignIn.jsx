import React, { useState } from "react";
import Button from "../../Shared/Button";
import { MdPersonOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ForgetPasswordEmail from "./ForgetPasswordEmail";
import OTP from "./OTP";
import NewPassword from "./NewPassword";
import { loginUser } from "../../Redux/Signin";

export default function SignIn() {
  const [role, setRole] = useState("owner");
  const [showPassword, setShowPassword] = useState(false);
  const [showForget, setShowForget] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(formData.email, formData.password);

      if (response.success && response.user) {
        // Redirect based on user role
        if (response.user.role === "buyer") {
          navigate("/buyer_dashboard");
        } else if (response.user.role === "owner") {
          navigate("/my_properties");
        } else {
          // Default redirect if role doesn't match
          navigate("/my_properties");
        }
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
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

            {/* <div className="mt-6 bg-slate-50 p-2 rounded-lg flex gap-3">
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
            </div> */}

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSignIn} className="mt-6 space-y-4">
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
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4"
                  />
                  <span className="text-slate-600">Remember me</span>
                </label>

                <a
                  href="#"
                  className="text-[#18aa99]"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowForget(true);
                  }}
                >
                  Forgot password?
                </a>
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
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </div>
            </form>
            <span className="mt-4 text-center text-sm text-slate-600 flex justify-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#18aa99]">
                <p className="text-[#18aa99] ml-2"> Sign Up</p>
              </Link>
            </span>
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

      {/* Modals for forgot-password flow */}
      {showForget && (
        <ForgetPasswordEmail
          onClose={() => setShowForget(false)}
          onSent={(email) => {
            setOtpEmail(email);
            setShowForget(false);
            setShowOTP(true);
          }}
        />
      )}

      {showOTP && (
        <OTP
          email={otpEmail}
          onClose={() => setShowOTP(false)}
          onVerify={(code) => {
            setShowOTP(false);
            setShowNewPassword(true);
          }}
        />
      )}

      {showNewPassword && (
        <NewPassword
          email={otpEmail}
          onClose={() => setShowNewPassword(false)}
          onSet={(password) => {
            setShowNewPassword(false);
          }}
        />
      )}
    </div>
  );
}
