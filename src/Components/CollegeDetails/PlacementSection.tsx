import React from "react";
import { placementData } from "../../data/collegeInfoData";

const PlacementSection: React.FC = () => {
  const { stats2024, topRecruiters, branchWisePlacements } = placementData;

  return (
    <section id="placement" className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Placements 2024
      </h2>

      {/* Overall Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">{stats2024.averagePackage}</div>
          <p className="text-xs text-gray-600">Average Package</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">{stats2024.highestPackage}</div>
          <p className="text-xs text-gray-600">Highest Package</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">{stats2024.placementRate}</div>
          <p className="text-xs text-gray-600">Placement Rate</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">{stats2024.totalCompanies}+</div>
          <p className="text-xs text-gray-600">Companies Visited</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-red-600 mb-1">{stats2024.totalOffers}+</div>
          <p className="text-xs text-gray-600">Total Offers</p>
        </div>
      </div>

      {/* Branch-wise Placements */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Branch-wise Placements</h3>
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Branch</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Avg Package</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Highest Package</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Students Placed</th>
              </tr>
            </thead>
            <tbody>
              {branchWisePlacements.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-4 font-medium text-gray-800">{item.branch}</td>
                  <td className="px-4 py-4 text-center text-blue-600 font-semibold">{item.avgPackage}</td>
                  <td className="px-4 py-4 text-center text-green-600 font-semibold">{item.highestPackage}</td>
                  <td className="px-4 py-4 text-center text-purple-600 font-semibold">{item.placed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Recruiters */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Top Recruiters</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {topRecruiters.map((company, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition bg-gray-50"
              >
                <span className="text-sm font-medium text-gray-700 text-center">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Placement Process Info */}
      <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <h4 className="font-semibold text-gray-800 mb-2">Placement Process</h4>
        <p className="text-sm text-gray-700">
          The Training & Placement Cell conducts regular workshops, mock interviews, and aptitude training sessions. Companies start visiting campus from August onwards for the final placement season.
        </p>
      </div>
    </section>
  );
};

export default PlacementSection;
