import React from "react";
import { collegeInfoContent } from "../../data/collegeInfoData";

const CollegeInfoSection: React.FC = () => {
  const { about, highlights, additionalInfo } = collegeInfoContent;

  return (
    <section id="info" className="mb-8">
      {/* Main Info */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* About Section */}
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
          {about.title}
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
          {about.description}
        </p>

        {/* Highlights */}
        <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">
          {highlights.title}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-sm text-gray-700">
          {highlights.items.map((item, index) => (
            <React.Fragment key={index}>
              <span className="font-medium text-gray-500">{item.label}</span>
              <span className="col-span-1 text-gray-800">{item.value}</span>
            </React.Fragment>
          ))}
        </div>

        {/* Additional Info */}
        {additionalInfo && (
          <>
            <h3 className="text-lg md:text-xl font-semibold mt-8 mb-3 text-gray-800">
              {additionalInfo.title}
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {additionalInfo.description}
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default CollegeInfoSection;
