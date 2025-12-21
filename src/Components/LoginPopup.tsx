import React, { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    course: "BE/B.Tech - Bachelors (Technology)",
    acceptTerms: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add submission logic here
    onClose();
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on escape key
  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleEscapeKey]);

  if (!isOpen) return null;

  const features = [
    { icon: "📋", title: "Brochure Details" },
    { icon: "🎓", title: "Check Detailed Fees" },
    { icon: "⏳", title: "Shortlist & Apply" },
    { icon: "💬", title: "24/7 Counselling" },
    { icon: "🏫", title: "Scholarships" },
    { icon: "📅", title: "Application Deadlines" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Left Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:w-2/5 bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-l-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              How Collegedunia helps you in Admission
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="text-2xl mb-1">{feature.icon}</div>
                  <p className="text-xs font-medium text-gray-700">
                    {feature.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-200 rounded-full shrink-0 flex items-center justify-center">
                  <span className="text-orange-600 font-bold">G</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    "Collegedunia helped me find the perfect college for my
                    career goals."
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    Gurmeet Singh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="lg:w-3/5 p-6 lg:p-8 relative">
            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Form Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-orange-100 rounded-full p-3">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-orange-500">
                  Register Now To Apply
                </h1>
                <p className="text-gray-600 text-sm">
                  Get details and latest updates
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="w-14 px-2 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-center text-sm">
                      +91
                    </div>
                    <div className="relative flex-1">
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="Enter mobile number"
                        className="w-full  px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City You Live In <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                      className="w-full  px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Course */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Interested In <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🎓
                  </span>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none appearance-none bg-white text-sm"
                    required
                  >
                    <option value="BE/B.Tech - Bachelors (Technology)">
                      BE/B.Tech - Bachelors (Technology)
                    </option>
                    <option value="MBA - Masters (Business Administration)">
                      MBA - Masters (Business Administration)
                    </option>
                    <option value="MBBS - Bachelors (Medicine)">
                      MBBS - Bachelors (Medicine)
                    </option>
                    <option value="B.Com - Bachelors (Commerce)">
                      B.Com - Bachelors (Commerce)
                    </option>
                    <option value="BA - Bachelors (Arts)">
                      BA - Bachelors (Arts)
                    </option>
                    <option value="B.Sc - Bachelors (Science)">
                      B.Sc - Bachelors (Science)
                    </option>
                  </select>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <label className="text-xs text-gray-600">
                  By submitting this form, you accept and agree to our{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    Terms of Use
                  </a>
                  .
                </label>
              </div>

              {/* Login Link */}
              <div className="text-sm">
                <span className="text-orange-500 font-medium">
                  Already Registered?{" "}
                  <a href="#" className="hover:underline">
                    Click Here To Login.
                  </a>
                </span>
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-8 rounded-lg transition-colors text-sm"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
