import React from "react";
import Navbar from "./Navbar";
import QRandPropertyLink from "../../Shared/QRandPropertyLink";
import Button from "../../Shared/Button";

function QRPage() {
  const propertyTitle = "Modern Waterfront Villa";
  const publicUrl = "https://homehelp.app/p/demo-token-1";

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-extrabold text-slate-800">
          QR Code & Property Link
        </h2>
        <p className="text-sm text-slate-500 mt-1">{propertyTitle}</p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column: QR card (now balanced columns on lg) */}
          <div>
            <QRandPropertyLink
              qrSrc="/qr_sample.png"
              propertyLink={publicUrl}
            />
          </div>

          {/* Right column: stacked info cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-semibold text-slate-800 mb-3">
                Public Property URL
              </h3>
              <div className="flex items-center gap-3">
                <input
                  readOnly
                  value={publicUrl}
                  className="flex-1 bg-slate-100 rounded-md px-3 py-2 text-sm text-slate-600"
                />
                <Button
                  color="black"
                  size="md"
                  rounded
                  onClick={() => navigator.clipboard?.writeText(publicUrl)}
                >
                  Copy
                </Button>
              </div>
              <p className="text-xs text-slate-400 mt-3">
                Share this link or QR code with potential buyers. They can scan
                to preview and unlock full documentation for $50.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-semibold text-slate-800 mb-3">
                How It Works
              </h3>
              <ol className="list-none text-sm text-slate-600 space-y-4">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[#18aa99] text-white flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div className="mt-1.5">
                    Buyer scans QR code or visits the link
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[#18aa99] text-white flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div className="mt-1.5">
                    They see a locked preview of property photos and report list
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[#18aa99] text-white flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div className="mt-1.5">
                    Buyer pays $50 to unlock all documentation
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[#18aa99] text-white flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div className="mt-1.5">
                    Instant access to view and download all reports
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-3">
                Secure Access
              </h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>Documents protected by unique QR token</li>
                <li>Download links expire in 5 minutes</li>
                <li>Secure Stripe payment processing</li>
                <li>Read-only access for buyers</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-semibold text-slate-800 mb-4">
                Property Stats
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#18aa99]">3</div>
                  <div className="text-xs text-slate-500">Photos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#18aa99]">6</div>
                  <div className="text-xs text-slate-500">Total Reports</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#18aa99]">0</div>
                  <div className="text-xs text-slate-500">Views</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#18aa99]">0</div>
                  <div className="text-xs text-slate-500">Unlocks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default QRPage;
