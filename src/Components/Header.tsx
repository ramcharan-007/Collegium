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
  X,
} from "lucide-react";

import ProfileModal from "./ProfileModal";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [step, setStep] = useState<"course" | "city">("course");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isAllCoursesOpen, setIsAllCoursesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  const allCoursesRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const allCoursesButtonRef = useRef<HTMLButtonElement>(null);

  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number }>(
    { top: 0, left: 0 }
  );

  // Close popups on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
      if (exploreRef.current && !exploreRef.current.contains(target)) {
        setIsExploreOpen(false);
      }
      if (
        isAllCoursesOpen &&
        !allCoursesButtonRef.current?.contains(target) &&
        !allCoursesRef.current?.contains(target)
      ) {
        setIsAllCoursesOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAllCoursesOpen]);

  // Update All Courses dropdown position
  useEffect(() => {
    const updatePosition = () => {
      if (allCoursesButtonRef.current) {
        const rect = allCoursesButtonRef.current.getBoundingClientRect();
        setDropdownPos({ top: rect.bottom, left: rect.left });
      }
    };

    if (isAllCoursesOpen) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);
    }
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isAllCoursesOpen]);

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
    setStep("city"); // move to city selection
    setSearchQuery(""); // clear search
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsDropdownOpen(false);
    setStep("course");
    setSearchQuery("");
  };

  const resetCourseCity = () => {
    setSelectedCourse("");
    setSelectedCity("");
    setStep("course");
    setSearchQuery("");
  };

  const CourseDropdownItem = ({ name }: { name: string }) => (
    <a
      href={`/course/${name.toLowerCase().replace(/[\s/()&]/g, "-")}`}
      className="flex items-center justify-between text-gray-700 px-4 py-2.5 hover:bg-orange-50 hover:text-orange-600 transition duration-150 text-sm"
      onClick={() => {
        setIsAllCoursesOpen(false);
        setIsMobileMenuOpen(false);
      }}
    >
      <span>{name}</span>
      <svg
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
    <header className="bg-transparent text-gray-800 absolute top-0 left-0 right-0 z-50">
      {/* === TOP BAR === */}
      <div
        className="w-full px-4 py-3 md:px-10 md:flex md:items-center md:justify-between"
        ref={dropdownRef}
      >
        {/* Logo + Hamburger */}
        <div className="flex items-center justify-between md:justify-start md:gap-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-semibold">🎓</span>
            </div>
            <span
              className="text-xl md:text-2xl font-semibold text-white tracking-tight cursor-pointer"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              collegium<span className="text-white text-sm ml-1">.com</span>
            </span>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop: Course + City + Search */}
        <div className="hidden md:flex flex-1 items-center gap-6 mx-10">
          {/* Course + City Selector */}
          <div className="relative">
            <div
              className="flex flex-col text-left cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-xs text-orange-500 font-medium flex items-center gap-1">
                Target Select Goal &{" "}
                <MapPin size={12} className="text-orange-500" /> City
              </span>
              <div className="flex items-center gap-1 text-sm mt-0.5 text-white">
                <span className="font-medium">
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full md:w-[600px] bg-white border border-gray-200 shadow-lg rounded-md z-[60] p-6 max-h-[80vh] overflow-y-auto">
                {step === "course" && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">
                        Select Your Study Preference
                      </h3>
                      <button
                        onClick={() => setIsDropdownOpen(false)}
                        className="text-blue-500 text-sm hover:underline"
                      >
                        Skip
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Search and Select Your Course"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 text-sm outline-none focus:ring-2 focus:ring-orange-400"
                    />

                    <div className="grid grid-cols-1 gap-y-8">
                      {Object.entries(courseCategories)
                        .filter(([category, list]) => {
                          if (!searchQuery.trim()) return true;
                          const lower = searchQuery.toLowerCase();
                          return (
                            category.toLowerCase().includes(lower) ||
                            list.some((course) =>
                              course.toLowerCase().includes(lower)
                            )
                          );
                        })
                        .map(([category, list]) => {
                          const Icon = categoryIcons[category] || BookOpen;
                          const filteredList = list.filter((course) =>
                            course
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                          );
                          const visibleList =
                            searchQuery.trim() === "" ? list : filteredList;

                          return (
                            <div key={category} className="flex flex-col">
                              <div className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                                <Icon size={18} className="text-blue-600" />
                                <span>
                                  {category.replace(/([A-Z])/g, " $1").trim()}
                                </span>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                {visibleList.map((course) => (
                                  <button
                                    key={course}
                                    onClick={() => handleCourseSelect(course)}
                                    className={`flex items-center text-sm border px-3 py-1.5 rounded-md transition-all ${
                                      selectedCourse === course
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-transparent text-blue-600 hover:border-blue-500 hover:bg-blue-50"
                                    }`}
                                  >
                                    {course}
                                    <svg
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

                {step === "city" && (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">
                        Select Preferred City
                      </h3>
                      <button
                        onClick={() => {
                          setStep("course");
                          setSearchQuery("");
                        }}
                        className="text-blue-500 text-sm hover:underline"
                      >
                        Modify Course
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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

          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search for Colleges, Exams, Courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-orange-400 transition text-sm"
              />
            </div>
          </div>
        </div>

        {/* Desktop: Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button className="flex flex-col items-center text-gray-700 hover:text-orange-500 transition text-xs">
            <div className="flex items-center gap-1">
              <Edit3 size={16} className="text-white" />
              <span className="font-medium text-white">Write a Review</span>
            </div>
            <div className="bg-orange-500 text-white px-2 py-0.5 rounded mt-1 text-xs">
              Get Upto ₹300
            </div>
          </button>

          <div className="relative" ref={exploreRef}>
            <button
              onMouseEnter={() => setIsExploreOpen(true)}
              onMouseLeave={() => setIsExploreOpen(false)}
              className="flex items-center gap-2 hover:text-orange-500 text-sm transition text-white"
            >
              <Grid size={18} className="text-white" /> Explore
            </button>

            {isExploreOpen && (
              <div
                onMouseEnter={() => setIsExploreOpen(true)}
                onMouseLeave={() => setIsExploreOpen(false)}
                className="absolute right-0 top-full mt-3 bg-white border border-gray-200 shadow-lg rounded-md w-[850px] p-5 flex gap-6 z-[60]"
              >
                <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <University className="text-blue-600" size={18} /> Top
                      Universities & Colleges
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <BookOpen className="text-blue-600" size={18} /> Top
                      Courses
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <FileText className="text-blue-600" size={18} /> Read
                      College Reviews
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <BellRing className="text-blue-600" size={18} /> Admission
                      Alerts 2025
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <Users className="text-blue-600" size={18} /> Institute
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <Calculator className="text-blue-600" size={18} /> College
                      Predictor
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <HelpCircle className="text-blue-600" size={18} />{" "}
                      Practice Questions
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <Award className="text-blue-600" size={18} /> Scholarship
                    </li>
                  </ul>

                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <Globe className="text-blue-600" size={18} /> Study Abroad{" "}
                      <span className="text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded">
                        Get upto 50% off
                      </span>
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <ClipboardList className="text-blue-600" size={18} />{" "}
                      Abroad Exams
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <ClipboardList className="text-blue-600" size={18} />{" "}
                      Exams
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <Newspaper className="text-blue-600" size={18} /> News
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <CreditCard className="text-blue-600" size={18} />{" "}
                      Education Loan
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <MessageCircle className="text-blue-600" size={18} /> Ask
                      a Question
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <ClipboardList className="text-blue-600" size={18} /> Test
                      Series
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                      <GraduationCap className="text-blue-600" size={18} />{" "}
                      Course Finder
                    </li>
                  </ul>
                </div>

                <div className="w-[280px] bg-orange-50 border border-orange-200 rounded-md p-4 flex flex-col items-center text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    “Write a Review & Earn Upto{" "}
                    <span className="text-orange-500">₹300</span>”
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">
                    Approval in 15 Minutes*
                  </p>
                  <div className="flex mb-3">
                    {[...Array(4)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-orange-500 fill-orange-500"
                        size={18}
                      />
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

          <button
            onClick={() => setIsProfileOpen(true)}
            className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white"
          >
            <User size={18} />
          </button>
        </div>
      </div>

      {/* === MOBILE MENU (Full Screen Overlay) === */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 bg-white z-[60] overflow-y-auto md:hidden"
        >
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-semibold">🎓</span>
              </div>
              <span className="text-xl font-semibold text-[#2b4a91]">
                collegium.com
              </span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="p-4 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search for Colleges, Exams, Courses..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Course + City Selector */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  setIsDropdownOpen(true);
                  setStep("course");
                  // don’t close dropdown here
                }}
                className="w-full text-left p-3 border rounded-md flex justify-between items-center"
              >
                <span className="text-sm">
                  {selectedCourse && selectedCity
                    ? `${selectedCourse}, ${selectedCity}`
                    : "Select Course & City"}
                </span>
                <ChevronDown size={18} />
              </button>
            </div>

            {/* Write Review */}
            <button className="w-full bg-orange-50 border border-orange-200 rounded-md p-3 text-left flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 font-medium">
                  <Edit3 size={18} /> Write a Review
                </div>
                <div className="text-xs text-orange-600">Get Upto ₹300</div>
              </div>
            </button>

            {/* Explore Items */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Explore</h3>
              {[
                { icon: University, text: "Top Universities & Colleges" },
                { icon: BookOpen, text: "Top Courses" },
                { icon: FileText, text: "Read College Reviews" },
                { icon: BellRing, text: "Admission Alerts 2025" },
                { icon: Globe, text: "Study Abroad", href: "/study-abroad" },
                { icon: CreditCard, text: "Education Loan" },
                { icon: MessageCircle, text: "Ask a Question" },
                { icon: GraduationCap, text: "Course Finder" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href || "#"}
                  className="w-full text-left p-3 flex items-center justify-between hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="text-blue-600" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                  {item.text === "Study Abroad" && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                      Get upto 50% off
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* User */}
            <button
              onClick={() => {
                setIsProfileOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 p-3 border-t"
            >
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                <User size={18} />
              </div>
              <span className="font-medium">My Account</span>
            </button>
          </div>
        </div>
      )}

      {/* === COURSE + CITY FULLSCREEN DROPDOWN (Mobile) === */}
      {isDropdownOpen && (
        <div className="fixed inset-0 bg-white z-[60] overflow-y-auto md:hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">
              {step === "course" ? "Select Course" : "Select City"}
            </h3>
            <button onClick={() => setIsDropdownOpen(false)}>
              <X size={24} />
            </button>
          </div>

          {/* Course Selection */}
          {step === "course" && (
            <div className="p-4">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 border rounded-md mb-4 outline-none focus:ring-2 focus:ring-orange-400"
              />
              {Object.entries(courseCategories)
                .filter(([cat, list]) => {
                  const lower = searchQuery.toLowerCase();
                  return (
                    cat.toLowerCase().includes(lower) ||
                    list.some((c) => c.toLowerCase().includes(lower))
                  );
                })
                .map(([cat, list]) => {
                  const Icon = categoryIcons[cat] || BookOpen;
                  const filtered = list.filter((c) =>
                    c.toLowerCase().includes(searchQuery.toLowerCase())
                  );
                  const visible = searchQuery ? filtered : list;
                  if (visible.length === 0) return null;

                  return (
                    <div key={cat} className="mb-6">
                      <div className="flex items-center gap-2 font-semibold mb-3">
                        <Icon size={18} className="text-blue-600" />
                        {cat.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {visible.map((course) => (
                          <button
                            key={course}
                            onClick={() => handleCourseSelect(course)}
                            className="text-left p-2 border rounded-md text-sm hover:bg-blue-50 transition"
                          >
                            {course}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* City Selection */}
          {step === "city" && (
            <div className="p-4">
              <button
                onClick={() => {
                  setStep("course");
                  setSearchQuery("");
                }}
                className="text-blue-500 text-sm mb-4 flex items-center gap-1"
              >
                ← Back to Courses
              </button>
              <div className="grid grid-cols-2 gap-3">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className="p-3 border rounded-md flex items-center gap-2 hover:bg-gray-100 transition"
                  >
                    <MapPin size={16} className="text-orange-500" />
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* === BOTTOM NAVBAR === */}
      <div className="border-t border-white/20 overflow-x-auto whitespace-nowrap">
        <div className="px-4 py-2 flex items-center gap-3 text-sm">
          {courses.map((course, i) => {
            if (course === "All Courses") {
              return (
                <div key={i} className="relative inline-block">
                  <button
                    ref={allCoursesButtonRef}
                    onClick={() => setIsAllCoursesOpen((prev) => !prev)}
                    className={`px-3 py-2 flex items-center gap-1 transition font-medium ${
                      isAllCoursesOpen
                        ? "text-orange-500 bg-white border-x border-t border-gray-200 rounded-t-md"
                        : "text-white hover:text-orange-500"
                    }`}
                  >
                    All Courses
                    <ChevronDown size={14} className="mt-0.5" />
                  </button>

                  {isAllCoursesOpen && (
                    <div
                      ref={allCoursesRef}
                      style={{
                        position: "fixed",
                        top: `${dropdownPos.top}px`,
                        left: `${dropdownPos.left}px`,
                        zIndex: 60,
                      }}
                      className="w-60 bg-white border border-gray-200 shadow-2xl rounded-md max-h-96 overflow-y-auto"
                    >
                      {allDropdownItems.map((name) => (
                        <CourseDropdownItem key={name} name={name} />
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a
                key={i}
                href="#"
                className="px-3 py-2 text-white hover:text-orange-500 transition"
              >
                {course}
              </a>
            );
          })}

          <div className="ml-auto flex gap-4">
            <a
              href="/study-abroad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white hover:text-orange-500"
            >
              <Globe size={16} /> Study Abroad
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-white hover:text-orange-500"
            >
              <Link size={16} /> Course Finder
            </a>
          </div>
        </div>
      </div>

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </header>
  );
};

export default Header;
