// src/pages/dashboard/Dashboard.jsx
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-900 p-8 text-white overflow-auto">
        {/* bg-[url('/public/MindMoneyBackground3.png')] bg-cover bg-center */}
        <Outlet />
      </main>
    </div>
  );
}
