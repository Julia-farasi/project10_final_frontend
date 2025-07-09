import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsPersonPlusFill } from "react-icons/bs";
import { TbLogin2 } from "react-icons/tb";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-emerald-600 text-amber-50 px-6 py-4 shadow-lg flex justify-between items-center">
      {/* Logo + Titel from-gray-800 to-emerald-600*/}
      <div className="flex items-center space-x-4">
        <img
          src="/MindMoney_Logo.png"
          alt="MindMoney Logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <Link
          to="/"
          className="font-mono text-2xl font-orbitron font-semibold tracking-wide hover:text-emerald-300 transition duration-300"
        >
          MindMoney
        </Link>
      </div>

      {/* Navigation / Benutzeraktionen */}
      <div className="flex space-x-4 items-center">
        {!user ? (
          <>
            <Link
              to="/login"
              className="flex font-mono items-center gap-2 relative px-4 py-2 rounded hover:text-emerald-300 transition duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-emerald-300 hover:before:w-full before:transition-all before:duration-300"
            >
              <TbLogin2 />
              Login
            </Link>
            <Link
              to="/register"
              className="flex font-mono items-center gap-2 relative px-4 py-2 rounded hover:text-emerald-300 transition duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-emerald-300 hover:before:w-full before:transition-all before:duration-300"
            >
              <BsPersonPlusFill />
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="flex font-mono items-center gap-2 relative px-4 py-2 rounded hover:text-emerald-300 transition duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-emerald-300 hover:before:w-full before:transition-all before:duration-300"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="flex font-mono items-center gap-2 relative px-4 py-2 rounded hover:text-emerald-300 transition duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-emerald-300 hover:before:w-full before:transition-all before:duration-300"
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
