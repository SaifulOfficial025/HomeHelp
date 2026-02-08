import React from "react";
import Button from "./Button";
import { IoQrCodeSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PropertyCard({
  title,
  address,
  beds,
  baths,
  parking,
  reportsCompleted,
  reportsTotal,
  optionalCount,
  status,
  image, // legacy prop
  imageUrl, // newer prop name
  slug, // for navigation
  isLocked = false,
  onQR = () => {},
  onEdit = () => {},
}) {
  const display = (v) =>
    v === null || v === undefined || v === "" ? "..." : v;
  const num = (v) => (typeof v === "number" ? v : v ? Number(v) : 0);
  const progress = Math.min(
    100,
    Math.round((num(reportsCompleted) / Math.max(1, num(reportsTotal))) * 100),
  );
  const navigate = useNavigate();

  const imgSrc = imageUrl || image || "/propertydummyimage.jpg";
  const statusText =
    typeof status === "boolean"
      ? status
        ? "Active"
        : "Locked"
      : display(status);

  const handleQR = () => {
    try {
      onQR();
    } catch (e) {}
    navigate("/qr_link");
  };

  const handleEdit = () => {
    try {
      onEdit();
    } catch (e) {}
    navigate("/edit_properties", { state: { slug } });
  };

  const handleCardClick = () => {
    if (slug) {
      navigate(`/property_details/${slug}`, { state: { locked: isLocked } });
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm h-[560px] flex flex-col cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={imgSrc}
          alt={display(title)}
          className="w-full h-48 object-cover"
        />
        <div className="absolute left-4 top-4 bg-[#dcfce7] text-sm text-[#388c5e] px-3 py-1 rounded-full font-semibold border-[#388c5e]">
          {statusText}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 leading-tight h-14 overflow-hidden">
            {display(title)}
          </h3>
          <p className="text-sm text-slate-500 mt-2 h-10 overflow-hidden">
            {display(address)}
          </p>

          <div className="mt-4 text-sm text-slate-600 flex items-center gap-3">
            <span>{display(beds)} beds</span>
            <span className="mx-1">•</span>
            <span>{display(baths)} baths</span>
            <span className="mx-1">•</span>
            <span>{display(parking)} parking</span>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <div>Highly Recommended Reports</div>
              <div className="font-semibold text-[#00c950]">
                {display(reportsCompleted)}/{display(reportsTotal)}
              </div>
            </div>

            <div className="w-full h-2 bg-slate-100 rounded-full mt-2">
              <div
                className="h-2 rounded-full bg-[#00c950]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="text-xs text-slate-400 mt-2">
              +{display(optionalCount)} optional reports
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Button
            color="blue"
            size="md"
            rounded={false}
            shadow
            onClick={(e) => {
              e.stopPropagation();
              handleQR();
            }}
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
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
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
