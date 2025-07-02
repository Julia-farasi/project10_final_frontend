// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaPiggyBank,
  FaBullseye,
  FaChartLine,
  FaPlusCircle,
} from "react-icons/fa";

const links = [
  { path: "dashboard/dashboard", label: "Home", icon: <FaHome /> },
  { path: "dashboard/budget", label: "Budget", icon: <FaPiggyBank /> },
  { path: "dashboard/ziele", label: "Ziele", icon: <FaBullseye /> },
  { path: "dashboard/invest", label: "Invest", icon: <FaChartLine /> },
  { path: "dashboard/zusatz", label: "Zusatz", icon: <FaPlusCircle /> },
];

export default function Sidebar() {
  return (
    <aside className="bg-gradient-to-r from-gray-900 to-emerald-600 text-amber-50 w-60 h-screen p-6 space-y-4 shadow-xl">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={`/${link.path}`}
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-all 
            ${isActive ? "bg-emerald-600 text-white" : "hover:bg-gray-800"}`
          }
        >
          {link.icon}
          {link.label}
        </NavLink>
      ))}
    </aside>
  );
}
