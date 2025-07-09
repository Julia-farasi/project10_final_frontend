// src/components/GrowthLine.jsx
import { motion } from "framer-motion";

export default function GrowthLine() {
  return (
    <div className="relative w-full h-48 md:h-64 lg:h-72 rounded-xl shadow border p-4">
      <svg viewBox="0 0 300 100" className="w-full h-full">
        {/* Achsen */}
        <line
          x1="0"
          y1="100"
          x2="300"
          y2="100"
          stroke="#22c55e"
          strokeWidth="1"
        />{" "}
        {/* X-Achse */}
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="100"
          stroke="#22c55e"
          strokeWidth="1"
        />{" "}
        {/* Y-Achse */}
        {/* Beschriftung Y-Achse */}
        {/* <text x="2" y="90" fontSize="10" fill="#64748b">
          Zweifel
        </text>
        <text x="2" y="70" fontSize="10" fill="#64748b">
          Mut
        </text>
        <text x="2" y="50" fontSize="10" fill="#64748b">
          Klarheit
        </text> */}
        <text x="2" y="30" fontSize="10" fill="#648b71">
          Vertrauen
        </text>
        <text x="2" y="8" fontSize="10" fill="#648b71">
          Flow
        </text>
        <text
          x="40"
          y="115"
          fontSize="10"
          fill="#64748b"
          transform="rotate(45, 40, 115)"
        ></text>
        <text x="5" y="110" fontSize="10" fill="#648b71">
          Neuanfang
        </text>
        {/* <text x="70" y="110" fontSize="10" fill="#64748b">
          Durchhalten
        </text>
        <text x="120" y="110" fontSize="10" fill="#64748b">
          Rückschläge
        </text>
        <text x="170" y="110" fontSize="10" fill="#64748b">
          Momentum
        </text> */}
        <text x="230" y="110" fontSize="10" fill="#648b71">
          Fokus
        </text>
        <text x="270" y="110" fontSize="10" fill="#648b71">
          Erfolg
        </text>
        {/* Animierte Linie */}
        <motion.path
          d="M0,80 C40,40 100,60 140,20 S240,80 300,40"
          fill="none"
          stroke="#4ADE80"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        {/* Punkte auf Kurve (optional) */}
        <motion.circle
          cx="40"
          cy="40"
          r="3"
          fill="#22c55e"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2 }}
        />
        <motion.circle
          cx="140"
          cy="20"
          r="3"
          fill="#22c55e"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.4 }}
        />
        <motion.circle
          cx="240"
          cy="80"
          r="3"
          fill="#22c55e"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.6 }}
        />
      </svg>
    </div>
  );
}
