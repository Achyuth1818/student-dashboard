// HeroSection.js
import React from "react";

const HeroSection = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-blue-900 text-white">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Welcome to My Website
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Discover the amazing features and services we offer to help you
          succeed.
        </p>
        <a
          href="#features"
          className="bg-white text-blue-600 py-2 px-6 rounded-lg"
        >
          Explore Features
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
