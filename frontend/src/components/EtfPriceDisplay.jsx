import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/StockDisplay.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { mode: "index", intersect: false },
  },
  scales: {
    x: {
      ticks: { color: "#facc15", maxTicksLimit: 5 },
    },
    y: {
      ticks: { color: "#facc15" },
    },
  },
};

export default function EtfPriceDisplay({ symbol }) {
  const [data, setData] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${API_KEY}`
        );
        setData(res.data);
      } catch (err) {
        console.error("ETF-Datenfehler:", err);
      }
    };
    fetchData();
  }, [symbol]);

  if (!data || !data.values) return null;

  const latest = data.values[0];
  const reversed = data.values.toReversed();

  const chartData = {
    labels: reversed.map((d) => d.datetime),
    datasets: [
      {
        label: `${symbol} Verlauf`,
        data: reversed.map((d) => parseFloat(d.close)),
        borderColor: "#facc15",
        backgroundColor: "#facc15",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="stock-card bg-[#1e293b] text-white">
      <h2 className="text-lg text-yellow-400 mb-2">{symbol} – ETF Kurs</h2>
      <p>
        <strong>Letzter Kurs:</strong> {latest.close} $
      </p>
      {latest.high && (
        <p>
          <strong>Hoch:</strong> {latest.high} $
        </p>
      )}
      {latest.low && (
        <p>
          <strong>Tief:</strong> {latest.low} $
        </p>
      )}
      <div className="mt-4">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
