import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CgMathPlus, CgMathMinus } from "react-icons/cg";
import BudgetForm from "../components/BudgetForm";

export default function Transactions() {
  const { token } = useAuth();
  const [month, setMonth] = useState(getCurrentMonth()); // Format: YYYY-MM
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState({ type: null }); // 'income' | 'expense'

  const fetchData = async () => {
    const resIncome = await fetch(
      `http://localhost:8080/transaction/income?month=${month}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const resExpense = await fetch(
      `http://localhost:8080/transaction/expense?month=${month}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const dataIncome = await resIncome.json();
    const dataExpense = await resExpense.json();
    setIncome(dataIncome);
    setExpenses(dataExpense);
  };

  useEffect(() => {
    if (!token) return;
    if (token) {
      fetchData();
    }
  }, [month, token]);

  const totalIncome = income.reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const totalExpense = expenses.reduce(
    (sum, t) => sum + parseFloat(t.amount),
    0
  );
  const diff = totalIncome - totalExpense;

  return (
    <div className="p-6 text-amber-50">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">📋 Deine Finanzen</h1>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 rounded border border-[#389898] bg-[#389898] text-amber-50"
        >
          {generateMonthOptions().map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="">
        {/* Ausgaben */}
        <div className="bg-[#194A41] rounded-xl shadow p-4 border border-[#1c5349]">
          <button
            onClick={() => setShowForm({ type: "expense" })}
            className="text-lg cursor-pointer font-semibold mb-2 text-[#C2FCEF]"
          >
            <CgMathMinus /> Ausgaben
          </button>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-emerald-500 border-b border-emerald-400">
                <th>Betrag</th>
                <th>Beschreibung</th>
                <th>Kategorie</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-amber-50 py-2">
                    Keine Ausgaben gefunden.
                  </td>
                </tr>
              )}
              {expenses.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-emerald-700 cursor-pointer hover:bg-lime-100/30"
                >
                  <td className="text-left ">
                    -{parseFloat(t.amount).toFixed(2)} €
                  </td>
                  <td>{t.description}</td>

                  <td>{t.category || "—"}</td>
                  <td>{formatDate(t.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 font-semibold text-left text-amber-500">
            -{totalExpense.toFixed(2)} €{/* Gesamt */}
          </div>
        </div>
        {/* Einnahmen */}
        <div className="mt-4 bg-[#296F63] rounded-xl shadow p-4 border border-[#2e7c6f]">
          <button
            onClick={() => setShowForm({ type: "income" })}
            className="text-lg cursor-pointer font-semibold mb-2 text-[#C2FCEF]"
          >
            <CgMathPlus />
            Einnahmen
          </button>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left  text-emerald-400 border-b border-emerald-400">
                <th>Betrag</th>
                <th>Beschreibung</th>
                <th>Kategorie</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>
              {income.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-emerald-600 py-2">
                    Keine Einnahmen gefunden.
                  </td>
                </tr>
              )}
              {income.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-emerald-800 hover:bg-emerald-100/30"
                >
                  <td className="text-left">
                    +{parseFloat(t.amount).toFixed(2)} €
                  </td>
                  <td>{t.description}</td>

                  <td>{t.category || "—"}</td>
                  <td>{formatDate(t.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 font-semibold text-left text-emerald-400">
            +{totalIncome.toFixed(2)} €{/* Gesamt: */}
          </div>
        </div>
      </div>

      {/* Differenz */}
      <div
        className={`mt-6 p-2 rounded-l inline-block text-white text-center font-bold ${
          diff >= 0 ? "bg-emerald-600" : "bg-red-600"
        }`}
      >
        Differenz: {diff >= 0 ? "+" : ""}
        {diff.toFixed(2)} €
      </div>
      {/*  */}
      {showForm.type && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#f5f5dc] p-6 rounded-xl w-full max-w-2xl shadow border border-green-300">
            <h2 className="text-xl font-bold mb-4 text-green-800">
              {showForm.type === "income"
                ? "➕ Neue Einnahme"
                : "➖ Neue Ausgabe"}
            </h2>

            <BudgetForm
              isInitialExpense={showForm.type === "expense"}
              key={showForm.type} // wichtig: damit sich Zustand zurücksetzt
              onSuccess={() => {
                setShowForm({ type: null });
                fetchData(); // reload Transaktionen
                //
              }}
            />

            <button
              onClick={() => setShowForm({ type: null })}
              className="mt-4 text-sm text-green-600 hover:text-green-900"
            >
              ✖️ Formular schließen
            </button>
          </div>
        </div>
        //
      )}
    </div>
    ///
  );
}

// Hilfsfunktionen
function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString();
}

function generateMonthOptions() {
  const options = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
    const label = d.toLocaleString("de-DE", {
      month: "long",
      year: "numeric",
    });

    options.push({ value, label });
  }
  return options;
}
