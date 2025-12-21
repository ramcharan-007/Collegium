const BenefitsSection = () => {
  const benefits = [
    "View College Brochures",
    "Check Detailed Fees",
    "Shortlist and Apply to colleges",
    "Ask Questions to senior Counselors",
    "Never miss Important deadlines",
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
        <h2 className="text-xl font-bold text-blue-600 mb-6">Why Sign Up?</h2>

        <div className="space-y-1">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <span className="text-gray-600">•</span>
              <span className="font-medium text-gray-800 text-sm">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
