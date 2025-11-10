import { useState } from 'react';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import IllustrationSection from './Register/IllustrationSection.tsx';
import RegisterForm from './Register/RegisterForm.tsx';

const RegisterPage = () => {
  const [selectedType, setSelectedType] = useState('college');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="min-h-screen" style={{ backgroundColor: '#fde6d8' }}>
        <div className="w-full h-full">
          {/* Mobile and Tablet View (< 1024px) */}
          <div className="lg:hidden w-full min-h-screen flex items-start justify-center pt-4 px-2">
            <div className="w-full max-w-full">
              <RegisterForm selectedType={selectedType} onTypeChange={setSelectedType} />
            </div>
          </div>

          {/* Desktop View (>= 1024px) */}
          <div className="hidden lg:flex lg:min-h-screen">
            <div className="w-1/2 flex items-center justify-center p-8">
              <IllustrationSection selectedType={selectedType} />
            </div>
            <div className="w-1/2 flex items-center justify-center p-8">
              <RegisterForm selectedType={selectedType} onTypeChange={setSelectedType} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Hidden on mobile for register page */}
      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  );
};

export default RegisterPage;