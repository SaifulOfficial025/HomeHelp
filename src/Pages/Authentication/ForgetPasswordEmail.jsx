import React, { useState } from "react";
import Button from "../../Shared/Button";

function ForgetPasswordEmail({ onClose, onSent }) {
  const [email, setEmail] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    // TODO: call API to send OTP
    console.log("Send OTP to", email);
    if (onSent) onSent(email);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-md mx-4">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Forgot Password?
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                No worries! Enter your email address and we'll send you a link
                to reset your password.
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

          <form onSubmit={handleSend} className="mt-6">
            <label className="block text-sm text-slate-600 mb-2">
              Email Address
            </label>
            <div className="flex items-center bg-slate-50 rounded-lg px-4 py-3 border border-slate-100">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="flex-1 bg-transparent outline-none text-sm text-slate-700"
              />
            </div>

            <div className="mt-6">
              <Button
                color="blue"
                size="md"
                rounded
                shadow
                className="w-full"
                type="submit"
              >
                Send OTP
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm text-slate-500">
            <button onClick={onClose} className="underline">
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordEmail;
