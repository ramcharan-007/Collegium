import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import StudyAbroadHeader from "./Components/StudyAbroadHeader";
import CollegeDetailsPage from "./Components/CollegeDetails/CollegeDetailsPage"; // ✅ Import added

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
