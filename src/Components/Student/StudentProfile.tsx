import { useState } from 'react';
import Header from '../Header.tsx';
import Footer from '../Footer.tsx';
import ProfileSidebar from './ProfileSidebar.tsx';
import ProfileSteps from './ProfileSteps.tsx';
import YourDetails from './YourDetails.tsx';
import EducationDetails from './EducationDetails.tsx';
import DesiredColleges from './DesiredColleges.tsx';
import ProfessionalExperience from './ProfessionalExperience.tsx';

const StudentProfile = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [profileData, setProfileData] = useState({
        // Step 1: Your Details
        currentlyDescribes: 'Interested in Indian Colleges',
        fullName: '',
        email: '',
        mobileNumber: '',
        cityYouLiveIn: '',

        // Step 2: Education Details (to be filled)
        educationLevel: '',
        course: '',
        specialization: '',

        // Step 3: Desired Colleges
        desiredColleges: [],
        desiredCourse: 'ME/M.Tech - Masters (Technology)',
        preferredLocation: '',

        // Step 4: Professional Experience
        professionalExperience: [],
        workExperience: '',
        currentCompany: ''
    });

    const updateProfileData = (data: Partial<typeof profileData>) => {
        setProfileData(prev => ({ ...prev, ...data }));
    };

    const handleNextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleStepClick = (step: number) => {
        setCurrentStep(step);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <YourDetails
                        data={profileData}
                        onUpdate={updateProfileData}
                        onNext={handleNextStep}
                    />
                );
            case 2:
                return (
                    <EducationDetails
                        data={profileData}
                        onUpdate={updateProfileData}
                        onNext={handleNextStep}
                        onPrev={handlePrevStep}
                    />
                );
            case 3:
                return (
                    <DesiredColleges
                        data={profileData}
                        onUpdate={updateProfileData}
                        onNext={handleNextStep}
                        onPrev={handlePrevStep}
                    />
                );
            case 4:
                return (
                    <ProfessionalExperience
                        data={profileData}
                        onUpdate={updateProfileData}
                        onNext={handleNextStep}
                        onPrev={handlePrevStep}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Keep existing Header component unchanged */}
            <Header />

            <main className="flex flex-col lg:flex-row min-h-screen">
                {/* Sidebar - Hidden on mobile, shown on desktop */}
                <div className="hidden lg:block w-64 bg-white shadow-sm">
                    <ProfileSidebar
                        currentStep={currentStep}
                        profileData={{
                            fullName: profileData.fullName,
                            email: profileData.email
                        }}
                    />
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
                    {/* Profile Header */}
                    <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 mb-4 lg:mb-6">
                        {/* Your Profile Title */}
                        <div className="flex justify-center mb-4 lg:mb-6">
                            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Your Profile</h2>
                        </div>

                        {/* Progress Steps */}
                        <ProfileSteps currentStep={currentStep} onStepClick={handleStepClick} />
                    </div>

                    {/* Step Content */}
                    <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 mb-4 lg:mb-6">
                        {renderStepContent()}
                    </div>
                </div>
            </main>

            {/* Keep existing Footer component unchanged */}
            <div className="hidden lg:block">
                <Footer />
            </div>
        </div>
    );
};

export default StudentProfile;