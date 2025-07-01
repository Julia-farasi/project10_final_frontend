// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Budget from "./pages/Budget";
import Ziele from "./pages/Ziele";
import Invest from "./pages/Invest";
import Zusatz from "./pages/Zusatz";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="budget" element={<Budget />} />
          <Route path="ziele" element={<Ziele />} />
          <Route path="invest" element={<Invest />} />
          <Route path="zusatz" element={<Zusatz />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
