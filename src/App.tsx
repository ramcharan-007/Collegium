import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import RegisterPage from "./Components/RegisterPage.tsx";
import AuthPage from "./Components/Auth/AuthPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page with existing components */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Login />
              <Footer />
            </>
          }
        />

        {/* Auth page (Login/Register) */}
        <Route path="/auth" element={<AuthPage />} />

        {/* College Register page */}
        <Route path="/college-register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
