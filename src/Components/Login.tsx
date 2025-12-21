import React, { useState } from "react";

const Login = () => {
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
  };

  const features = [
    { icon: "📋", title: "Brochure Details" },
    { icon: "🎓", title: "Check Detailed Fees" },
    { icon: "⏳", title: "Shortlist & Apply" },
    { icon: "💬", title: "24/7 Counselling" },
    { icon: "🏫", title: "Scholarships" },
    { icon: "📅", title: "Application Deadlines" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-7xl w-full bg-white rounded-lg shadow-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Sidebar */}
        <div className="lg:w-1/3 bg-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            How Collegedunia helps you in Admission
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <p className="text-xs font-medium text-gray-700">
                  {feature.title}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonial Section */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              What people say
            </h3>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Collegedunia is a one-stop solution to all your education
                    related queries.
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    Gurmeet Singh
                  </p>
                </div>
              </div>
            </div>
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
              →
            </button>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="lg:w-2/3 p-8 lg:p-12 relative">
          {/* Close Button */}
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">
            ×
          </button>

          {/* Form Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-orange-100 rounded-full p-4">
              <div className="text-3xl">📝</div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-orange-500">
                Register Now To Apply
              </h1>
              <p className="text-gray-600">Get details and latest updates</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    👤
                  </span>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    ✉️
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mobile Number */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="w-16 px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-center">
                    +91
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* City You Live In */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City You Live In <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    📍
                  </span>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    ×
                  </span>
                </div>
              </div>
            </div>

            {/* Course Interested In */}
            <div className="relative">
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
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none appearance-none bg-white"
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
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  ×
                </span>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="mt-1 w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label className="text-sm text-gray-700">
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

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-12 rounded-lg transition-colors"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
