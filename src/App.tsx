import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { initPerformanceOptimizations } from "./utils/performance";

// Lazy load heavy components
const RegisterPage = lazy(() => import("./Components/RegisterPage.tsx"));
const AuthPage = lazy(() => import("./Components/Auth/AuthPage"));
const StudentProfile = lazy(() => import("./Components/Student/StudentProfile.tsx"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    // Initialize performance optimizations
    initPerformanceOptimizations();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Home page with existing components */}
        <Route path="/" element={
          <>
            <Header />
            <Login />
            <Footer />
          </>
        } />
        
        {/* Auth page (Login/Register) */}
        <Route path="/auth" element={
          <Suspense fallback={<PageLoader />}>
            <AuthPage />
          </Suspense>
        } />
        
        {/* College Register page */}
        <Route path="/college-register" element={
          <Suspense fallback={<PageLoader />}>
            <RegisterPage />
          </Suspense>
        } />
        
        {/* Student Profile page */}
        <Route path="/student-profile" element={
          <Suspense fallback={<PageLoader />}>
            <StudentProfile />
          </Suspense>
        } />
      </Routes>
    </Router>
  );
}

export default App;
