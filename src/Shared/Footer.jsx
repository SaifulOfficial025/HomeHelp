import React from "react";
import { MdEmail } from "react-icons/md";
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-12 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-96">
          <div className="flex flex-col items-start md:items-start">
            <div className="flex items-start gap-3">
              <img
                src="/footerlogo.png"
                alt="HomeHelp"
                className="w-24 h-24 object-contain"
              />
            </div>

            <p className="mt-4 text-sm text-slate-400 text-start md:text-left max-w-xs">
              Simplifying property transparency with secure document storage and
              QR-based verification.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                aria-label="facebook"
                className="w-9 h-9 inline-flex items-center justify-center bg-slate-800 rounded-md hover:bg-slate-700"
              >
                <FaFacebook className="text-slate-300" size={16} />
              </a>
              <a
                aria-label="twitter"
                className="w-9 h-9 inline-flex items-center justify-center bg-slate-800 rounded-md hover:bg-slate-700"
              >
                <BsTwitterX className="text-slate-300" size={16} />
              </a>
              <a
                aria-label="linkedin"
                className="w-9 h-9 inline-flex items-center justify-center bg-slate-800 rounded-md hover:bg-slate-700"
              >
                <FaLinkedin className="text-slate-300" size={16} />
              </a>
              <a
                aria-label="instagram"
                className="w-9 h-9 inline-flex items-center justify-center bg-slate-800 rounded-md hover:bg-slate-700"
              >
                <FaInstagramSquare className="text-slate-300" size={16} />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-start">
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-4 text-sm text-slate-400 w-full max-w-xs">
              <li className="flex items-start gap-3">
                <MdEmail
                  className="mt-0.5 text-slate-300 flex-shrink-0"
                  size={18}
                />
                <div className="text-left">
                  <div className="text-slate-200">Email</div>
                  <div className="text-slate-400">hello@propscan.com</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mt-0.5 text-slate-300 flex-shrink-0"
                >
                  <path
                    d="M6.6 10.8a15.05 15.05 0 006.6 6.6l2.2-2.2a1 1 0 01.9-.3c1 .3 2 .5 3 .5a1 1 0 011 1V21a1 1 0 01-1 1C10.6 22 2 13.4 2 2a1 1 0 011-1h3.5a1 1 0 011 1c0 1 .2 2 .5 3 .1.4 0 .8-.3.9L6.6 10.8z"
                    fill="currentColor"
                  />
                </svg>
                <div className="text-left">
                  <div className="text-slate-200">Phone</div>
                  <div className="text-slate-400">+1 (234) 567-890</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mt-0.5 text-slate-300 flex-shrink-0"
                >
                  <path
                    d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5 2.5 2.5 0 0112 11.5z"
                    fill="currentColor"
                  />
                </svg>
                <div className="text-left">
                  <div className="text-slate-200">Address</div>
                  <div className="text-slate-400">
                    123 Property Street San Francisco, CA 94102
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start md:items-start">
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-slate-400 text-center md:text-left">
              <li className="hover:text-white cursor-pointer">Privacy</li>
              <li className="hover:text-white cursor-pointer">Terms</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 text-center text-slate-500 text-sm">
          © 2024 PropScan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
