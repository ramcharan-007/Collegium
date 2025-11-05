import { useState } from 'react';

interface YourDetailsProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

const YourDetails = ({ data, onUpdate, onNext }: YourDetailsProps) => {
  const [formData, setFormData] = useState({
    currentlyDescribes: data.currentlyDescribes || 'Interested in Indian Colleges',
    fullName: data.fullName || '',
    mobileNumber: data.mobileNumber || '',
    cityYouLiveIn: data.cityYouLiveIn || '',
    email: '',
    gender: '',
    courseInterested: '',
    describeBest: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.cityYouLiveIn.trim()) {
      newErrors.cityYouLiveIn = 'City is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAndNext = () => {
    if (validateForm()) {
      onUpdate(formData);
      onNext();
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Column */}
        <div className="space-y-4 lg:space-y-6">
          {/* What Currently Describes You Best */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What Currently Describes You Best? *
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="currentlyDescribes"
                  value="Interested in Indian Colleges"
                  checked={formData.currentlyDescribes === 'Interested in Indian Colleges'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                />
                <span className="ml-3 text-sm text-gray-700">Interested in Indian Colleges</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="currentlyDescribes"
                  value="Working Professional"
                  checked={formData.currentlyDescribes === 'Working Professional'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                />
                <span className="ml-3 text-sm text-gray-700">Working Professional</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="currentlyDescribes"
                  value="Student"
                  checked={formData.currentlyDescribes === 'Student'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                />
                <span className="ml-3 text-sm text-gray-700">Student</span>
              </label>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                👤
              </span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2.5 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number *
            </label>
            <div className="flex border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 bg-white">
              <select className="w-16 px-2 py-2.5 bg-transparent border-0 focus:ring-0 outline-none text-sm">
                <option value="+91">+91</option>
              </select>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500">
                  📞
                </span>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-transparent border-0 focus:ring-0 outline-none ${
                    errors.mobileNumber ? 'text-red-500' : 'text-gray-700'
                  }`}
                  placeholder="Enter your mobile number"
                />
              </div>
            </div>
            {errors.mobileNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.mobileNumber}</p>
            )}
          </div>

          {/* City You Live In */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City You Live In *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500">
                📍
              </span>
              <input
                type="text"
                name="cityYouLiveIn"
                value={formData.cityYouLiveIn}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2.5 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white ${
                  errors.cityYouLiveIn ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your city"
              />
            </div>
            {errors.cityYouLiveIn && (
              <p className="mt-1 text-sm text-red-600">{errors.cityYouLiveIn}</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 lg:space-y-6">
          {/* What Describes You The Best */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What Describes You The Best? *
            </label>
            <select
              name="describeBest"
              value={formData.describeBest}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
            >
              <option value="">Select your status</option>
              <option value="Looking for Admission (Aspirant)">Looking for Admission (Aspirant)</option>
              <option value="Current Student">Current Student</option>
              <option value="Alumni">Alumni</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500">
                ✉️
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Gender *
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                />
                <span className="ml-3 text-sm text-gray-700">Female</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                />
                <span className="ml-3 text-sm text-gray-700">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === 'Other'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                />
                <span className="ml-3 text-sm text-gray-700">Other</span>
              </label>
            </div>
          </div>

          {/* Course Interested */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Interested *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500">
                🎓
              </span>
              <select
                name="courseInterested"
                value={formData.courseInterested}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
              >
                <option value="">Select your course</option>
                <option value="ME/M.Tech - Masters (Technology)">ME/M.Tech - Masters (Technology)</option>
                <option value="MBA - Masters (Business Administration)">MBA - Masters (Business Administration)</option>
                <option value="BE/B.Tech - Bachelors (Technology)">BE/B.Tech - Bachelors (Technology)</option>
                <option value="MBBS - Bachelors (Medicine)">MBBS - Bachelors (Medicine)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save and Next Button */}
      <div className="flex justify-center mt-6 lg:mt-8">
        <button
          onClick={handleSaveAndNext}
          className="px-8 lg:px-16 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors w-full sm:w-auto"
        >
          Save and Next
        </button>
      </div>
    </div>
  );
};

export default YourDetails;