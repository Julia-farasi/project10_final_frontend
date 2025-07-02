// src/components/LastTransaction.jsx
export default function LastTransaction({ transaction }) {
  if (!transaction) return null;

  const { amount, is_expense, description, category, date } = transaction;

  return (
    <div className="mb-6 p-4 bg-gray-900 text-white rounded-xl shadow border border-gray-700">
      <p className="text-sm text-gray-400 mb-1">Letzter Eintrag</p>
      <p className="text-lg font-semibold">
        {is_expense ? "-" : "+"}
        {Number(amount).toFixed(2)} €
        <span className="text-gray-400 ml-2">{description}</span>
      </p>
      <p className="text-sm text-gray-500">
        Kategorie: {category || "—"} | Datum:{" "}
        {new Date(date).toLocaleDateString()}
      </p>
    </div>
  );
}
