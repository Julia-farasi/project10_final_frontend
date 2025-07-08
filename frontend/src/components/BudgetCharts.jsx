// src/components/BudgetCharts.jsx
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#28713E", "#f8ab64", "#85e79e", "#B1CBA6", "#D3EFDE"];

export default function BudgetCharts({ transactions }) {
  // Gruppieren nach Kategorie
  const categoryData = {};
  transactions.forEach((t) => {
    const cat = t.category || "Unbekannt";
    if (!categoryData[cat]) {
      categoryData[cat] = 0;
    }
    categoryData[cat] += parseFloat(t.amount);
  });

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  const monthlyData = {};
  transactions.forEach((t) => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
    if (!monthlyData[key]) {
      monthlyData[key] = { month: key, Einnahmen: 0, Ausgaben: 0 };
    }
    if (t.is_expense) {
      monthlyData[key].Ausgaben += parseFloat(t.amount);
    } else {
      monthlyData[key].Einnahmen += parseFloat(t.amount);
    }
  });

  const barData = Object.values(monthlyData).sort(
    (a, b) => new Date(a.month) - new Date(b.month)
  );

  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* 📊 Säulendiagramm */}
      <div className="bg-[#194A41] text-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4 text-[#C2FCEF]">
          Einnahmen vs. Ausgaben (Monat)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="month" stroke="#C2FCEF" />
            <YAxis stroke="#C2FCEF" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Einnahmen" fill="#85e79e" />
            <Bar dataKey="Ausgaben" fill="#f8ab64" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🥧 Kreisdiagramm */}
      <div className="bg-[#296F63] text-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4 text-[#C2FCEF]">
          Ausgaben nach Kategorie
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
