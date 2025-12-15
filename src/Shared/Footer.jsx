import React from "react";
import { MdEmail } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-12 ml-64">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/footerlogo.png"
                alt="HomeHelp"
                className="w-16 h-16 object-contain"
              />
            </div>

            <p className="mt-4 text-sm text-slate-400 max-w-xs">
              Simplifying property transparency with secure document storage and
              QR-based verification.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                aria-label="facebook"
                className="w-9 h-9 inline-flex items-center justify-center bg-slate-800 rounded-md hover:bg-slate-700"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-slate-300"
                >
                  <path
                    d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.5c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.1h-1.07c-1.06 0-1.39.66-1.39 1.33v1.6h2.36l-.38 2.9h-1.98v7A10 10 0 0022 12z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                aria-label="twitter"
                className="w-9 h-9 inline-flex items-center justify-center bg-slate-800 rounded-md hover:bg-slate-700"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 5.9c-.6.3-1.2.5-1.9.6.7-.4 1.2-1 1.4-1.8-.7.4-1.5.7-2.3.9C18.2 4.7 17.1 4 15.9 4c-2 0-3.6 1.6-3.6 3.6 0 .3 0 .6.1.9C9.7 8.4 6.6 6.7 4.6 4.1c-.4.7-.6 1.5-.6 2.4 0 1.6.8 3 2 3.8-.6 0-1.2-.2-1.7-.5v.1c0 2.2 1.6 4 3.7 4.4-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1.6 1.9 2.4 3.3 4.4 3.3-1.6 1.3-3.6 2.1-5.8 2.1-.4 0-.8 0-1.2-.1 2.1 1.3 4.6 2 7.3 2 8.7 0 13.5-7.2 13.5-13.5v-.6c.9-.6 1.6-1.3 2.2-2.1-.8.4-1.7.6-2.6.7z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                aria-label="linkedin"
                className="w-9 h-9 inline-flex items-center justify-center bg-slate-800 rounded-md hover:bg-slate-700"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4.98 3.5A2.5 2.5 0 102 6a2.5 2.5 0 002.98-2.5zM3 8.98h3.96V21H3V8.98zM9.5 8.98H13v1.6h.06c.5-.95 1.72-1.95 3.54-1.95 3.78 0 4.48 2.5 4.48 5.75V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-1.99 1.35-1.99 2.75V21h-4V8.98z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                aria-label="instagram"
                className="w-9 h-9 inline-flex items-center justify-center bg-slate-800 rounded-md hover:bg-slate-700"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.2A4.8 4.8 0 1016.8 13 4.8 4.8 0 0012 8.2zM18.4 5.6a1.2 1.2 0 11-1.2-1.2 1.2 1.2 0 011.2 1.2z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MdEmail className="mt-0.5 text-slate-300" size={18} />
                <div>
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
                  className="mt-0.5 text-slate-300"
                >
                  <path
                    d="M6.6 10.8a15.05 15.05 0 006.6 6.6l2.2-2.2a1 1 0 01.9-.3c1 .3 2 .5 3 .5a1 1 0 011 1V21a1 1 0 01-1 1C10.6 22 2 13.4 2 2a1 1 0 011-1h3.5a1 1 0 011 1c0 1 .2 2 .5 3 .1.4 0 .8-.3.9L6.6 10.8z"
                    fill="currentColor"
                  />
                </svg>
                <div>
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
                  className="mt-0.5 text-slate-300"
                >
                  <path
                    d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5 2.5 2.5 0 0112 11.5z"
                    fill="currentColor"
                  />
                </svg>
                <div>
                  <div className="text-slate-200">Address</div>
                  <div className="text-slate-400">
                    123 Property Street San Francisco, CA 94102
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="hover:text-white cursor-pointer">Privacy</li>
              <li className="hover:text-white cursor-pointer">Terms</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 text-center text-slate-500 text-sm -ml-44">
          © 2024 PropScan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
