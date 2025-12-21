import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import LoginPopup from "./Components/LoginPopup";

interface AppLayoutProps {
  children?: React.ReactNode;
  loginPopupDelayMs?: number; // Default: 60000ms (1 minute)
}

// Routes where login popup should NOT appear
const EXCLUDED_ROUTES = ["/login", "/register", "/auth"];

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  loginPopupDelayMs = 60000,
}) => {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const location = useLocation();

  // Check if current route is excluded
  const isExcludedRoute = EXCLUDED_ROUTES.some((route) =>
    location.pathname.startsWith(route)
  );

  // Function to start/reset the timer
  const startPopupTimer = useCallback(() => {
    // Don't show popup if user is already logged in or on excluded routes
    if (isUserLoggedIn || isExcludedRoute) return;

    const timer = setTimeout(() => {
      setIsLoginPopupOpen(true);
    }, loginPopupDelayMs);

    return timer;
  }, [loginPopupDelayMs, isUserLoggedIn, isExcludedRoute]);

  // Initial timer on page load
  useEffect(() => {
    // Check if user is logged in (you can check localStorage/sessionStorage here)
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setIsUserLoggedIn(true);
      return;
    }

    // Don't start timer on excluded routes
    if (isExcludedRoute) return;

    const timer = startPopupTimer();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [startPopupTimer, isExcludedRoute]);

  // Close popup when navigating to excluded routes
  useEffect(() => {
    if (isExcludedRoute && isLoginPopupOpen) {
      setIsLoginPopupOpen(false);
    }
  }, [isExcludedRoute, isLoginPopupOpen]);

  // Handle popup close - reset the timer
  const handlePopupClose = useCallback(() => {
    setIsLoginPopupOpen(false);

    // Start new timer after popup is closed (only if not on excluded route)
    if (!isExcludedRoute) {
      const newTimer = startPopupTimer();

      // Cleanup function for the new timer
      return () => {
        if (newTimer) clearTimeout(newTimer);
      };
    }
  }, [startPopupTimer, isExcludedRoute]);

  return (
    <div className="flex flex-col min-h-screen">
      {children}

      {/* Login Popup - shows after delay, but NOT on excluded routes */}
      {!isExcludedRoute && (
        <LoginPopup isOpen={isLoginPopupOpen} onClose={handlePopupClose} />
      )}
    </div>
  );
};

export default AppLayout;
