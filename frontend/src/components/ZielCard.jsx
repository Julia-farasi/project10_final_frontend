// src/components/ZielCard.jsx
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import clsx from "clsx";
import { format } from "date-fns";
import { FaPiggyBank } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import RealisticPlant from "./RealisticPlant";

export default function ZielCard({ ziel, onEdit, onDelete, onZielUpdated }) {
  const { id, title, description, target_amount, saved_amount, deadline } =
    ziel;
  const [amountToAdd, setAmountToAdd] = useState("");
  const [currentSaved, setCurrentSaved] = useState(saved_amount);
  const [isDropping, setIsDropping] = useState(false);

  const progress = Math.min((currentSaved / target_amount) * 100, 100);

  const handleSave = async () => {
    const amount = parseFloat(amountToAdd);
    if (!amount || amount <= 0) return;

    setIsDropping(true);

    setTimeout(async () => {
      try {
        const updatedAmount = currentSaved + amount;

        const res = await axios.patch(`http://localhost:8080/goals/${id}`, {
          saved_amount: updatedAmount,
        });

        setCurrentSaved(updatedAmount);
        setAmountToAdd("");
        onZielUpdated && onZielUpdated(res.data); // optional callback für parent
        Swal.fire({
          icon: "success",
          title: "Gespeichert!",
          text: `${amount} € wurden deinem Ziel hinzugefügt.`,
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Fehler beim Sparen:", err);
        Swal.fire("Fehler", "Konnte Betrag nicht speichern", "error");
      } finally {
        setIsDropping(false);
      }
    }, 800);
  };

  return (
    <div className="relative bg-[#D3EFDE] shadow-xl rounded-xl p-6 border border-[#B1CBA6] transition hover:shadow-2xl">
      {/* Header */}
      <div className="absolute top-2 right-2 flex gap-2 text-sm">
        <button onClick={onEdit} className="text-[#28713E] hover:underline">
          ✏️ Bearbeiten
        </button>
        <button onClick={onDelete} className="text-red-600 hover:underline">
          🗑️ Löschen
        </button>
      </div>

      {/* Inhalt */}
      <h2 className="text-xl font-bold text-[#3F5A36] mb-1">{title}</h2>
      <p className="text-[#3F5A36] mb-2">{description}</p>
      <p className="text-sm text-gray-700 mb-4">
        🎯 Ziel: <strong>{target_amount} €</strong> <br />
        💰 Gespart: <strong>{currentSaved.toFixed(2)} €</strong> <br />⏳
        Deadline: {format(new Date(deadline), "dd.MM.yyyy")}
      </p>

      {/* Pflanze */}
      <div className="flex justify-center mb-4">
        <RealisticPlant progress={progress} />
      </div>

      {/* Fortschrittbalken */}
      <div className="w-full bg-[#B1CBA6] h-3 rounded-full overflow-hidden mb-4">
        <div
          className="bg-[#28713E] h-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Betrag hinzufügen */}
      <div className="flex gap-2 items-center">
        <input
          type="number"
          min="1"
          placeholder="€ sparen"
          value={amountToAdd}
          onChange={(e) => setAmountToAdd(e.target.value)}
          className="flex-1 px-3 py-2 rounded border border-[#B1CBA6] text-[#3F5A36] bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#28713E]"
        />
        <button
          onClick={handleSave}
          className="bg-[#28713E] hover:bg-[#3F5A36] text-white px-4 py-2 rounded font-semibold flex items-center gap-1 transition"
        >
          <GiTwoCoins /> Spare
        </button>
      </div>

      {/* Münzanimation */}
      <div className="relative mt-6 flex justify-center items-center h-10">
        <FaPiggyBank size={40} className="text-[#3F5A36]" />
        <GiTwoCoins
          className={clsx(
            "absolute text-yellow-400 text-3xl transition-transform duration-700 ease-out",
            isDropping
              ? "translate-y-8 opacity-100"
              : "opacity-0 -translate-y-4"
          )}
        />
      </div>
    </div>
  );
}
