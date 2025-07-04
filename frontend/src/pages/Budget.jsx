import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import BudgetForm from "../components/BudgetForm";
import { Link } from "react-router-dom";
import { CgMathPlus, CgMenu, CgMathMinus } from "react-icons/cg";

export default function Budget() {
  const { token } = useAuth();

  const [showForm, setShowForm] = useState({ type: null }); // { type: 'income' | 'expense' }
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, diff: 0 });
  // Daten laden
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

  // Initialer Aufruf
  useEffect(() => {
    if (token) loadTransactions();
  }, [token]);

  const incomePercent =
    summary.income + summary.expense > 0
      ? (summary.income / (summary.income + summary.expense)) * 100
      : 0;

  const expensePercent = 100 - incomePercent;

  return (
    <div className="p-6 ">
      {/* min-h-screen */}
      <h1 className="text-3xl font-bold text-amber-50 mb-6">💰 Budget</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Übersicht */}
        <div className="bg-[#389686] border-[#389686] rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold text-[#C2FCEF] mb-4">
            Übersicht
          </h2>
          <div className="space-y-2 text-[#C2FCEF]">
            <div className="flex justify-between">
              <span>Einnahmen:</span>
              <span className="text-[#C2FCEF]">
                +{summary.income.toFixed(2)} €
              </span>
            </div>
            <div className="flex justify-between">
              <span>Ausgaben:</span>
              <span className="text-[#f8ab64]">
                -{summary.expense.toFixed(2)} €
              </span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Differenz:</span>
              <span
                className={`${
                  summary.diff >= 0 ? "text-[#85e79e]" : "text-red-600"
                }`}
              >
                {summary.diff >= 0 ? "+" : ""}
                {summary.diff.toFixed(2)} €
              </span>
            </div>
          </div>

          {/* Balken */}
          <div className="mt-4 h-3 w-full bg-green-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-200"
              style={{ width: `${incomePercent}%` }}
            ></div>
            <div
              className="h-full bg-lime-500"
              style={{
                width: `${expensePercent}%`,
                marginLeft: `${incomePercent}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Aktionen */}
        <div className="bg-[#296F63] border border-[#296F63] rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold text-[#C2FCEF] mb-4">
            Aktionen
          </h2>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setShowForm({ type: "income" })}
              className="flex items-center gap-2 bg-[#389686] hover:bg-emerald-600 text-white py-2 px-4 rounded shadow"
            >
              <CgMathPlus />
              Einnahme erfassen
            </button>

            <button
              onClick={() => setShowForm({ type: "expense" })}
              className="flex items-center gap-2 bg-[#0A2822] hover:bg-emerald-600 text-white py-2 px-4 rounded shadow"
            >
              <CgMathMinus />
              Ausgabe erfassen
            </button>
            <Link
              to="/dashboard/transactions"
              className="flex items-center gap-1 p-3 bg-[#194A41] hover:bg-emerald-600 text-white rounded text-center"
            >
              <CgMenu />
              Gesamte Übersicht anzeigen
            </Link>
          </div>
        </div>

        {/* Letzte Transaktionen */}
        <div className="bg-[#194A41] border border-[#194A41] rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold text-[#C2FCEF] mb-4">
            Deine Letzten Transaktionen
          </h2>
          <div className="space-y-3">
            {transactions.length === 0 && (
              <p className="text-green-700">Keine Einträge gefunden.</p>
            )}
            {transactions.map((t) => (
              <div
                key={t.id}
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
                  {t.category || "—"} • {new Date(t.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showForm.type && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md shadow border border-green-800">
            <h2 className="text-xl font-bold mb-4 text-green-600">
              {showForm.type === "income"
                ? "➕ Neue Einnahme"
                : "➖ Neue Ausgabe"}
            </h2>
            <BudgetForm
              isInitialExpense={showForm.type === "expense"}
              isExpense={showForm.type === "expense"}
              onSuccess={() => setShowForm({ type: null })}
              reload={loadTransactions} //direkte Prop
            />
            <button
              onClick={() => setShowForm({ type: null })}
              className="mt-4 text-sm text-green-600 hover:text-green-900"
            >
              ✖️ Formular schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
