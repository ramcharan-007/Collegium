import React, { useState } from "react";
import { cutoffData } from "../../data/collegeInfoData";

const CutoffSection: React.FC = () => {
  const [activeExam, setActiveExam] = useState<"kcet" | "comedk">("kcet");

  return (
    <section id="cutoff" className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Cut-Off 2024
      </h2>

      {/* Exam Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveExam("kcet")}
          className={`pb-3 px-4 font-medium transition-all ${
            activeExam === "kcet"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          KCET 2024
        </button>
        <button
          onClick={() => setActiveExam("comedk")}
          className={`pb-3 px-4 font-medium transition-all ${
            activeExam === "comedk"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          COMEDK 2024
        </button>
      </div>

      {/* KCET Cutoff Table */}
      {activeExam === "kcet" && (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Course</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">General</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">OBC</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">SC</th>
              </tr>
            </thead>
            <tbody>
              {cutoffData.kcet2024.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-4 font-medium text-gray-800">{item.course}</td>
                  <td className="px-4 py-4 text-center text-blue-600 font-semibold">{item.general}</td>
                  <td className="px-4 py-4 text-center text-gray-700">{item.obc}</td>
                  <td className="px-4 py-4 text-center text-gray-700">{item.sc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* COMEDK Cutoff Table */}
      {activeExam === "comedk" && (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Course</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Closing Rank</th>
              </tr>
            </thead>
            <tbody>
              {cutoffData.comedk2024.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-4 font-medium text-gray-800">{item.course}</td>
                  <td className="px-4 py-4 text-center text-blue-600 font-semibold">{item.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Note */}
      <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
        <p className="text-sm text-gray-700">
          <i className="fa-solid fa-exclamation-triangle text-yellow-600 mr-2"></i>
          <strong>Note:</strong> Cutoff ranks vary every year based on factors like number of applicants, seat availability, and difficulty level of the exam.
        </p>
      </div>
    </section>
  );
};

export default CutoffSection;
