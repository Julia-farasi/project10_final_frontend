// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Hole Userdaten vom Server bei vorhandenem Token
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await fetch("http://localhost:8080/user/me", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!res.ok) throw new Error("Token ungültig oder User nicht gefunden");

  //       const data = await res.json();
  //       console.log("✅ user from /me:", data);
  //       setUser(data.user);
  //     } catch (err) {
  //       console.error("❌ Fehler beim Laden des Users:", err.message);
  //       logout();
  //     }
  //   };

  //   if (token) {
  //     fetchUser();
  //   }
  // }, [token]);

  // LOGIN
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

    setToken(data.token);
    localStorage.setItem("token", data.token);
    setUser(data.user); // optional, falls direkt mitgegeben
  };

  // REGISTER
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
  };

  // LOGOUT
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
