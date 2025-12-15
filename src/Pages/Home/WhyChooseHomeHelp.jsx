import React from "react";
import Button from "../../Shared/Button";
function WhyChooseHomeHelp() {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Why Choose HomeHelp?
          </h2>

          <p className="mt-4 text-slate-600 max-w-xl">
            Build buyer confidence with verified property documentation.
            Transparent, secure, and instant access to all compliance reports.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10  flex items-center justify-center">
                <img
                  src="/whychoosehomehelp1.png"
                  alt="trust"
                  className="w-10 h-10"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900">
                  Trust & Transparency
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  All reports are verified and securely stored. Buyers get
                  complete property history.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10  rounded-lg flex items-center justify-center">
                <img
                  src="/whychoosehomehelp2.png"
                  alt="sell faster"
                  className="w-10 h-10"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900">
                  Sell Faster
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  Properties with complete documentation sell 40% faster with
                  higher buyer confidence.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10  rounded-lg flex items-center justify-center">
                <img
                  src="/whychoosehomehelp3.png"
                  alt="secure access"
                  className="w-10 h-10"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900">
                  Secure Access
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  Documents protected by unique QR tokens. Time-limited download
                  links ensure security.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Button color="black" size="md" rounded={false} shadow>
                Start Building Trust Today
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-lg">
            <img
              src="/whychoosehomehelp.png"
              alt="home sample"
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseHomeHelp;
