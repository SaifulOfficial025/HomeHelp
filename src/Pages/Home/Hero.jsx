import React from "react";
import Button from "../../Shared/Button";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function Hero() {
  return (
    <section className="w-full bg-[#f5fafa">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left content */}
        <div className="lg:col-span-6">
          <div className="inline-block bg-white text-sm text-[#18aa99] rounded-full shadow-lg px-3 py-1 mb-6">
            {/* <FaStar className="inline-block mr-2 -mt-1" /> */}
            <FaCheckCircle className="inline-block mr-2 -mt-1" />
            Trusted by Property Owners
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
            Unlock Verified
            <br />
            <span className="bg-gradient-to-r from-[#18a797] via-[#10495c] to-[#819ea9] bg-clip-text text-transparent">
              Property Reports
            </span>
            <br />
            Instantly.
          </h1>

          <p className="mt-6 text-slate-600 max-w-lg">
            Generate secure QR codes for your properties. Let buyers unlock
            complete verified reports with a simple scan. Fast, secure, and
            professional.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link to="/signup">
              <Button color="blue" size="md" rounded={false} shadow>
                Get Started Free
              </Button>
            </Link>

            <Link to="/scan-qr">
              <Button
                color="white"
                size="md"
                rounded={false}
                outline
                shadow
                textColor="black"
              >
                Scan a QR
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <FaCheckCircle className="text-3xl  text-[#18aa99] mb-1" />
              {/* <div className="text-2xl  text-[#18aa99]">5,000+</div> */}
              <div className="text-sm text-slate-500">
                Properties Listed Free
              </div>
            </div>

            <div>
              <FaCheckCircle className="text-3xl  text-[#18aa99] mb-1" />
              {/* <div className="text-2xl  text-[#18aa99]">12,000+</div> */}
              <div className="text-sm text-slate-500">
                Reports Unlocked Instantly
              </div>
            </div>

            <div>
              <FaCheckCircle className="text-3xl  text-[#18aa99] mb-1" />
              {/* <div className="text-2xl  text-[#18aa99]">98%</div> */}
              <div className="text-sm text-slate-500">
                Satisfaction Guaranteed
              </div>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-md lg:max-w-2xl">
            <img
              src="/Container.png"
              alt="property samples"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
