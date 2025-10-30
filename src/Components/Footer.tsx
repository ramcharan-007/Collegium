import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [course, setCourse] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, mobile, course });
    // Add newsletter subscription logic here
  };

  const footerSections = {
    topColleges: [
      { name: "M.B.A", link: "#" },
      { name: "B.Tech/B.E", link: "#" },
      { name: "MCA", link: "#" },
      { name: "BCA", link: "#" },
      { name: "M.Tech", link: "#" },
      { name: "MA", link: "#" },
      { name: "BA", link: "#" },
    ],
    topUniversities: [
      { name: "Engineering", link: "#" },
      { name: "Management", link: "#" },
      { name: "Medical", link: "#" },
      { name: "Law", link: "#" },
      { name: "Commerce", link: "#" },
      { name: "Science", link: "#" },
      { name: "Arts", link: "#" },
    ],
    topExam: [
      { name: "CAT", link: "#" },
      { name: "GATE", link: "#" },
      { name: "Jee-Main", link: "#" },
      { name: "NEET", link: "#" },
      { name: "XAT", link: "#" },
      { name: "CLAT", link: "#" },
      { name: "MAT", link: "#" },
    ],
    studyAbroad: [
      { name: "Canada", link: "#" },
      { name: "USA", link: "#" },
      { name: "UK", link: "#" },
      { name: "UAE", link: "#" },
      { name: "Australia", link: "#" },
      { name: "Germany", link: "#" },
      { name: "Sweden", link: "#" },
      { name: "Ireland", link: "#" },
      { name: "New Zealand", link: "#" },
      { name: "Hong Kong", link: "#" },
      { name: "Singapore", link: "#" },
      { name: "Malaysia", link: "#" },
      { name: "Netherlands", link: "#" },
      { name: "Italy", link: "#" },
    ],
    boardExams: [
      { name: "CBSE Class 12", link: "#" },
      { name: "CBSE Class 12th Results", link: "#" },
      { name: "CBSE Class 12th Syllabus", link: "#" },
      { name: "CBSE Class 12th Exam Dates", link: "#" },
      { name: "CBSE Class 10", link: "#" },
      { name: "CBSE Class 10th Result", link: "#" },
      { name: "CBSE Class 10th Syllabus", link: "#" },
    ],
  };

  const otherLinks = [
    { name: "About Collegedunia", link: "#" },
    { name: "Contact Us", link: "#" },
    { name: "Advertising", link: "#" },
    { name: "Career", link: "#" },
    { name: "Terms & Conditions", link: "#" },
  ];

  return (
    <footer className="bg-white">
      {/* Newsletter Section */}
      <div className="bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Subscribe To Our News Letter
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Get College Notifications, Exam Notifications and News Updates
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-3 justify-center items-center max-w-5xl mx-auto"
          >
            {/* Email Input */}
            <div className="relative w-full md:w-auto">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                ✉️
              </span>
              <input
                type="email"
                placeholder="Enter your email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                required
              />
            </div>

            {/* Mobile Input */}
            <div className="relative w-full md:w-auto">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                📱
              </span>
              <input
                type="tel"
                placeholder="Enter your mobile no"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                required
              />
            </div>

            {/* Course Dropdown */}
            <div className="relative w-full md:w-auto">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🎓
              </span>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full md:w-64 pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none appearance-none bg-white text-gray-500"
                required
              >
                <option value="">Choose your course</option>
                <option value="engineering">Engineering</option>
                <option value="medical">Medical</option>
                <option value="management">Management</option>
                <option value="law">Law</option>
                <option value="arts">Arts</option>
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                ▼
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-md transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="bg-gray-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* Top Colleges */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Top Colleges</h3>
              <ul className="space-y-2">
                {footerSections.topColleges.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.link}
                      className="text-gray-600 hover:text-orange-500 text-sm transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Universities */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Top Universities</h3>
              <ul className="space-y-2">
                {footerSections.topUniversities.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.link}
                      className="text-gray-600 hover:text-orange-500 text-sm transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Exam */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Top Exam</h3>
              <ul className="space-y-2">
                {footerSections.topExam.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.link}
                      className="text-gray-600 hover:text-orange-500 text-sm transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Study Abroad */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Study Abroad</h3>
              <ul className="space-y-2 columns-2 lg:columns-1">
                {footerSections.studyAbroad.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.link}
                      className="text-gray-600 hover:text-orange-500 text-sm transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Board Exams */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Board Exams</h3>
              <ul className="space-y-2">
                {footerSections.boardExams.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.link}
                      className="text-gray-600 hover:text-orange-500 text-sm transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 bg-white border-2 border-gray-300 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Scroll to top"
          >
            <span className="text-gray-600 text-xl">↑</span>
          </button>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-white border-t border-gray-200 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Other Links */}
          <div className="mb-4">
            <h3 className="font-bold text-gray-800 mb-3">Other Links</h3>
            <div className="flex flex-wrap gap-4">
              {otherLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="text-gray-600 hover:text-orange-500 text-sm transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Copyright and Social Links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
              <span className="font-semibold text-gray-800">collegedunia</span>
              <span className="text-gray-600 text-sm">
                © 2025 Collegedunia Web Pvt. Ltd. All Rights Reserved
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Social Media Icons */}
              <a
                href="#"
                className="text-gray-600 hover:text-orange-500 transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-orange-500 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-orange-500 transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-orange-500 transition-colors"
                aria-label="YouTube"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-orange-500 transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-orange-500 transition-colors"
                aria-label="RSS"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368C10.58 4.858 19.152 13.406 19.183 24h4.817C23.97 11.186 12.819 0 0 0v4.812z" />
                </svg>
              </a>

              {/* Download App Buttons */}
              <div className="flex gap-2 ml-4">
                <span className="text-sm text-gray-600 mr-2">
                  Download the Collegedunia app on
                </span>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img
                    src="https://via.placeholder.com/120x40/4285F4/FFFFFF?text=Google+Play"
                    alt="Get it on Google Play"
                    className="h-10"
                  />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img
                    src="https://via.placeholder.com/120x40/000000/FFFFFF?text=App+Store"
                    alt="Download on the App Store"
                    className="h-10"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
