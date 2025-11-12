import React, { useEffect, useRef, useState } from "react";
import {
  topCoursesData,
  newsData,
  facultiesData,
  relatedCoursesData,
  relatedCollegesData,
  photosData,
} from "../../data/sidebarData";

interface RightSidebarProps {
  collegeId?: string;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ collegeId = "aiet" }) => {
  const asideRef = useRef<HTMLElement | null>(null);
  const [isInterested, setIsInterested] = useState(false);

  useEffect(() => {
    const setStickyTop = () => {
      const header = document.querySelector("header");
      const navbar = document.querySelector("nav");
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
      const totalOffset = headerHeight + navbarHeight + 12;

      if (asideRef.current) {
        asideRef.current.style.top = `${totalOffset}px`;
      }
    };

    setStickyTop();
    window.addEventListener("resize", setStickyTop);
    return () => window.removeEventListener("resize", setStickyTop);
  }, []);

  return (
    <aside
      ref={asideRef}
      className="space-y-5 md:sticky h-fit hidden md:block"
      style={{ maxHeight: "calc(100vh - 140px)", overflowY: "auto" }}
    >
      {/* Are You Interested in this College? */}
      <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
        <h4 className="text-base font-semibold mb-4 text-gray-900">
          Are You Interested in this College?
        </h4>
        <div className="space-y-3">
          <button className="w-full py-3 px-4 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
            Apply Now
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            Download Brochure
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Write a Review & Win Monthly Prizes */}
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg shadow-lg p-6 text-white">
        <h4 className="text-lg font-bold mb-2">
          Write a Review & Win Monthly Prizes
        </h4>
        <p className="text-2xl font-bold mb-1">
          upto <span className="text-orange-400">₹100000*</span>
        </p>
        <p className="text-sm mb-4 text-purple-200">
          *Extra Cash for Selected Colleges
        </p>
        <div className="text-center mb-4">
          <p className="text-sm font-semibold mb-2">Winners Will Get</p>
          <div className="bg-yellow-500 text-purple-900 font-bold py-2 px-4 rounded-md inline-block">
            <span className="text-xs">1st Prize Winner</span>
            <div className="text-lg">₹1,00,000/-</div>
          </div>
        </div>
        <button className="w-full py-3 px-4 bg-orange-500 text-white rounded-md font-bold hover:bg-orange-600 transition-colors">
          Start Writing
        </button>
      </div>

      {/* Course Finder */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg p-5 text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-lg font-bold">Course Finder</h4>
            <p className="text-sm text-blue-100">Find Courses: 30K+ Choices</p>
          </div>
          <div className="text-4xl">🎓</div>
        </div>
        <button className="w-full py-2 px-4 bg-white text-blue-700 rounded-md font-semibold hover:bg-blue-50 transition-colors">
          Search Now →
        </button>
      </div>

      {/* College Predictor */}
      <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg shadow-lg p-5 text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-lg font-bold">College Predictor</h4>
            <p className="text-sm text-teal-100">Know Your Odds of Admission</p>
          </div>
          <div className="text-4xl">🏛️</div>
        </div>
        <button className="w-full py-2 px-4 bg-white text-teal-700 rounded-md font-semibold hover:bg-teal-50 transition-colors">
          Predict Now →
        </button>
      </div>

      {/* Photos */}
      <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
        <h4 className="text-base font-semibold mb-4 text-gray-900">Photos</h4>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {photosData.map((photo) => (
            <div
              key={photo.id}
              className="aspect-square bg-gray-200 rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <button className="w-full py-2 text-center border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          View All Photos
        </button>
      </div>

      {/* Top Courses */}
      <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
        <h4 className="text-base font-semibold mb-4 text-gray-900">
          Top Courses
        </h4>
        <div className="space-y-3">
          {topCoursesData.map((course) => (
            <div
              key={course.id}
              className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200"
            >
              <p className="text-sm font-medium text-gray-900 mb-2">
                {course.name}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Course Duration: {course.duration}
                </span>
              </div>
              <p className="text-sm font-semibold text-green-600 mt-1">
                {course.fees} <span className="text-xs text-gray-500">First Year Fees</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{course.type}</p>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-center border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          View All Courses
        </button>
      </div>

      {/* News */}
      <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
        <h4 className="text-base font-semibold mb-4 text-gray-900">News</h4>
        <div className="space-y-3">
          {newsData.map((news) => (
            <div
              key={news.id}
              className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <img
                src={news.thumbnail}
                alt={news.title}
                className="w-16 h-16 rounded-md object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                  {news.title}
                </p>
                <p className="text-xs text-gray-500">{news.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faculties */}
      <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
        <h4 className="text-base font-semibold mb-4 text-gray-900">
          Faculties
        </h4>
        <div className="space-y-3">
          {facultiesData.map((faculty) => (
            <div key={faculty.id} className="pb-3 border-b border-gray-100 last:border-0">
              <p className="text-sm font-semibold text-gray-900">
                {faculty.name}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {faculty.designation}, {faculty.department}
              </p>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-center border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          View All Faculties
        </button>
      </div>

      {/* Learn More About Courses */}
      <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
        <h4 className="text-base font-semibold mb-4 text-gray-900">
          Learn More About Courses
        </h4>
        <div className="space-y-2">
          {relatedCoursesData.map((course) => (
            <div
              key={course.id}
              className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors py-1"
            >
              {course.name}
            </div>
          ))}
        </div>
      </div>

      {/* Student Also Visited */}
      <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
        <h4 className="text-base font-semibold mb-4 text-gray-900">
          Student Also Visited
        </h4>
        <div className="space-y-3">
          {relatedCollegesData.map((college) => (
            <div
              key={college.id}
              className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all"
            >
              <div className="flex items-start gap-3 mb-2">
                <img
                  src={college.logo}
                  alt={college.name}
                  className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 hover:text-blue-600 line-clamp-2 mb-1">
                    {college.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded">
                      <span className="text-xs font-semibold text-gray-900">
                        {college.rating}
                      </span>
                      <span className="text-yellow-500 text-xs">★</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      ({college.reviews} Reviews)
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-1">{college.program}</p>
              <p className="text-sm font-semibold text-green-600">
                {college.fees}{" "}
                <span className="text-xs font-normal text-gray-500">
                  First year Fees
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
