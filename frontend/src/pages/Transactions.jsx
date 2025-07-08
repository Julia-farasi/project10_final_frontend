import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CgMathPlus, CgMathMinus } from "react-icons/cg";
import BudgetForm from "../components/BudgetForm";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

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

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Bist du sicher?",
      text: "Du kannst diesen Eintrag später nicht wiederherstellen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ja, löschen!",
      cancelButtonText: "Abbrechen",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:8080/transaction/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Löschen fehlgeschlagen");

      await Swal.fire({
        title: "Gelöscht!",
        text: "Der Eintrag wurde entfernt.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchData(); // Aktuelle Tabelle neu laden
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
      Swal.fire({
        title: "Fehler",
        text: "Eintrag konnte nicht gelöscht werden.",
        icon: "error",
      });
    }
  };

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
                <th></th>
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

                  <td className="text-right">
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-gray-400 cursor-pointer hover:text-red-600"
                      title="Löschen"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
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
                  className="border-b border-emerald-800 cursor-pointer hover:bg-emerald-100/30"
                >
                  <td className="text-left">
                    +{parseFloat(t.amount).toFixed(2)} €
                  </td>
                  <td>{t.description}</td>

                  <td>{t.category || "—"}</td>
                  <td>{formatDate(t.date)}</td>

                  <td className="text-right">
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-gray-400 hover:text-red-600 cursor-pointer"
                      title="Löschen"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
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
