import React from "react";
import Button from "./Button";
import { IoQrCodeSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PropertyCard({
  title = "Modern Waterfront Villa",
  address = "123 Seaside Avenue, Bondi Beach NSW 2026",
  beds = 4,
  baths = 3,
  parking = 2,
  reportsCompleted = 4,
  reportsTotal = 4,
  optionalCount = 2,
  status = "Active",
  image = "/propertydummyimage.jpg",
  onQR = () => {},
  onEdit = () => {},
}) {
  const progress = Math.min(
    100,
    Math.round((reportsCompleted / Math.max(1, reportsTotal)) * 100)
  );
  const navigate = useNavigate();

  const handleQR = () => {
    try {
      onQR();
    } catch (e) {
      // ignore handler errors
    }
    navigate("/qr_link");
  };

  const handleEdit = () => {
    try {
      onEdit();
    } catch (e) {
      // ignore handler errors
    }
    navigate("/edit_properties");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-44 object-cover" />
        <div className="absolute left-4 top-4 bg-[#dcfce7] text-sm text-[#388c5e] px-3 py-1 rounded-full font-semibold border-[#388c5e]">
          {status}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-slate-500 mt-2">{address}</p>

        <div className="mt-4 text-sm text-slate-600 flex items-center gap-3">
          <span>{beds} beds</span>
          <span className="mx-1">•</span>
          <span>{baths} baths</span>
          <span className="mx-1">•</span>
          <span>{parking} parking</span>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <div>Mandatory Reports</div>
            <div className="font-semibold text-[#00c950]">
              {reportsCompleted}/{reportsTotal}
            </div>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full mt-2">
            <div
              className="h-2 rounded-full bg-[#00c950]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-xs text-slate-400 mt-2">
            +{optionalCount} optional reports
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Button
            color="blue"
            size="md"
            rounded={false}
            shadow
            onClick={handleQR}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <IoQrCodeSharp className="text-xl" />
            QR Code
          </Button>

          <Button
            color="white"
            size="md"
            outline
            shadow
            rounded={false}
            textColor="black"
            onClick={handleEdit}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <FaRegEdit className="text-lg" />
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
