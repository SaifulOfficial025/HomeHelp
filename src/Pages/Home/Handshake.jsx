import React from "react";
import logoImage from "../../../public/footerlogo.png";
function Handshake() {
  return (
    <div className="relative  items-center justify-center min-h-[600px] bg-white w-full">
      <img
        src={logoImage}
        alt="Logo"
        className="h-32 w-32 justify-center mx-auto "
        style={{ minWidth: 128 }}
      />
      <div className="flex items-center justify-center w-full max-w-5xl mx-auto gap-8 px-8">
        <h2 className="flex-1 flex items-center justify-center text-2xl md:text-7xl font-bold text-black drop-shadow-lg text-center px-0 md:px-20">
          MAKE PROPERTY SETTLEMENTS <br /> <br /> AS QUICK AS A HANDSHAKE
        </h2>
      </div>
    </div>
  );
}

export default Handshake;
