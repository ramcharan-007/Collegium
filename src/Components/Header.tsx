import { useState } from "react";

const Header = () => {
  // States for dropdown selection
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [step, setStep] = useState("course");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // States for search and goal dropdown
  const [searchQuery, setSearchQuery] = useState("");

  // Course + City selection options
  const courseCategories = {
    Engineering: ["BE/B.Tech", "Diploma in Engineering", "ME/M.Tech"],
    Management: ["MBA/PGDM", "BBA/BMS", "Executive MBA"],
    Commerce: ["B.Com", "M.Com"],
    Arts: ["BA", "MA", "BFA"],
    Science: ["B.Sc", "M.Sc"],
  };

  const cities = [
    "New Delhi",
    "Gurgaon",
    "Noida",
    "Mumbai",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Bangalore",
    "Pune",
    "Ahmedabad",
    "Lucknow",
    "Coimbatore",
  ];

  // Course & City handlers
  const handleCourseSelect = (course: string) => {
  setSelectedCourse(course);
  setStep("city");
};

const handleCitySelect = (city: string) => {
  setSelectedCity(city);
  setIsDropdownOpen(false);
  setStep("course");
};
  // Bottom Navigation Courses
  const courses = [
    { name: "All Courses", icon: "📚" },
    { name: "B.Tech", link: "#" },
    { name: "MBA", link: "#" },
    { name: "M.Tech", link: "#" },
    { name: "MBBS", link: "#" },
    { name: "B.Com", link: "#" },
    { name: "B.Sc", link: "#" },
    { name: "B.Sc (Nursing)", link: "#" },
    { name: "BA", link: "#" },
    { name: "BBA", link: "#" },
    { name: "BCA", link: "#" },
  ];

  return (
    <header className="bg-gray-900 text-white">
      {/* === TOP BAR === */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* === LEFT SECTION === */}
            <div className="flex items-center gap-6 flex-1">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  🎓
                </div>
                <span className="text-xl font-bold">collegedunia</span>
              </div>

              {/* Goal & City Selector + Search */}
              <div className="flex items-center gap-2 flex-1 max-w-4xl">
                {/* Select Goal & City */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
                  >
                    <span className="text-orange-500 text-sm">
                      ⚙ Select Goal & ⊙ City
                    </span>
                    {selectedCourse && (
                      <span className="text-sm text-white ml-2">
                        {selectedCourse}
                        {selectedCity && ` - ${selectedCity}`}
                      </span>
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-[400px] bg-white text-gray-800 rounded-lg shadow-xl z-50 p-4">
                      {step === "course" && (
                        <>
                          <div className="text-lg font-semibold mb-3">
                            Select Your Study Preference
                          </div>
                          {Object.entries(courseCategories).map(
                            ([category, list]) => (
                              <div key={category} className="mb-3">
                                <div className="font-semibold text-gray-700 mb-1">
                                  {category}
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  {list.map((course) => (
                                    <button
                                      key={course}
                                      onClick={() =>
                                        handleCourseSelect(course)
                                      }
                                      className="border border-gray-300 rounded-md px-2 py-1 text-left hover:bg-gray-100 transition-colors"
                                    >
                                      {course}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )
                          )}
                        </>
                      )}

                      {step === "city" && (
                        <>
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-lg font-semibold">
                              Select Preferred City
                            </div>
                            <button
                              onClick={() => setStep("course")}
                              className="text-blue-500 text-sm hover:underline"
                            >
                              Modify Course
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            {cities.map((city) => (
                              <button
                                key={city}
                                onClick={() => handleCitySelect(city)}
                                className="border border-gray-300 rounded-md px-2 py-2 hover:bg-gray-100 transition-colors text-sm"
                              >
                                {city}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-6 w-px bg-gray-700"></div>

                {/* Search Bar */}
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="Search for Colleges, Exams, Courses and More.."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white text-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* === RIGHT SECTION === */}
            <div className="flex items-center gap-4 ml-4">
              {/* Write a Review */}
              <button className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                <span className="text-lg">✏</span>
                <div className="text-left">
                  <div className="text-sm font-medium">Write a Review</div>
                  <div className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded">
                    Get Upto 1300₹
                  </div>
                </div>
              </button>

              {/* Explore */}
              <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors">
                <span className="text-lg">⊞</span>
                <span className="text-sm">Explore</span>
              </button>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <span className="text-xl">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Menu */}
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <div className="flex flex-col gap-1">
                  <div className="w-5 h-0.5 bg-white"></div>
                  <div className="w-5 h-0.5 bg-white"></div>
                  <div className="w-5 h-0.5 bg-white"></div>
                </div>
              </button>

              {/* User Profile */}
              <button className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                <span className="text-white text-sm">👤</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* === BOTTOM NAVBAR === */}
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto">
            {courses.map((course, index) => (
              <a
                key={index}
                href={course.link || "#"}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                {course.icon && <span>{course.icon}</span>}
                <span>{course.name}</span>
              </a>
            ))}

            {/* Right Side Links */}
            <div className="ml-auto flex items-center gap-4 pl-4">
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 text-sm hover:text-orange-500 transition-colors whitespace-nowrap"
              >
                <span>🌍</span>
                <span>Study Abroad</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 text-sm bg-purple-600 hover:bg-purple-700 rounded transition-colors whitespace-nowrap"
              >
                <span>🔗</span>
                <span>Course Finder</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;