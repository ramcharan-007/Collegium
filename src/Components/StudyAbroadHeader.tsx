import { useState, useEffect, useRef } from "react";
import {
  currenciesData,
  countriesData,
  menuDropdownCountries,
  navbarCountries,
} from "../data/dataLists";

import Header from "./Header";
import {
  Search,
  Edit3,
  Headphones,
  Grid,
  Menu,
  X,
  User,
  University,
  BookOpen,
  FileText,
  BellRing,
  Users,
  Calculator,
  Globe,
  ClipboardList,
  Award,
  HelpCircle,
  Newspaper,
  CreditCard,
  Star,
  MessageCircle,
  GraduationCap,
  Link,
  ChevronDown,
} from "lucide-react";

import ProfileModal from "./ProfileModal";

const StudyAbroadHeader = () => {
  const [selectedCountry, setSelectedCountry] = useState("Select Country");
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // === Currency Dropdown States and Refs ===
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [currencySearch, setCurrencySearch] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("INR - ₹");
  const currencyButtonRef = useRef<HTMLButtonElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number } | null>(null);

  // === Navbar Menu Dropdown States and Refs ===
  const [showNavbarMenuDropdown, setShowNavbarMenuDropdown] = useState(false);
  const navbarMenuRef = useRef<HTMLDivElement>(null);

  const [countrySearch, setCountrySearch] = useState("");
  const [showMainHeader, setShowMainHeader] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);

  //profile
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // === Close dropdowns when clicking outside ===
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (exploreRef.current && !exploreRef.current.contains(target)) {
        setIsExploreOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(target)) {
        setShowCountryDropdown(false);
      }

      // Close Currency Dropdown
      if (
        showCurrencyDropdown &&
        currencyDropdownRef.current &&
        !currencyDropdownRef.current.contains(target) &&
        currencyButtonRef.current &&
        !currencyButtonRef.current.contains(target)
      ) {
        setShowCurrencyDropdown(false);
      }

      // Close Navbar Menu Dropdown
      if (navbarMenuRef.current && !navbarMenuRef.current.contains(target)) {
        setShowNavbarMenuDropdown(false);
      }

      // Close mobile menu
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCurrencyDropdown]);

  // Toggle Header on Course Finder click
  if (showMainHeader) return <Header />;

  // --- Start of Component Return ---
  return (
    <header className="bg-white text-gray-800 shadow-sm border-b sticky top-0 z-50">
      {/* RENDER FIXED CURRENCY DROPDOWN HERE, OUTSIDE THE HEADER FLOW */}
      {showCurrencyDropdown && dropdownPosition && (
        <div
          ref={currencyDropdownRef}
          onClick={(e) => e.stopPropagation()}
          className="fixed bg-white border border-gray-200 shadow-lg rounded-md w-[480px] z-[100] p-4"
          style={{
            top: `${dropdownPosition.top}px`,
            right: "20px",
          }}
        >
          <h3 className="text-base font-semibold text-gray-800 mb-3">Choose Currency </h3>

          {/* Search bar */}
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Your Currency"
              value={currencySearch}
              onChange={(e) => setCurrencySearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          {/* Currency Grid */}
          <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
            {currenciesData
              .filter(
                (c) =>
                  c.name.toLowerCase().includes(currencySearch.toLowerCase()) ||
                  c.code.toLowerCase().includes(currencySearch.toLowerCase())
              )
              .map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setSelectedCurrency(c.code);
                    setShowCurrencyDropdown(false);
                    setCurrencySearch("");
                  }}
                  className={`flex flex-col items-start p-3 border rounded-lg transition text-left ${
                    selectedCurrency === c.code ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium text-gray-800">{c.name}</span>
                  <span className="text-xs text-gray-500">{c.code}</span>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* === TOP BAR (Desktop + Mobile header bar) === */}
      <div className="w-full px-4 py-3 md:px-10 md:flex md:items-center md:justify-between">
        {/* === LEFT SECTION (Logo, Hamburger for mobile, Select Country for desktop & mobile) === */}
        <div className="flex items-center justify-between md:justify-start md:gap-10">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-semibold">🎓</span>
            </div>
            <span className="text-xl md:text-2xl font-semibold text-[#2b4a91] tracking-tight">
              collegium<span className="text-gray-400 text-sm ml-1">.com</span>
            </span>
          </div>

          {/* Desktop: Select Country (visible on md and up) */}
          <div className="hidden md:block ml-6 relative" ref={countryRef}>
            <button
              onClick={() => setShowCountryDropdown((prev) => !prev)}
              className="flex items-center gap-2 border border-gray-300 rounded-md text-sm px-3 py-1.5 hover:bg-gray-100 transition"
            >
              🌍 {selectedCountry}
            </button>

            {showCountryDropdown && (
              <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 shadow-lg rounded-md w-[600px] z-50 p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-semibold text-gray-800">Select Country </h3>
                  <button
                    onClick={() => setShowCountryDropdown(false)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Close
                  </button>
                </div>

                {/* Search bar */}
                <input
                  type="text"
                  placeholder="🔍 Search country..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mb-5 text-sm outline-none focus:ring-2 focus:ring-orange-400"
                />

                {/* Country Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {countriesData
                    .filter((c) =>
                      c.name.toLowerCase().includes(countrySearch.toLowerCase())
                    )
                    .map((c) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          setSelectedCountry(c.name);
                          setShowCountryDropdown(false);
                        }}
                        className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 hover:bg-blue-50 text-sm transition"
                      >
                        <img
                          src={c.flag}
                          alt={c.name}
                          className="w-5 h-5 rounded-full border"
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile: Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2"
            aria-label="Open mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* === CENTER SEARCH === */}
        <div className="flex-1 mx-10 hidden md:block">
          <div className="relative w-full">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Universities and Programs"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>
        </div>

        {/* === RIGHT SECTION (Desktop actions) === */}
        <div className="hidden md:flex items-center gap-6">
          {/* Write Review & Get Counselling */}
          <button className="flex flex-col items-center text-gray-700 hover:text-orange-500 transition">
            <div className="flex items-center gap-1">
              <Edit3 size={16} />
              <span className="text-sm font-medium">Write a Review</span>
            </div>
            <div className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded mt-1">Get Upto 20 USD</div>
          </button>

          <button className="flex flex-col items-center text-gray-700 hover:text-orange-500 transition">
            <div className="flex items-center gap-1">
              <Headphones size={16} />
              <span className="text-sm font-medium">Get Counselling</span>
            </div>
            <div className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded mt-1">1 on 1 Interaction</div>
          </button>

          {/* Explore Dropdown (desktop hover) */}
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
                      <span className="text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded">Get upto 50% off Visa Fees</span>
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

                <div className="w-[280px] bg-orange-50 border border-orange-200 rounded-md p-4 flex flex-col items-center text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">“Write a Review & Earn Upto <span className="text-orange-500">₹300</span>”</h3>
                  <p className="text-xs text-gray-500 mb-2">✅ Approval in 15 Minutes*</p>
                  <div className="flex mb-3">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="text-orange-500 fill-orange-500" size={18} />
                    ))}
                    <Star className="text-gray-400" size={18} />
                  </div>
                  <img src="https://cdn-icons-png.flaticon.com/512/3201/3201408.png" alt="review" className="w-24 h-24 object-contain" />
                </div>
              </div>
            )}
          </div>

          {/* Profile button (desktop) */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium"
            >
              <User size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* === MOBILE MENU (Full Screen Overlay) === */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="fixed inset-0 bg-white z-50 overflow-y-auto md:hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-semibold">🎓</span>
              </div>
              <span className="text-xl font-semibold text-[#2b4a91]">collegium.com</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close mobile menu">
              <X size={24} />
            </button>
          </div>

          <div className="p-4 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Universities and Programs..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Country Selector (mobile inline) */}
            <div className="space-y-2">
              <button
                onClick={() => setShowCountryDropdown((prev) => !prev)}
                className="w-full text-left p-3 border rounded-md flex justify-between items-center"
              >
                <span className="text-sm">
                  {selectedCountry}
                </span>
                <ChevronDown size={18} />
              </button>

              {showCountryDropdown && (
                <div className="p-3 border rounded-md max-h-80 overflow-y-auto bg-white">
                  <input
                    type="text"
                    placeholder="Search country..."
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  {countriesData
                    .filter((c) => c.name.toLowerCase().includes(countrySearch.toLowerCase()))
                    .map((c) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          setSelectedCountry(c.name);
                          setShowCountryDropdown(false);
                        }}
                        className="flex items-center gap-2 w-full text-left p-2 border-b hover:bg-gray-50"
                      >
                        <img src={c.flag} alt={c.name} className="w-5 h-5 rounded-full border" />
                        <span>{c.name}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Currency (mobile inline toggle) */}
            <div>
              <button
                onClick={() => {
                  // open currency inline on mobile
                  setShowCurrencyDropdown((prev) => !prev);
                }}
                className="w-full border border-gray-200 p-3 rounded-md flex items-center justify-between"
              >
                <span className="text-sm font-medium">{selectedCurrency}</span>
                <ChevronDown size={18} />
              </button>

              {showCurrencyDropdown && (
                <div className="mt-2 p-3 border rounded-md bg-white max-h-80 overflow-y-auto">
                  <div className="relative mb-3">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search Your Currency"
                      value={currencySearch}
                      onChange={(e) => setCurrencySearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-orange-400 transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {currenciesData
                      .filter(
                        (c) =>
                          c.name.toLowerCase().includes(currencySearch.toLowerCase()) ||
                          c.code.toLowerCase().includes(currencySearch.toLowerCase())
                      )
                      .map((c) => (
                        <button
                          key={c.code}
                          onClick={() => {
                            setSelectedCurrency(c.code);
                            setShowCurrencyDropdown(false);
                            setCurrencySearch("");
                          }}
                          className={`flex flex-col items-start p-3 border rounded-lg transition text-left ${
                            selectedCurrency === c.code ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500" : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <span className="font-medium text-gray-800">{c.name}</span>
                          <span className="text-xs text-gray-500">{c.code}</span>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Write Review */}
            <button className="w-full bg-orange-50 border border-orange-200 rounded-md p-3 text-left flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 font-medium">
                  <Edit3 size={18} /> Write a Review
                </div>
                <div className="text-xs text-orange-600">Get Upto 20 USD</div>
              </div>
            </button>

            {/* Get Counselling */}
            <button className="w-full bg-orange-50 border border-orange-200 rounded-md p-3 text-left flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 font-medium">
                  <Headphones size={18} /> Get Counselling
                </div>
                <div className="text-xs text-orange-600">1 on 1 Interaction</div>
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
                { icon: Globe, text: "Study Abroad" },
                { icon: CreditCard, text: "Education Loan" },
                { icon: MessageCircle, text: "Ask a Question" },
                { icon: GraduationCap, text: "Course Finder" },
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-full text-left p-3 flex items-center justify-between hover:bg-gray-50 rounded-md"
                  onClick={(e) => {
                    // Course Finder on mobile should behave same as desktop
                    if (item.text === "Course Finder") {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      setShowMainHeader(true);
                      return;
                    }
                    // close mobile menu for other items
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="text-blue-600" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Account */}
            <div className="pt-2 border-t">
              <button
                onClick={() => {
                  setIsProfileOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3"
              >
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                  <User size={18} />
                </div>
                <span className="font-medium">My Account</span>
              </button>

              {/* Mobile: also show Course Finder quick link under account area */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowMainHeader(true);
                }}
                className="w-full mt-2 text-left p-3 text-sm text-gray-700 hover:text-orange-500"
              >
                <Link size={14} className="inline mr-2" /> Course Finder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === BOTTOM NAVBAR === */}
      <div className="border-t bg-gray-50">
        <div className="max-w-[95%] mx-auto px-6 flex items-center gap-3 text-sm overflow-x-auto justify-between">
          {/* CRITICAL FIX: The inner container must have flex-nowrap to prevent line wrapping. */}
          <div className="flex items-center gap-3 flex-nowrap">
            {navbarCountries.map((name) => {
              if (name === "Menu") {
                return (
                  // "Menu" Button and Dropdown Container
                  // flex-shrink-0 ensures this item doesn't shrink when scrolling
                  <div key={name} className="relative flex-shrink-0" ref={navbarMenuRef}>
                    <button
                      onClick={() => setShowNavbarMenuDropdown((prev) => !prev)}
                      className={`px-3 py-3 flex items-center gap-1 transition whitespace-nowrap font-medium ${
                        showNavbarMenuDropdown ? "text-orange-500 bg-white border-x border-t border-gray-200 rounded-t-lg shadow-inner" : "text-gray-700 hover:text-orange-500"
                      }`}
                    >
                      {name}
                      <ChevronDown size={14} className="mt-0.5" />
                    </button>

                    {showNavbarMenuDropdown && (
                      // SIMPLE DROPDOWN: Countries List
                      <div className="absolute left-0 top-full mt-0 w-[240px] bg-white border border-gray-200 shadow-xl rounded-b-lg z-50 max-h-[300px] overflow-y-auto">
                        <div className="py-1">
                          {menuDropdownCountries.map((country) => (
                            <a
                              key={country}
                              href={`/study-abroad/country/${country.toLowerCase().replace(/[\s/()&]/g, "-")}`}
                              className="flex items-center justify-between text-gray-700 px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition duration-150 text-sm"
                              onClick={() => setShowNavbarMenuDropdown(false)}
                            >
                              <span>{country}</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // Existing country links: flex-shrink-0 ensures these items don't shrink
              return (
                <a key={name} href="#" className="px-3 py-3 text-gray-700 hover:text-orange-500 transition whitespace-nowrap flex-shrink-0">
                  {name}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Currency Button */}
            <button
              ref={currencyButtonRef}
              onClick={(e) => {
                e.stopPropagation();
                const button = currencyButtonRef.current;
                if (button) {
                  const rect = button.getBoundingClientRect();
                  setDropdownPosition({ top: rect.bottom + 5 });
                }
                setShowCurrencyDropdown((prev) => !prev);
              }}
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-orange-500 transition whitespace-nowrap px-3 py-3"
            >
              <span className="font-medium flex items-center gap-1">
                <span className="text-gray-800">{selectedCurrency}</span>
              </span>
              <ChevronDown size={14} className="ml-0.5" />
            </button>

            <button
              onClick={() => setShowMainHeader(true)} // Switch to main header
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-orange-500 transition whitespace-nowrap"
            >
              <Link size={16} /> Course Finder
            </button>
          </div>
        </div>
      </div>

      {/* Profile modal is rendered always so it works on mobile too */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </header>
  );
};

export default StudyAbroadHeader;
