interface ProfileStepsProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const ProfileSteps = ({ currentStep, onStepClick }: ProfileStepsProps) => {
  const steps = [
    { number: 1, title: 'Your Details', completed: currentStep > 1, active: currentStep === 1 },
    { number: 2, title: 'Education Details', completed: currentStep > 2, active: currentStep === 2 },
    { number: 3, title: 'Desired Colleges', completed: currentStep > 3, active: currentStep === 3 },
    { number: 4, title: 'Professional Experience', completed: currentStep > 4, active: currentStep === 4 }
  ];

  return (
    <div className="w-full">
      {/* Mobile View - Horizontal Scroll */}
      <div className="md:hidden overflow-x-auto pb-4">
        <div className="flex items-center min-w-max px-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center min-w-0">
                <button
                  onClick={() => onStepClick(step.number)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all hover:scale-110 ${
                    step.completed
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : step.active
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                  }`}
                >
                  {step.completed ? '✓' : step.number}
                </button>
                <span
                  className={`mt-2 text-xs font-medium text-center ${
                    step.active ? 'text-orange-600' : step.completed ? 'text-orange-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-3 ${
                    currentStep > step.number ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View - Full Width */}
      <div className="hidden md:flex items-center justify-center">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => onStepClick(step.number)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all hover:scale-110 relative z-10 ${
                    step.completed
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : step.active
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-300'
                  }`}
                >
                  {step.completed ? '✓' : step.number}
                </button>
                <span
                  className={`mt-3 text-sm font-medium text-center whitespace-nowrap ${
                    step.active ? 'text-orange-600' : step.completed ? 'text-orange-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              
              {/* Connector line - connects edge to edge between circles */}
              {index < steps.length - 1 && (
                <div
                  className={`w-32 h-0.5 ${
                    currentStep > step.number ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSteps;