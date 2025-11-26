import React from "react";
import { admissionData } from "../../data/collegeInfoData";

const AdmissionSection: React.FC = () => {
  const { process, importantDates, eligibility } = admissionData;

  return (
    <section id="admission" className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Admission 2025
      </h2>

      {/* Admission Process */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Admission Process</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {process.map((item) => (
            <div
              key={item.step}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-3">
                {item.step}
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Important Dates */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Important Dates</h3>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Event</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {importantDates.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-800">{item.event}</td>
                  <td className="px-4 py-3 text-blue-600 font-medium">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Eligibility Criteria */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Eligibility Criteria</h3>
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">B.Tech Programs</h4>
            <p className="text-sm text-gray-600">{eligibility.btech}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">M.Tech Programs</h4>
            <p className="text-sm text-gray-600">{eligibility.mtech}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">MBA Program</h4>
            <p className="text-sm text-gray-600">{eligibility.mba}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionSection;
