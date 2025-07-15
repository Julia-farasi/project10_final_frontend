// src/components/BudgetForm.jsx
import { useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

export default function BudgetForm({
  onSuccess,
  isInitialExpense = false,
  reload,
}) {
  const [isExpense, setIsExpense] = useState(isInitialExpense);
  const { token } = useAuth();
  // const [isExpense, setIsExpense] = useState(false); // false = Einnahme
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      amount: parseFloat(formData.amount.replace(",", ".")),
      is_expense: isExpense,
    };

    try {
      const res = await fetch(
        "https://backend-project10-finale.onrender.com/transaction",
        {
          // http://localhost:8080/transaction
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Fehler beim Speichern");

      Swal.fire({
        title: "Gespeichert!",
        text: isExpense ? "Ausgabe erfasst" : "Einnahme erfasst",
        icon: "success",
      });

      // Reset + Refresh
      setFormData({
        amount: "",
        description: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
      });

      if (reload) reload();
      if (onSuccess) onSuccess(); // z. B. Liste neu laden
    } catch (err) {
      Swal.fire("Fehler", err.message, "error");
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-emerald-800 text-amber-50 p-6 rounded-xl shadow-xl text-beige max-w-2xl mx-auto mb-8">
      <div className="flex justify-center gap-6 mb-6">
        <button
          type="button"
          className={`px-4 py-2 cursor-pointer rounded-lg flex items-center gap-2 transition ${
            !isExpense
              ? "bg-emerald-600 text-white"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
          onClick={() => setIsExpense(false)}
        >
          <FaPlusCircle /> Einnahme
        </button>
        <button
          type="button"
          className={`px-4 py-2 cursor-pointer rounded-lg flex items-center gap-2 transition ${
            isExpense
              ? "bg-red-600 text-white"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
          onClick={() => setIsExpense(true)}
        >
          <FaMinusCircle /> Ausgabe
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Betrag (€)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Betrag"
            required
            className="w-full p-3 rounded-l bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Beschreibung</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Beschreibung"
            required
            className="w-full p-3 rounded-l bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm mb-1">Kategorie</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="z. B. Lebensmittel"
              className="w-full p-3 rounded-l bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Datum</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="p-3 rounded-l bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className={`mt-4 w-full py-3 rounded-lg font-semibold shadow hover:scale-105 transition-all cursor-pointer ${
            isExpense
              ? "bg-red-600 hover:bg-red-500"
              : "bg-emerald-600 hover:bg-emerald-500"
          } text-white`}
        >
          {isExpense ? "Ausgabe speichern" : "Einnahme speichern"}
        </button>
      </form>
    </div>
  );
}
