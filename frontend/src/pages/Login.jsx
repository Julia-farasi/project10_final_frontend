// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import { TbLogin2 } from "react-icons/tb";
import { BsBoxArrowInRight } from "react-icons/bs";
import Swal from "sweetalert2";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      Swal.fire({
        title: "Willkommen zurück!",
        text: "Du wirst zum Dashboard weitergeleitet.",
        icon: "success",
      });
      navigate("/dashboard");
    } catch (err) {
      Swal.fire({
        title: "Login fehlgeschlagen",
        text: err.message || "Bitte Zugangsdaten prüfen.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto flex flex-col space-y-4 mt-10"
      >
        <h2 className="text-2xl font-bold text-center text-amber-50">Login</h2>
        <label className="text-gray-300">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          className="p-3 rounded bg-gray-700 text-amber-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <label className="text-gray-300">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Password"
          className="p-3 rounded bg-gray-700 text-amber-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-amber-50 font-semibold py-2 px-4 rounded-xl shadow hover:scale-105 transition-all duration-300"
        >
          <BsBoxArrowInRight />
          Login
        </button>
      </form>
    </>
  );
}
