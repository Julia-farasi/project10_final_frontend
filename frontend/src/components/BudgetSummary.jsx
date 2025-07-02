// src/components/BudgetSummary.jsx
export default function BudgetSummary({ summary }) {
  const { income, expense, diff } = summary;
  const total = income + expense;
  const incomePercent = total ? (income / total) * 100 : 0;
  const expensePercent = total ? (expense / total) * 100 : 0;

  return (
    <div className="mb-6 p-6 bg-black text-amber-50 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Übersicht</h2>
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-sm text-gray-400">Einnahmen</p>
          <p className="text-emerald-400 text-lg font-bold">
            +{income.toFixed(2)} €
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Ausgaben</p>
          <p className="text-red-400 text-lg font-bold">
            -{expense.toFixed(2)} €
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Differenz</p>
          <p
            className={`text-lg font-bold ${
              diff >= 0 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {diff >= 0 ? "+" : ""}
            {diff.toFixed(2)} €
          </p>
        </div>
      </div>

      {/* Balkenanzeige */}
      <div className="h-4 bg-gray-700 rounded overflow-hidden">
        <div
          className="bg-emerald-600 h-full"
          style={{ width: `${incomePercent}%` }}
        ></div>
        <div
          className="bg-red-600 h-full"
          style={{
            width: `${expensePercent}%`,
            marginLeft: `${incomePercent}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
