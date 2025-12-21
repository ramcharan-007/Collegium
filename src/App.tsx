import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, StudyAbroad } from "./Components/Home";
import { CollegeListing } from "./Components/CollegeListing";
import CollegeDetailsPage from "./Components/CollegeDetails/CollegeDetailsPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AuthPage from "./Components/Auth/AuthPage";
import AppLayout from "./AppLayout";

function App() {
  return (
    <Router>
      <AppLayout>
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/colleges" element={<CollegeListing />} />
            <Route path="/college-details" element={<CollegeDetailsPage />} />
            <Route path="/study-abroad" element={<StudyAbroad />} />
          </Routes>
        </main>
        <Footer />
      </AppLayout>
    </Router>
  );
}

export default App;
