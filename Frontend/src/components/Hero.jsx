// HeroSection.js
import React from "react";

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-32">
            Malla Reddy University
          </h1>
          <p className="text-xl text-blue-100 mb-12">
            Empowering minds, shaping futures
          </p>

          {/* College Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-white/10 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">
                Excellence in Education
              </h3>
              <p className="text-blue-100">
                World-class curriculum designed for academic excellence and
                practical learning
              </p>
            </div>
            <div className="p-6 bg-white/10 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">
                State-of-the-art Facilities
              </h3>
              <p className="text-blue-100">
                Modern infrastructure with advanced laboratories and research
                centers
              </p>
            </div>
            <div className="p-6 bg-white/10 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Expert Faculty</h3>
              <p className="text-blue-100">
                Learn from experienced professors and industry professionals
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
