import { useState, useEffect, useRef } from "react";
import {
  courseCategories,
  cities,
  courses,
  allDropdownItems,
} from "../data/dataLists";

import {
  MapPin,
  Search,
  Edit3,
  Menu,
  User,
  Grid,
  Globe,
  Link,
  University,
  BookOpen,
  FileText,
  BellRing,
  Users,
  Calculator,
  HelpCircle,
  Award,
  Newspaper,
  CreditCard,
  MessageCircle,
  ClipboardList,
  GraduationCap,
  Star,
  Briefcase,
  Palette,
  Atom,
  Landmark,
  Building2,
  Cpu,
  ChevronDown,
} from "lucide-react";

import ProfileModal from "./ProfileModal";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [step, setStep] = useState("course");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  // STATE for All Courses dropdown
  const [isAllCoursesOpen, setIsAllCoursesOpen] = useState(false); 

  //profile
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  // REF for All Courses dropdown
  const allCoursesRef = useRef<HTMLDivElement>(null); 

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (exploreRef.current && !exploreRef.current.contains(event.target as Node)) {
        setIsExploreOpen(false);
      }
      // Logic to close the new All Courses dropdown
      if (allCoursesRef.current && !allCoursesRef.current.contains(event.target as Node)) {
        setIsAllCoursesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  // Category icons (Kept for Top Bar logic)
   const categoryIcons: Record<string, any> = {
    Engineering: Cpu,
    Management: Briefcase,
    Commerce: Calculator,
    Arts: Palette,
    Science: Atom,
    Pharmacy: Award,
    Medical: Landmark,
    Design: Palette,
    ComputerApplications: Cpu,
    Education: BookOpen,
    Agriculture: Building2,
    Animation: Palette,
    Architecture: Building2,
    HotelManagement: Briefcase,
    Law: FileText,
    Dental: Landmark,
    VeterinarySciences: Users,
    MassCommunications: Newspaper,
    Aviation: Globe,
    VocationalCourses: GraduationCap,
    Paramedical: ClipboardList,
  };

  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);
    setStep("city");
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsDropdownOpen(false);
    setStep("course");
  };

  // Function to render the individual course item in the dropdown
  const CourseDropdownItem = ({ name }: { name: string }) => (
    <a
      // Example dynamic route
      href={`/course/${name.toLowerCase().replace(/[\s/()&]/g, '-')}`}
      className="flex items-center justify-between text-gray-700 px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition duration-150"
      onClick={() => setIsAllCoursesOpen(false)}
    >
      <span>{name}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </a>
  );
  
  return (
    <header className="bg-white text-gray-800 shadow-sm border-b">
      {/* === TOP BAR === */}
      <div className="w-full flex items-center justify-between px-10 py-3">
        {/* === LEFT SECTION === */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-semibold">🎓</span>
            </div>
            <span className="text-2xl font-semibold text-[#2b4a91] tracking-tight">
              collegium<span className="text-gray-400 text-sm ml-1">.com</span>
            </span>
          </div>

          {/* Course + City Selector */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex flex-col text-left cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-xs text-orange-500 font-medium flex items-center gap-1">
                🎯 Select Goal & <MapPin size={12} className="text-orange-500" /> City
              </span>
              <div className="flex items-center gap-1 text-sm mt-0.5">
                <span className="font-medium text-gray-800">
                  {selectedCourse && selectedCity
                    ? `${selectedCourse}, ${selectedCity}`
                    : "Select Course & City"}
                </span>
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-[600px] bg-white border border-gray-200 shadow-lg rounded-md z-50 p-6 max-h-[80vh] overflow-y-auto">
                {step === "course" && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Select Your Study Preference</h3>
                      <button
                        onClick={() => setIsDropdownOpen(false)}
                        className="text-blue-500 text-sm hover:underline"
                      >
                        Skip
                      </button>
                    </div>

                    {/* Search bar */}
                    <input
                      type="text"
                      placeholder="🔍 Search and Select Your Course"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 text-sm outline-none focus:ring-2 focus:ring-orange-400"
                    />

                    {/* 1-column consistent grid */}
                    <div className="grid grid-cols-1 gap-x-10 gap-y-8">
                      {Object.entries(courseCategories)
                        .filter(([category, list]) => {
                          if (!searchQuery.trim()) return true;
                          const lower = searchQuery.toLowerCase();
                          return (
                            category.toLowerCase().includes(lower) ||
                            list.some((course) => course.toLowerCase().includes(lower))
                          );
                        })
                        .map(([category, list]) => {
                          const Icon = categoryIcons[category] || BookOpen;
                          const filteredList = list.filter((course) =>
                            course.toLowerCase().includes(searchQuery.toLowerCase())
                          );
                          const visibleList =
                            searchQuery.trim() === "" ? list : filteredList;

                          return (
                            <div key={category} className="flex flex-col">
                              {/* Category Title */}
                              <div className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                                <Icon size={18} className="text-blue-600" />
                                <span>{category.replace(/([A-Z])/g, " $1").trim()}</span>
                              </div>

                              {/* Horizontal Subcategories with hover effect */}
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                                {visibleList.map((course) => (
                                  <button
                                    key={course}
                                    onClick={() => handleCourseSelect(course)}
                                    className={`flex items-center text-sm border border-transparent px-3 py-1.5 rounded-md transition-all duration-150 ${
                                      selectedCourse === course
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "text-blue-600 hover:border-blue-500 hover:bg-blue-50"
                                    }`}
                                  >
                                    {course}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-3 h-3 ml-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                      />
                                    </svg>
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </>
                )}

                {/* === City Selection Step === */}
                {step === "city" && (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">Select Preferred City</h3>
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
                          className="border border-gray-300 rounded-md px-2 py-2 hover:bg-gray-100 text-sm transition flex items-center gap-2"
                        >
                          <MapPin size={14} className="text-orange-500" />
                          {city}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

           
          </div>
        </div>

        {/* === SEARCH BAR === */}
        <div className="flex-1 mx-10">
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search for Colleges, Exams, Courses and More.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>
        </div>

        {/* === RIGHT SECTION === */}
        <div className="flex items-center gap-6">
          {/* Write a Review */}
          <button className="flex flex-col items-center text-gray-700 hover:text-orange-500 transition">
            <div className="flex items-center gap-1">
              <Edit3 size={16} />
              <span className="text-sm font-medium">Write a Review</span>
            </div>
            <div className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded mt-1">
              Get Upto ₹300
            </div>
          </button>

          {/* Explore Dropdown */}
          <div
            className="relative"
            ref={exploreRef}
            onMouseEnter={() => setIsExploreOpen(true)}
            onMouseLeave={() => setIsExploreOpen(false)}
          >
            <button className="flex items-center gap-2 hover:text-orange-500 text-sm transition">
              <Grid size={18} /> <span>Explore</span>
            </button>

            {isExploreOpen && (
              <div className="absolute right-0 top-full mt-3 bg-white border border-gray-200 shadow-lg rounded-md w-[850px] p-5 flex gap-6 z-50">
                {/* Left Section */}
                <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <University className="text-blue-600" size={18} /> Top Universities & Colleges
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <BookOpen className="text-blue-600" size={18} /> Top Courses
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <FileText className="text-blue-600" size={18} /> Read College Reviews
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <BellRing className="text-blue-600" size={18} /> Admission Alerts 2025
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <Users className="text-blue-600" size={18} /> Institute (Counselling, Coaching & More)
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <Calculator className="text-blue-600" size={18} /> College Predictor
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <HelpCircle className="text-blue-600" size={18} /> Practice Questions
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <Award className="text-blue-600" size={18} /> Scholarship
                    </li>
                  </ul>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <Globe className="text-blue-600" size={18} /> Study Abroad{" "}
                      <span className="text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded">
                        Get upto 50% off Visa Fees
                      </span>
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <ClipboardList className="text-blue-600" size={18} /> Abroad Exams
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <ClipboardList className="text-blue-600" size={18} /> Exams
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <Newspaper className="text-blue-600" size={18} /> News
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <CreditCard className="text-blue-600" size={18} /> Education Loan
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <MessageCircle className="text-blue-600" size={18} /> Ask a Question
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <ClipboardList className="text-blue-600" size={18} /> Test Series
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <GraduationCap className="text-blue-600" size={18} /> Course Finder
                    </li>
                  </ul>
                </div>

                {/* Right Side Banner */}
                <div className="w-[280px] bg-orange-50 border border-orange-200 rounded-md p-4 flex flex-col items-center text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    “Write a Review & Earn Upto <span className="text-orange-500">₹300</span>”
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">✅ Approval in 15 Minutes*</p>
                  <div className="flex mb-3">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="text-orange-500 fill-orange-500" size={18} />
                    ))}
                    <Star className="text-gray-400" size={18} />
                  </div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3201/3201408.png"
                    alt="review"
                    className="w-24 h-24 object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* User + Menu */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium"
            >
              <User size={18} />
            </button>

            <ProfileModal
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
            />
          </div>
        </div>
      </div>

      {/* === BOTTOM NAVBAR === */}
      <div className="border-t bg-gray-50">
        <div className="max-w-[95%] mx-auto px-6 flex items-center gap-3 text-sm **overflow-x-auto** justify-between">
          
          {/* FIX: Add flex-nowrap to prevent courses from wrapping onto a second line */}
          <div className="flex items-center gap-3 **flex-nowrap**">
            {courses.map((course, i) => {
              if (course === "All Courses") {
                return (
                  // "All Courses" Button and Dropdown Container
                  // flex-shrink-0 prevents this item from shrinking
                  <div key={i} className="relative **flex-shrink-0**" ref={allCoursesRef}>
                    <button
                      onClick={() => setIsAllCoursesOpen(!isAllCoursesOpen)}
                      className={`px-3 py-3 flex items-center gap-1 transition whitespace-nowrap font-medium ${
                        isAllCoursesOpen
                          ? "text-orange-500 bg-white border-x border-t border-gray-200 rounded-t-lg shadow-inner"
                          : "text-gray-700 hover:text-orange-500"
                      }`}
                    >
                      All Courses
                      <ChevronDown size={14} className="mt-0.5" />
                    </button>
                    
                    {isAllCoursesOpen && (
                      // SIMPLE DROPDOWN
                      <div className="absolute left-0 top-full mt-0 w-[240px] bg-white border border-gray-200 shadow-xl rounded-b-lg z-50 max-h-[400px] overflow-y-auto">
                        
                        {/* Simple List of Courses and Categories */}
                        <div className="py-1">
                            {allDropdownItems.map((name) => (
                                <CourseDropdownItem key={name} name={name} />
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // Existing Course Links
              // flex-shrink-0 prevents these items from shrinking
              return (
                <a
                  key={i}
                  href="#"
                  className="px-3 py-3 text-gray-700 hover:text-orange-500 transition whitespace-nowrap **flex-shrink-0**"
                >
                  {course}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <a
              href="/study-abroad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-orange-500 transition whitespace-nowrap"
            >
              <Globe size={16} /> Study Abroad
            </a>

            <a
              href="#"
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-orange-500 transition whitespace-nowrap"
            >
              <Link size={16} /> Course Finder
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;