// src/pages/Budget.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import BudgetForm from "../components/BudgetForm";
import { Link } from "react-router-dom";
import { CgMathPlus, CgMenu, CgMathMinus } from "react-icons/cg";
import { motion } from "framer-motion";
import AnimatedCounter from "../components/AnimatedCounter";
import LineChartMotion from "../components/LineChartMotion";

export default function Budget() {
  const { token } = useAuth();
  const [monthlyData, setMonthlyData] = useState([]);
  const [showForm, setShowForm] = useState({ type: null });
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, diff: 0 });

  const loadTransactions = async () => {
    try {
      const res = await fetch("http://localhost:8080/transaction?limit=3", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTransactions(data);

      const income = data
        .filter((t) => !t.is_expense)
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
      const expense = data
        .filter((t) => t.is_expense)
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      setSummary({ income, expense, diff: income - expense });
    } catch (err) {
      console.error("Fehler beim Laden der Transaktionen:", err);
    }
  };

  useEffect(() => {
    if (token) loadTransactions();
  }, [token]);

  const incomePercent =
    summary.income + summary.expense > 0
      ? (summary.income / (summary.income + summary.expense)) * 100
      : 0;

  const expensePercent = 100 - incomePercent;
  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/transaction/monthly-summary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("res", res);
        const raw = await res.json();
        console.log("raw", raw);

        const formatted = raw.map((item) => ({
          month: new Date(item.month).toLocaleString("de-DE", {
            month: "short",
          }),
          income: parseFloat(item.income),
          expense: parseFloat(item.expense),
        }));

        setMonthlyData(formatted);
      } catch (err) {
        console.error("❌ Monatsdaten-Fehler:", err);
      }
    };

    if (token) fetchMonthlyData();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-mono font-bold text-amber-50 mb-6">
        💰 Budget
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Übersicht */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#389686] border-[#389686] rounded-xl p-6 shadow"
        >
          <h2 className="text-lg font-mono text-[#C2FCEF] mb-4">Übersicht</h2>
          <div className="space-y-8 text-[#C2FCEF]">
            <div className="flex justify-between">
              <span>Einnahmen:</span>
              <AnimatedCounter
                to={summary.income}
                prefix="+"
                colorClass="text-[#C2FCEF]"
              />
            </div>
            <div className="flex justify-between">
              <span>Ausgaben:</span>
              <AnimatedCounter
                to={summary.expense}
                prefix="-"
                colorClass="text-[#f8ab64]"
              />
            </div>
            <div className="flex justify-between font-bold text-[#c3d1ce]">
              <span>Differenz:</span>
              <AnimatedCounter
                to={summary.diff}
                prefix={summary.diff >= 0 ? "+" : ""}
                colorClass={
                  summary.diff >= 0 ? "text-[#85e79e]" : "text-red-600"
                }
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-3 w-full bg-[#C2FCEF] rounded overflow-hidden relative">
            <motion.div
              className="h-full bg-[#f8ab64] absolute left-0 top-0"
              initial={{ width: 0 }}
              animate={{ width: `${incomePercent}%` }}
              transition={{ duration: 0.8 }}
            />
            <motion.div
              className="h-full bg-[#85e79e] absolute top-0"
              initial={{ width: 0 }}
              animate={{
                width: `${expensePercent}%`,
                left: `${incomePercent}%`,
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Aktionen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#296F63] border border-[#296F63] rounded-xl p-6 shadow"
        >
          <h2 className="text-lg font-mono text-[#C2FCEF] mb-4">Aktionen</h2>
          <div className="flex flex-col gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm({ type: "income" })}
              className="flex items-center gap-2 bg-[#389686] hover:bg-emerald-600 text-white py-2 px-4 rounded transition cursor-pointer shadow-lg shadow-amber-200"
            >
              <CgMathPlus />
              Einnahme erfassen
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm({ type: "expense" })}
              className="flex items-center gap-2 bg-[#0A2822] hover:bg-emerald-600 text-white py-2 px-4 rounded transition cursor-pointer shadow-lg shadow-amber-200"
            >
              <CgMathMinus />
              Ausgabe erfassen
            </motion.button>

            <Link
              to="/dashboard/transactions"
              className="flex items-center gap-1 p-3 bg-[#194A41] hover:bg-emerald-600 text-white rounded text-center transition shadow-lg shadow-amber-200"
            >
              <CgMenu />
              Gesamte Übersicht anzeigen
            </Link>
          </div>
        </motion.div>

        {/* Letzte Transaktionen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-[#194A41] border border-[#194A41] rounded-xl p-6 shadow"
        >
          <h2 className="text-lg font-mono text-[#C2FCEF] mb-4">
            Letzten Eingaben
          </h2>
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <p className="text-green-700">Keine Einträge gefunden.</p>
            ) : (
              transactions.map((t, index) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg ${
                    t.is_expense
                      ? "bg-[#C2FCEF] border-l-4 border-red-400"
                      : "bg-emerald-100 border-l-4 border-emerald-500"
                  }`}
                >
                  <div className="flex justify-between text-green-900 font-semibold">
                    <span>{t.description}</span>
                    <span>
                      {t.is_expense ? "-" : "+"}
                      {parseFloat(t.amount).toFixed(2)} €
                    </span>
                  </div>
                  <p className="text-sm text-green-700">
                    {t.category || "—"} •{" "}
                    {new Date(t.date).toLocaleDateString()}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
      {/* Modal */}
      {showForm.type && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 p-6 rounded-xl w-full max-w-md shadow border border-green-800"
          >
            <h2 className="text-xl font-bold mb-4 text-green-600">
              {showForm.type === "income"
                ? "➕ Neue Einnahme"
                : "➖ Neue Ausgabe"}
            </h2>
            <BudgetForm
              isInitialExpense={showForm.type === "expense"}
              isExpense={showForm.type === "expense"}
              onSuccess={() => setShowForm({ type: null })}
              reload={loadTransactions}
            />
            <button
              onClick={() => setShowForm({ type: null })}
              className="mt-4 text-sm text-green-600 hover:text-green-900"
            >
              ✖️ Formular schließen
            </button>
          </motion.div>
        </div>
      )}
      <Link to="/dashboard/transactions">
        <div className="mt-12">
          <LineChartMotion data={monthlyData} />
        </div>
      </Link>
      {/* Verlinkung zur nächsten Übersicht.. */}
      <Link to="/dashboard/transactions">
        <div className="mt-12 text-white text-center italic">
          Weiter geht's zu Deiner Übersicht...
        </div>
      </Link>
    </div>
  );
}
