const BenefitsSection = () => {
  const benefits = [
    {
      icon: '📋',
      title: 'View College Brochures',
      description: 'Access detailed information about colleges'
    },
    {
      icon: '💰',
      title: 'Check Detailed Fees',
      description: 'Compare fees across different institutions'
    },
    {
      icon: '📝',
      title: 'Shortlist and Apply to colleges',
      description: 'Streamline your application process'
    },
    {
      icon: '💬',
      title: 'Ask Questions to senior Counselors',
      description: 'Get expert guidance for your career'
    },
    {
      icon: '⏰',
      title: 'Never miss Important deadlines',
      description: 'Stay updated with application timelines'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Why Sign Up?
        </h2>
        
        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="text-2xl flex-shrink-0">
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  {benefit.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;