import { useState, memo, lazy, Suspense } from 'react';
import Header from './Header.tsx';
import LightweightRegisterForm from './Register/LightweightRegisterForm.tsx';

// Lazy load heavy components
const IllustrationSection = lazy(() => import('./Register/IllustrationSection.tsx'));
const Footer = lazy(() => import('./Footer.tsx'));

const RegisterPage = () => {
  const [selectedType, setSelectedType] = useState('college');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#fde6d8' }}>
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
          {/* Illustration - Desktop Only, Lazy Loaded */}
          <div className="hidden lg:block lg:w-1/2">
            <Suspense fallback={<div className="w-full h-64 bg-orange-100 rounded-lg animate-pulse"></div>}>
              <IllustrationSection selectedType={selectedType} />
            </Suspense>
          </div>
          
          {/* Lightweight Form - Always Visible */}
          <div className="w-full lg:w-1/2">
            <LightweightRegisterForm selectedType={selectedType} onTypeChange={setSelectedType} />
          </div>
        </div>
      </main>

      {/* Footer - Lazy Loaded, Desktop Only */}
      <div className="hidden lg:block">
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

export default memo(RegisterPage);