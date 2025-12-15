import React, { useState } from "react";
import Button from "../../Shared/Button";
import { MdPersonOutline } from "react-icons/md";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [role, setRole] = useState("owner");
  const [showPassword, setShowPassword] = useState(false);

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

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: handle submit
              }}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="block text-sm text-slate-600">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-100 bg-slate-50"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-600">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-100 bg-slate-50"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label className="text-sm text-slate-600">Password</label>
                </div>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-lg border border-slate-100 bg-slate-50 pr-12"
                    placeholder="••••••••"
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

              <div className="pt-4">
                <Button
                  color="blue"
                  size="md"
                  rounded={false}
                  shadow
                  className="w-full"
                >
                  Sign Up
                </Button>
              </div>
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
