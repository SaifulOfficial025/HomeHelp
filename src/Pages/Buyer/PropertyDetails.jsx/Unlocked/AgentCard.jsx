import React from "react";
import {
  FaHome,
  FaPhoneAlt,
  FaRegEnvelope,
  FaCheckCircle,
  FaStar,
  FaRegBell,
} from "react-icons/fa";
import { MdSms } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { useProperty } from "./Layout";

function AgentCard() {
  const property = useProperty();
  const ownerImage = property.owner_image
    ? property.owner_image.startsWith("http")
      ? property.owner_image
      : `http://10.10.13.99:8006/media/${property.owner_image}`
    : null;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Agent Card */}
      <div className="bg-white rounded-2xl shadow p-5 flex flex-col items-start">
        <div className="w-full flex items-center gap-4">
          {ownerImage ? (
            <img
              src={ownerImage}
              alt={property.owner_name}
              className="w-14 h-14 rounded-full object-cover flex-none"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className="w-14 h-14 rounded-full bg-[#e6faf7] flex items-center justify-center flex-none"
            style={{ display: ownerImage ? "none" : "flex" }}
          >
            <FaHome className="text-[#18aa99] text-2xl" />
          </div>

          <div className="flex-1">
            <div className="text-lg font-extrabold text-slate-800">
              {property.owner_name || "Property Owner"}
            </div>
            <div className="text-xs text-slate-500">Property Owner</div>
            <div className="flex items-center gap-2 text-[#fbbf24] text-sm mt-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="text-slate-500 text-xs">(5.0)</span>
            </div>
          </div>
        </div>

        {property.owner_phone && (
          <button className="w-full bg-[#133a5c] hover:bg-[#0a2a47] text-white font-semibold py-2 rounded-lg text-sm flex items-center justify-center gap-2 mt-4">
            <FaPhoneAlt /> {property.owner_phone}
          </button>
        )}
        <button className="w-full border-2 border-[#133a5c] text-[#133a5c] font-semibold py-2 rounded-lg text-sm flex items-center justify-center gap-2 mb-2 mt-2">
          <MdSms /> Send Message
        </button>
        {property.owner_email && (
          <button className="w-full border-2 border-slate-200 text-slate-700 font-semibold py-2 rounded-lg text-sm flex items-center justify-center gap-2">
            <MdEmail /> {property.owner_email}
          </button>
        )}
        <div className="flex flex-col gap-1 w-full mt-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Owner Verified</span>
            <FaCheckCircle className="text-[#18aa99]" />
          </div>
          {property.total_inspection_reports > 0 && (
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>
                Reports Available ({property.total_inspection_reports})
              </span>
              <FaCheckCircle className="text-[#18aa99]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AgentCard;
