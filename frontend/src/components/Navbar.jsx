// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsPersonPlusFill } from "react-icons/bs";
import { TbLogin2 } from "react-icons/tb";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Zustand zurücksetzen
    navigate("/login"); // Weiterleitung nach dem Logout
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-emerald-600 text-amber-50 p-4 shadow-lg flex justify-between items-center">
      {/* Logo + Titel */}
      <div className="text-2xl font-bold tracking-wide hover:text-emerald-300 transition duration-300">
        <Link to="/">MindMoney</Link>
      </div>

      {/* Logo-Bild */}
      <div className="ml-16">
        <img
          src="/MindMoney_Logo.png"
          alt="MindMoneyLogo"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      {/* Navigation / Benutzeraktionen */}
      <div className="flex space-x-4 items-center">
        {!user ? (
          <>
            <Link
              to="/login"
              className="flex items-center gap-2 relative px-4 py-2 rounded hover:text-emerald-300 transition duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-emerald-300 hover:before:w-full before:transition-all before:duration-300"
            >
              <TbLogin2 />
              Login
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 relative px-4 py-2 rounded hover:text-emerald-300 transition duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-emerald-300 hover:before:w-full before:transition-all before:duration-300"
            >
              <BsPersonPlusFill />
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 relative px-4 py-2 rounded hover:text-emerald-300 transition duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-emerald-300 hover:before:w-full before:transition-all before:duration-300"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 relative px-4 py-2 rounded hover:text-emerald-300 transition duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-emerald-300 hover:before:w-full before:transition-all before:duration-300"
            >
              <TbLogin2 />
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
