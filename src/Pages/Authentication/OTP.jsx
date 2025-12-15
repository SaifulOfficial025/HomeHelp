import React, { useRef, useState } from "react";
import Button from "../../Shared/Button";

function OTP({ onClose, onVerify }) {
  const length = 6;
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const focusInput = (i) => {
    const input = inputsRef.current[i];
    if (input) input.focus();
  };

  const handleChange = (e, i) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) {
      const next = [...values];
      next[i] = "";
      setValues(next);
      return;
    }
    const next = [...values];
    next[i] = val.slice(-1);
    setValues(next);
    if (i < length - 1) focusInput(i + 1);
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !values[i] && i > 0) {
      focusInput(i - 1);
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (paste) {
      const next = paste
        .split("")
        .concat(Array(length).fill(""))
        .slice(0, length);
      setValues(next);
    }
    e.preventDefault();
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const code = values.join("");
    if (onVerify) onVerify(code);
    else console.log("Verify OTP:", code);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-sm mx-4">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Enter OTP</h3>
              <p className="mt-2 text-sm text-slate-600">
                Enter the 6-digit code we sent to your email.
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

          <form onSubmit={handleVerify} onPaste={handlePaste} className="mt-6">
            <div className="flex gap-3 justify-center">
              {Array.from({ length }).map((_, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  value={values[i]}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-12 h-12 text-center rounded-lg border border-slate-200 bg-slate-50 text-lg"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              ))}
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
                Verify OTP
              </Button>
            </div>

            <div className="mt-4 text-center text-sm text-slate-500">
              <button
                type="button"
                className="underline"
                onClick={() => console.log("Resend OTP")}
              >
                Resend code
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OTP;
