// src/pages/Register.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BsPersonPlusFill } from "react-icons/bs";
import Swal from "sweetalert2";
// import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.post("http://localhost:8080/user", formData);
      // alert("successfully registered, you are now beeing redirected to login");
      await register(name, email, password);
      Swal.fire({
        title: "Successfully registered!",
        text: "You are now beeing redirected to login.",
        icon: "success",
      });
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Registration failed!",
        text: "Something went wrong! Sorry.",
        icon: "error",
      });
      // alert(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto flex flex-col space-y-4 mt-10"
    >
      <h2 className="text-2xl font-bold text-center text-amber-50">Register</h2>
      <label className="text-gray-300">Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
        className="p-3 rounded bg-gray-700 text-amber-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
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
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
        className="p-3 rounded bg-gray-700 text-amber-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        className="flex justify-center items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-xl shadow hover:scale-105 transition-all duration-300"
      >
        <BsPersonPlusFill />
        Register
      </button>
    </form>
  );
}
