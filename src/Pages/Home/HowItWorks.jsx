import React from "react";
import { FiCheckCircle } from "react-icons/fi";

function HowItWorks() {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            How It Works
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            Simple, secure, and transparent property documentation in three
            steps
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-md border border-slate-100 p-8">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 ">
              <img src="/howitworks1.png" alt="upload" className="w-14 h-14" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              1. Upload Reports
            </h3>
            <p className="mt-3 text-slate-600 text-sm">
              Property owners upload verified building inspections, compliance
              reports, and mandatory documentation.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-[#18aa99] mt-0.5" />
                <span>Building Inspection</span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-[#18aa99] mt-0.5" />
                <span>Pest & Termite</span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-[#18aa99] mt-0.5" />
                <span>Electrical Safety</span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-[#18aa99] mt-0.5" />
                <span>Plumbing & Gas</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-md border border-slate-100 p-8">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 ">
              <img
                src="/howitworks2.png"
                alt="generate"
                className="w-14 h-14"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              2. Generate QR Code
            </h3>
            <p className="mt-3 text-slate-600 text-sm">
              System creates a unique QR code linked to your verified property
              documentation package.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-[#f59e0b] mt-0.5" />
                <span>Unique Property Link</span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-[#f59e0b] mt-0.5" />
                <span>Download & Print</span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-[#f59e0b] mt-0.5" />
                <span>Toggle Active/Inactive</span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-[#f59e0b] mt-0.5" />
                <span>Track Access</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-md border border-slate-100 p-8">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 ">
              <img src="/howitworks3.png" alt="secure" className="w-14 h-14" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              3. Secure Paid Access
            </h3>
            <p className="mt-3 text-slate-600 text-sm">
              Buyers scan the QR code, preview the property, and pay to unlock
              full documentation.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-[#0f172a] mt-0.5" />
                <span>Instant Preview</span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-[#0f172a] mt-0.5" />
                <span>Secure Payment</span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-[#0f172a] mt-0.5" />
                <span>Read-Only Access</span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-[#0f172a] mt-0.5" />
                <span>Download Reports</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
