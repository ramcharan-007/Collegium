import { useState } from "react";
import { Link } from "react-router-dom";
import OTPVerification from "./OTPVerification.tsx";

const LoginSection = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const countryCode = "+91";
  const [showOTP, setShowOTP] = useState(false);
  const [isRequestingOTP, setIsRequestingOTP] = useState(false);

  const handleRequestOTP = async () => {
    if (mobileNumber.length === 10) {
      setIsRequestingOTP(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Requesting OTP for:", countryCode + mobileNumber);
      setShowOTP(true);
      setIsRequestingOTP(false);
    } else {
      alert("Please enter a valid 10-digit mobile number");
    }
  };

  const handleVerificationSuccess = () => {
    // This will be handled by navigation in OTPVerification component
    console.log("OTP verified successfully");
  };

  const handleBackToLogin = () => {
    setShowOTP(false);
    setMobileNumber("");
  };

  // Show OTP verification if OTP was requested
  if (showOTP) {
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
      <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>

        {/* Mobile Number Input with Floating Label */}
        <div className="mb-6">
          <div className="flex items-stretch border border-gray-300 rounded-lg focus-within:border-orange-500">
            {/* Country Code */}
            <div className="flex items-center justify-center px-4 bg-white border-r border-gray-300 text-gray-700 font-medium rounded-l-lg">
              <span>+91</span>
            </div>

            {/* Mobile Number Input with Floating Label */}
            <div className="relative flex-1">
              <input
                type="tel"
                id="mobile-input"
                value={mobileNumber}
                onChange={(e) =>
                  setMobileNumber(
                    e.target.value.replace(/\D/g, "").slice(0, 10)
                  )
                }
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder=" "
                className="peer w-full px-4 pt-5 pb-5 outline-none text-gray-700 rounded-r-lg"
              />
              {/* Floating Label */}
              <label
                htmlFor="mobile-input"
                className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none
                  ${
                    isFocused || mobileNumber
                      ? "-top-2.5 text-xs text-orange-500 font-medium"
                      : "top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                  }`}
              >
                Mobile Number
              </label>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500">
                📞
              </span>
            </div>
          </div>
          {mobileNumber.length > 0 && mobileNumber.length < 10 && (
            <p className="text-xs text-orange-500 mt-1">
              Please enter a valid mobile number
            </p>
          )}
        </div>

        {/* Request OTP Button */}
        <button
          onClick={handleRequestOTP}
          disabled={isRequestingOTP}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-full transition-colors mb-4"
        >
          {isRequestingOTP ? "Sending OTP..." : "Request OTP"}
        </button>

        {/* Sign Up Link */}
        <div className="text-center mb-4">
          <span className="text-sm text-gray-600">
            Not a member yet?{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Join us
            </a>{" "}
            it's free
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
