import { useState } from 'react';
import { Link } from 'react-router-dom';
import OTPVerification from './OTPVerification.tsx';

const LoginSection = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [showOTP, setShowOTP] = useState(false);
  const [isRequestingOTP, setIsRequestingOTP] = useState(false);

  const handleRequestOTP = async () => {
    if (mobileNumber.length === 10) {
      setIsRequestingOTP(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Requesting OTP for:', countryCode + mobileNumber);
      setShowOTP(true);
      setIsRequestingOTP(false);
    } else {
      alert('Please enter a valid 10-digit mobile number');
    }
  };

  const handleVerificationSuccess = () => {
    // This will be handled by navigation in OTPVerification component
    console.log('OTP verified successfully');
  };

  const handleBackToLogin = () => {
    setShowOTP(false);
    setMobileNumber('');
  };

  // Show OTP verification if OTP was requested
  if (!showOTP) {
    return (
      <OTPVerification
        phoneNumber={countryCode + mobileNumber}
        onVerificationSuccess={handleVerificationSuccess}
        onBack={handleBackToLogin}
      />
    );
  }

  return (
    <div className="w-full max-w-full sm:max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>

        {/* Mobile Number Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number
          </label>
          <div className="flex gap-2">
            {/* Country Code */}
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-20 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>

            {/* Mobile Number */}
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                📱
              </span>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Mobile Number"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Request OTP Button */}
        <button
          onClick={handleRequestOTP}
          disabled={isRequestingOTP}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors mb-4"
        >
          {isRequestingOTP ? 'Sending OTP...' : 'Request OTP'}
        </button>

        {/* Sign Up Link */}
        <div className="text-center mb-4">
          <span className="text-sm text-gray-600">
            Not a member yet?{' '}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Join us
            </a>
            {' '}it's free
          </span>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        {/* College Admin Login */}
        <Link
          to="/college-register"
          className="block w-full text-center text-blue-600 hover:text-blue-700 font-medium py-2 transition-colors"
        >
          Login as College Admin
        </Link>
      </div>
    </div>
  );
};

export default LoginSection;