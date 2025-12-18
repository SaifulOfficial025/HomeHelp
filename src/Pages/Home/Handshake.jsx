import React from "react";
import handshakeImage from "../../../public/handshake.png";
function Handshake() {
  return (
    <div
      className="relative flex items-center justify-center min-h-[300px] md:min-h-screen w-full bg-center bg-cover"
      style={{ backgroundImage: `url(${handshakeImage})` }}
    >
      <h2 className="absolute bg-black/50 inset-0 flex items-center justify-center text-2xl md:text-7xl font-bold text-white drop-shadow-lg text-center px-44 ">
        MAKE PROPERTY SETTLEMENTS <br /> <br /> AS QUICK AS A HANDSHAKE
      </h2>
    </div>
  );
}

export default Handshake;
