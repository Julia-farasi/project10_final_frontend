// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard Pages
import Budget from "./pages/Budget";
import Ziele from "./pages/Ziele";
import Invest from "./pages/Invest";
import Zusatz from "./pages/Zusatz";
import DashboardHome from "./pages/Dashboard"; // kann z. B. Willkommen sein

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Öffentliche Seiten */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Geschützte Seiten mit Sidebar + Footer */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="budget" element={<Budget />} />
            <Route path="ziele" element={<Ziele />} />
            <Route path="invest" element={<Invest />} />
            <Route path="zusatz" element={<Zusatz />} />
            {/* <Route path="transactions" element={<TransactionOverview />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
