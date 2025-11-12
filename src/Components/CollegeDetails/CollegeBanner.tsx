import React, { useState } from "react";
import { collegeBannerData } from "../../data/collegeData";
import CollegePredictorModal from "./CollegePredictorModal";

const CollegeBanner: React.FC = () => {
  const { logo, name, tagline, location, estd, accreditation } =
    collegeBannerData;
  
  const [isPredictorOpen, setIsPredictorOpen] = useState(false);

  return (
    <>
      <section className="bg-[#2f3640] text-white college-banner">
        {/* === Outer Container === */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          {/* === Left Section: College Info === */}
          <div className="flex items-start sm:items-center gap-4 w-full md:w-auto">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src={logo}
                alt={`${name} Logo`}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
              />
            </div>

            {/* College Info Text */}
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl md:text-[1.55rem] font-semibold leading-snug sm:leading-tight">
                <span className="font-bold">{name}:</span>{" "}
                <span className="font-normal text-gray-200">{tagline}</span>
              </h1>

              <p className="text-xs sm:text-sm text-gray-300 mt-1 flex flex-wrap items-center gap-1 sm:gap-2">
                <span>{location}</span>
                <span className="text-gray-400 hidden sm:inline">|</span>
                <span className="flex items-center gap-1">
                  <i className="fa-regular fa-calendar text-gray-400 text-[0.8rem] sm:text-sm"></i>
                  <span>Estd {estd}</span>
                </span>
                <span className="text-gray-400 hidden sm:inline">|</span>
                <span className="flex items-center gap-1">
                  <i className="fa-solid fa-shield text-gray-400 text-[0.8rem] sm:text-sm"></i>
                  <span>{accreditation}</span>
                </span>
              </p>
            </div>
          </div>

          {/* === Right Section: Rating + Buttons === */}
          <div className="flex flex-col items-start sm:items-center md:items-end gap-3 w-full md:w-auto">
            
            {/* Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <div className="flex items-center gap-1 text-yellow-400">
                <span className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                  3.9
                </span>
                <span className="flex">
                  {Array.from({ length: 4 }, (_, i) => (
                    <i key={i} className="fa-solid fa-star text-sm sm:text-base"></i>
                  ))}
                  <i className="fa-regular fa-star text-gray-400 text-sm sm:text-base"></i>
                </span>
              </div>

              {/* Reviews link */}
              <a
                href="#reviews"
                className="text-xs sm:text-sm text-blue-400 hover:underline"
              >
                (128 Reviews)
              </a>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto">
              <button 
                onClick={() => setIsPredictorOpen(true)}
                className="border border-gray-400 rounded-full px-5 py-1.5 min-w-[150px] whitespace-nowrap text-xs sm:text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-900 transition"
              >
                Will You Get In
              </button>
              <button className="border border-gray-400 rounded-full px-5 py-1.5 min-w-[170px] whitespace-nowrap text-xs sm:text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-900 transition">
                Get Contact Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* College Predictor Modal */}
      <CollegePredictorModal
        isOpen={isPredictorOpen}
        onClose={() => setIsPredictorOpen(false)}
        collegeName={name}
        collegeLogo={logo}
      />
    </>
  );
};

export default CollegeBanner;
