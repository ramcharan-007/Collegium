import React, { createContext, useState, type ReactNode } from "react";
import type { FC } from "react"; // ✅ this fixes the 'FC is a type' error

interface AuthContextProps {
  loggedIn: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  loggedIn: false,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(
    localStorage.getItem("admin_logged_in") === "true"
  );

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("admin_logged_in", "true");
      setLoggedIn(true);
    } else {
      alert("Invalid username or password");
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_logged_in");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
