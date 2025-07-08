// src/components/LineChartMotion.jsx
import { motion } from "framer-motion";

export default function LineChartMotion({ data }) {
  if (!data || data.length === 0)
    return <p className="text-white">Keine Daten</p>;

  const maxY = Math.max(...data.map((d) => Math.max(d.income, d.expense)));
  const scaleY = (value) => 100 - (value / maxY) * 100;

  return (
    <div className="p-6 bg-gray-800 rounded-xl mt-12 shadow text-white">
      <h2 className="text-xl font-bold mb-4">📈 Monatsübersicht</h2>
      <svg viewBox="0 0 300 100" className="w-full h-48">
        {/* Einkommen-Linie */}
        <motion.polyline
          fill="none"
          stroke="#85e79e"
          strokeWidth="2"
          points={data
            .map(
              (d, i) => `${(i * 300) / (data.length - 1)},${scaleY(d.income)}`
            )
            .join(" ")}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4 }}
        />
        {/* Ausgaben-Linie */}
        <motion.polyline
          fill="none"
          stroke="#f8ab64"
          strokeWidth="2"
          points={data
            .map(
              (d, i) => `${(i * 300) / (data.length - 1)},${scaleY(d.expense)}`
            )
            .join(" ")}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
        />
      </svg>

      <div className="flex justify-between mt-2 text-xs text-amber-50">
        {data.map((d, i) => (
          <span key={i}>{d.month}</span>
        ))}
      </div>
    </div>
  );
}
