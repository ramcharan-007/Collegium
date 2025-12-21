import LoginSection from "./LoginSection.tsx";
import BenefitsSection from "./BenefitsSection.tsx";

const AuthPage = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 flex">
        {/* Left Section - Blue Gradient with Benefits */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 items-center justify-center p-8">
          <BenefitsSection />
        </div>

        {/* Right Section - Gray Background with Login */}
        <div className="w-full lg:w-1/2 bg-gray-200 flex items-center justify-center p-4 lg:p-8 min-h-[calc(100vh-120px)]">
          <LoginSection />
        </div>
      </main>

    </div>
  );
};

export default AuthPage;
