// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // oder z. B. { email, name }
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      // hier ggf. Token decoden + user setzen
      setUser({}); // oder fetchUserFromToken(token)
    }
  }, [token]);

  //LOGIN
  const login = async (email, password) => {
    const res = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Login fehlgeschlagen");
    }
    console.log("dataInAuthContext", data);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    console.log("userInAuthContext", user);
  };

  //REGISTER
  const register = async (name, email, password) => {
    const res = await fetch("http://localhost:8080/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      if (res.status === 409) {
        throw new Error("Diese E-Mail ist bereits registriert.");
      }
      throw new Error(data.message || "Registrierung fehlgeschlagen");
    }

    // await login(email, password); // optional
  };

  //LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
