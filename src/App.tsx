import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import StudyAbroadHeader from "./Components/StudyAbroadHeader";
import CollegeDetailsPage from "./Components/CollegeDetails/CollegeDetailsPage"; // ✅ Import added

// 🧩 Import Admin Pages
import Login from "./admin/Login";
import Home from "./admin/Home";
import { AuthProvider, AuthContext } from "./admin/AuthContext";

import React, { useContext } from "react";

function AppContent() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <Routes>
      {/* === Default Homepage === */}
      <Route
        path="/"
        element={
          <>
            <Header />
            {/* <Footer /> */}
          </>
        }
      />

      {/* === Study Abroad Page === */}
      <Route
        path="/study-abroad"
        element={
          <>
            <StudyAbroadHeader />
            {/* <Footer /> */}
          </>
        }
      />

      {/* === Admin Login Page === */}
      <Route path="/admin" element={<Login />} />

      {/* === Admin Dashboard (Protected) === */}
      <Route path="/admin/home" element={loggedIn ? <Home /> : <Login />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* === Default Homepage Route === */}
        <Route
          path="/"
          element={
            <>
              {/* <Login /> */}
              <Header />
              {/* <Footer /> */}
            </>
          }
        />

        {/* === Study Abroad Page Route === */}
        <Route
          path="/study-abroad"
          element={
            <>
              <StudyAbroadHeader />
              {/* <Footer /> */}
            </>
          }
        />

        {/* === College Details Page Route === */}
        <Route
          path="/college-details"
          element={<CollegeDetailsPage />} // ✅ Loads header + banner
        />
      </Routes>
    </Router>
  );
}

export default App;
