import Header from '../Header';
import Footer from '../Footer';
import LoginSection from './LoginSection.tsx';
import BenefitsSection from './BenefitsSection.tsx';

const AuthPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
                <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 lg:py-8">
                    {/* Mobile: Show only login form, Desktop: Show both benefits and form */}
                    <div className="block lg:hidden min-h-[80vh] flex items-center justify-center">
                        {/* Mobile Layout - Login Form Only */}
                        <div className="w-full">
                            <LoginSection />
                        </div>
                    </div>
                    
                    <div className="hidden lg:flex lg:gap-8 min-h-[80vh] items-center justify-center">
                        {/* Desktop Layout - Benefits + Login Form */}
                        <div className="lg:w-1/2">
                            <BenefitsSection />
                        </div>
                        <div className="lg:w-1/2">
                            <LoginSection />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AuthPage;