import React, { useState } from "react";
import Button from "./Button";
import { FiDownload } from "react-icons/fi";
import { MdLocalPrintshop, MdContentCopy } from "react-icons/md";
import { MdOutlineVerifiedUser } from "react-icons/md";

function QRandPropertyLink({
  qrSrc = "/qr_sample.png",
  verifiedText = "Verified Property Data",
  propertyLink = window.location.href,
}) {
  const [active, setActive] = useState(true);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qrSrc;
    link.download = "property-qr.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(
      `<img src="${qrSrc}" style="max-width:100%;height:auto;"/>`,
    );
    w.document.close();
    w.focus();
    w.print();
    w.close();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(propertyLink);
      // small feedback could be added
      console.log("Copied link");
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm">
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-xl p-4 shadow-lg shadow-[#18aa99]">
          <img
            src={qrSrc}
            alt="qr"
            className="w-40 h-40 object-contain rounded-md "
          />
        </div>

        <div className="mt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#18aa99] text-sm text-[#18aa99] bg-[#e8f8f7]">
            <MdOutlineVerifiedUser className="text-lg" />
            {verifiedText}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <span className="text-sm text-slate-500">Inactive</span>
          <button
            onClick={() => setActive((s) => !s)}
            className={`w-12 h-6 rounded-full p-0.5 transition-all ${
              active ? "bg-[#18aa99]" : "bg-slate-200"
            }`}
            aria-pressed={active}
          >
            <span
              className={`block w-5 h-5 bg-white rounded-full shadow transform transition ${
                active ? "translate-x-6" : "translate-x-0"
              }`}
            ></span>
          </button>
          <span className="text-sm text-slate-500">Active</span>
        </div>

        <div className="w-full mt-6 space-y-3">
          <Button
            color="black"
            size="md"
            rounded={false}
            shadow
            className="w-full flex items-center justify-center gap-2"
            onClick={handleDownload}
          >
            <FiDownload />
            Download PNG
          </Button>
          {/* 
          <Button
            color="white"
            size="md"
            outline
            rounded={false}
            shadow
            textColor="black"
            className="w-full flex items-center justify-center gap-2"
            onClick={handlePrint}
          >
            <MdLocalPrintshop />
            Print A4 Sheet
          </Button> */}

          <Button
            color="white"
            size="md"
            outline
            rounded={false}
            shadow
            textColor="black"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleCopy}
          >
            <MdContentCopy />
            Copy Link
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QRandPropertyLink;
