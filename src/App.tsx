import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import StudyAbroadHeader from "./Components/StudyAbroadHeader";

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
              {<Header />}
              {/* <Footer /> */}
            </>
          }
        />

        {/* === Study Abroad Page Route === */}
        <Route
          path="/study-abroad"
          element={
            <>
              {<StudyAbroadHeader />}
              {/* <Footer /> */}
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
