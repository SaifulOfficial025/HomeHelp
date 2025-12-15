import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md px-5 py-4 flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center gap-3">
              <img src="/Logo.png" alt="HomeHelp logo" className="w-34 h-10" />
              <div className="flex flex-col leading-none"></div>
            </div>
          </Link>

          <div>
            <Link to="/signin">
              <Button color="blue" size="sm" rounded={false} shadow={true}>
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
