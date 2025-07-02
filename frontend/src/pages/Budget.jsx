import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import BudgetForm from "../components/BudgetForm";
import { Link } from "react-router-dom";

export default function Budget() {
  const { token } = useAuth();

  const [showForm, setShowForm] = useState({ type: null }); // { type: 'income' | 'expense' }
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, diff: 0 });

  // Load transactions
  useEffect(() => {
    const load = async () => {
      const res = await fetch("http://localhost:8080/transaction?limit=3", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTransactions(data);
      console.log("data", data);

      // summary berechnen
      const income = data
        .filter((t) => !t.is_expense)
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
      const expense = data
        .filter((t) => t.is_expense)
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      setSummary({
        income,
        expense,
        diff: income - expense,
      });
    };

    load();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-beige mb-6">💰 Budget</h1>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SECTION 1 – Übersicht */}
        <div className="bg-black rounded-xl p-6 shadow-xl border border-emerald-600">
          <h2 className="text-lg font-semibold mb-4 text-emerald-400">
            Übersicht
          </h2>
          <div className="space-y-2 text-white">
            <div className="flex justify-between">
              <span>Einnahmen:</span>
              <span className="text-emerald-400">
                +{summary.income.toFixed(2)} €
              </span>
            </div>
            <div className="flex justify-between">
              <span>Ausgaben:</span>
              <span className="text-red-400">
                -{summary.expense.toFixed(2)} €
              </span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Differenz:</span>
              <span
                className={`${
                  summary.diff >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {summary.diff >= 0 ? "+" : ""}
                {summary.diff.toFixed(2)} €
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 2 – Buttons */}
        <div className="bg-black rounded-xl p-6 shadow-xl border border-amber-600">
          <h2 className="text-lg font-semibold mb-4 text-amber-400">
            Aktionen
          </h2>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setShowForm({ type: "income" })}
              className="bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 rounded shadow"
            >
              ➕ Einnahme erfassen
            </button>
            <button
              onClick={() => setShowForm({ type: "expense" })}
              className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded shadow"
            >
              ➖ Ausgabe erfassen
            </button>
            <Link
              to="/dashboard/transactions"
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded text-center shadow"
            >
              📋 Gesamte Übersicht anzeigen
            </Link>
          </div>
        </div>

        {/* SECTION 3 – Letzte 3 Transaktionen */}
        <div className="bg-black rounded-xl p-6 shadow-xl border border-sky-600">
          <h2 className="text-lg font-semibold mb-4 text-sky-400">
            Letzte Transaktionen
          </h2>
          <div className="space-y-3">
            {transactions.length === 0 && (
              <p className="text-gray-400">Keine Einträge gefunden.</p>
            )}
            {transactions.map((t) => (
              <div
                key={t.id}
                className={`p-3 rounded-lg bg-gray-800 border-l-4 ${
                  t.is_expense ? "border-red-500" : "border-emerald-500"
                }`}
              >
                <div className="flex justify-between text-white font-semibold">
                  <span>{t.description}</span>
                  <span>
                    {t.is_expense ? "-" : "+"}
                    {parseFloat(t.amount).toFixed(2)} €
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  {t.category || "—"} • {new Date(t.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FORM MODAL */}
      {showForm.type && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-amber-50">
              {showForm.type === "income"
                ? "➕ Neue Einnahme"
                : "➖ Neue Ausgabe"}
            </h2>
            <BudgetForm
              isExpense={showForm.type === "expense"}
              onSuccess={() => setShowForm({ type: null })}
            />
            <button
              onClick={() => setShowForm({ type: null })}
              className="mt-4 text-sm text-gray-400 hover:text-white"
            >
              ✖️ Formular schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
