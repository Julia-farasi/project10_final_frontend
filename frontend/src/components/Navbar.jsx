// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsPersonPlusFill } from "react-icons/bs";
import { TbLogin2 } from "react-icons/tb";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-300 to-blue-800 text-white p-4 shadow-lg flex justify-between items-center">
      <div className="text-2xl font-bold tracking-wide hover:text-indigo-400 transition duration-300">
        <Link to="/">MindMoney</Link>
      </div>
      <div className="flex space-x-4 items-center">
        {!user ? (
          <>
            <Link
              to="/login"
              className="flex items-center gap-2 relative px-4 py-2 rounded hover:text-indigo-400 transition duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-indigo-400 hover:before:w-full before:transition-all before:duration-300"
            >
              <TbLogin2 />
              Login
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 relative px-4 py-2 rounded hover:text-indigo-400 transition duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-indigo-400 hover:before:w-full before:transition-all before:duration-300"
            >
              <BsPersonPlusFill />
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <button onClick={logout} className="hover:underline">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
