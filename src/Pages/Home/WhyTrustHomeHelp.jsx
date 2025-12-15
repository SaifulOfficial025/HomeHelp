import React from "react";

function WhyTrustHomeHelp() {
  return (
    <section className="w-full bg-gradient-to-b from-[#f6fbfb] to-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Why Trust HomeHelp
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            Built with security, transparency, and professionalism at its core
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-md border border-slate-100 p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-lg flex items-center justify-center mb-4 ">
              <img
                src="/whytrusthomehelp1.png"
                alt="secure payments"
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Secure Payments
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Bank-level encryption for all transactions
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-md border border-slate-100 p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-lg flex items-center justify-center mb-4 ">
              <img
                src="/whytrusthomehelp2.png"
                alt="verified reports"
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Verified Reports
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              All documents are authenticated and verified
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-md border border-slate-100 p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-lg flex items-center justify-center mb-4 ">
              <img
                src="/whytrusthomehelp3.png"
                alt="instant access"
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Instant Access
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Unlock reports in seconds after payment
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl shadow-md border border-slate-100 p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-lg flex items-center justify-center mb-4 ">
              <img
                src="/whytrusthomehelp4.png"
                alt="trusted platform"
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Trusted Platform
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              5-star rated by property professionals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyTrustHomeHelp;
