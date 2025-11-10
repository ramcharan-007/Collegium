import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface OTPVerificationProps {
  phoneNumber: string;
  onVerificationSuccess: () => void;
  onBack: () => void;
}

const OTPVerification = ({ phoneNumber, onVerificationSuccess: _onVerificationSuccess, onBack }: OTPVerificationProps) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  // Demo OTP - in real app, this would come from SMS service
  const DEMO_OTP = '1234';

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmitOTP = async () => {
    const enteredOtp = otp.join('');
    
    if (enteredOtp.length !== 4) {
      setError('Please enter complete 4-digit OTP');
      return;
    }

    setIsVerifying(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (enteredOtp === DEMO_OTP) {
      // Success - redirect to student profile
      navigate('/student-profile');
    } else {
      setError('Invalid OTP. Please try again. (Demo OTP: 1234)');
    }
    
    setIsVerifying(false);
  };

  const handleResendOTP = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '']);
    setError('');
    // In real app, trigger SMS resend here
    console.log('Resending OTP to:', phoneNumber);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 lg:p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🎓</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Verify phone number
        </h2>
        <p className="text-sm text-gray-600">
          A 4 digit One-Time Password has been sent to <strong>{phoneNumber}</strong>
        </p>
      </div>

      {/* OTP Input */}
      <div className="mb-6">
        <div className="flex gap-3 justify-center mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        {/* Resend Timer */}
        <div className="text-center text-sm text-gray-600">
          {!canResend ? (
            <span>Didn't receive the code? Request again in {formatTime(timer)}</span>
          ) : (
            <button
              onClick={handleResendOTP}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Didn't receive the code? Request again
            </button>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmitOTP}
        disabled={isVerifying || otp.join('').length !== 4}
        className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors mb-4"
      >
        {isVerifying ? 'Verifying...' : 'Submit OTP'}
      </button>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors"
      >
        ← Back to Login
      </button>

      {/* Demo Info */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700 text-center">
          <strong>Demo Mode:</strong> Use OTP <strong>1234</strong> to continue
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;