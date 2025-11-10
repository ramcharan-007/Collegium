import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



// inside component
const navigate = useNavigate();

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  login(username, password);
  navigate("/admin/home");
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded-md w-80 space-y-4"
      >
        <h2 className="text-center text-2xl font-semibold text-gray-700">
          Admin Login
        </h2>
        <input
          type="text"
          placeholder="Admin Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
