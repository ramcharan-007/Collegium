import React, { useState } from "react";
import { coursesFeesData } from "../../data/collegeInfoData";

const CoursesFeesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"undergraduate" | "postgraduate">("undergraduate");

  const currentCourses = activeTab === "undergraduate" 
    ? coursesFeesData.undergraduate 
    : coursesFeesData.postgraduate;

  return (
    <section id="courses-fees" className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Courses & Fees
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("undergraduate")}
          className={`pb-3 px-4 font-medium transition-all ${
            activeTab === "undergraduate"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Undergraduate
        </button>
        <button
          onClick={() => setActiveTab("postgraduate")}
          className={`pb-3 px-4 font-medium transition-all ${
            activeTab === "postgraduate"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Postgraduate
        </button>
      </div>

      {/* Courses Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Course</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Duration</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Total Fees</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Eligibility</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Seats</th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.map((course, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-4 font-medium text-gray-800">{course.course}</td>
                <td className="px-4 py-4 text-gray-600">{course.duration}</td>
                <td className="px-4 py-4 text-blue-600 font-semibold">{course.fees}</td>
                <td className="px-4 py-4 text-gray-600">{course.eligibility}</td>
                <td className="px-4 py-4 text-gray-600">{course.seats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note */}
      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="text-sm text-gray-700">
          <i className="fa-solid fa-circle-info text-blue-600 mr-2"></i>
          <strong>Note:</strong> Fees mentioned are indicative and may vary. Please visit the official website for the latest fee structure.
        </p>
      </div>
    </section>
  );
};

export default CoursesFeesSection;
