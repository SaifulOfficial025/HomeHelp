import React from "react";
import Button from "../../Shared/Button";
import { Link } from "react-router-dom";

function ReadytoTransform() {
  return (
    <section
      className="w-full py-16"
      style={{
        backgroundImage: 'url("/readytotransformbg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
          Ready to transform your property sales?
        </h2>

        <p className="mt-4 text-white/90 max-w-2xl mx-auto">
          Join hundreds of property owners building trust and selling faster
          with verified documentation.
        </p>

        <div className="mt-8">
          <Link to="/signin">
            <Button color="blue" size="md" rounded={false} shadow>
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ReadytoTransform;
