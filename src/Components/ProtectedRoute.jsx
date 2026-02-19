import React from "react";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import Button from "../Shared/Button";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center border border-slate-100">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <FaLock className="text-slate-400 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Authentication Required
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              For the details, you need to login first and then try again.
            </p>
          </div>

          <Link to="/signin">
            <Button color="blue" size="md" rounded={false} shadow>
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
