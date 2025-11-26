import React, { useState, useContext } from "react";
import Sidebar from "./Sidebar";
import CollegeAdd from "./CollegeAdd";
import { AuthContext } from "./AuthContext";

const Home: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const [active, setActive] = useState("add");
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      {menuOpen && <Sidebar onSelect={setActive} active={active} />}

      <main className="flex-1 bg-gray-50">
        <header className="flex justify-between items-center p-4 bg-white shadow">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-xl font-bold"
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        <section className="p-6">
          {active === "add" && <CollegeAdd />}
          {active === "approve" && (
            <p className="text-center text-gray-600 mt-10">
              College approval section (to be implemented)
            </p>
          )}
          {active === "students" && (
            <p className="text-center text-gray-600 mt-10">
              Student management section (to be implemented)
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
