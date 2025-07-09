import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/StockDisplay.css";
import tickerMap from "../data/tickerMap.json";
// import FavoriteStar from "./FavoriteStar";
//  ChartJS + React-Wrapper
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
// Notwendig für die Initialisierung von ChartJS-Komponenten
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

//  Chart-Optionen (keine Legende, hellgraue Achsen)
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { mode: "index", intersect: false },
  },
  scales: {
    x: {
      ticks: { color: "#94a3b8", maxTicksLimit: 5 }, // slate-400
    },
    y: {
      ticks: { color: "#94a3b8" },
    },
  },
};
// Hauptkomponente für eine einzelne Aktienkarte
const StockPriceDisplay = ({ symbol }) => {
  const [data, setData] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY; // API-Key von TwelveData
  console.log("API_KEY:", import.meta.env.VITE_API_KEY);
  // API-Daten holen, wenn symbol sich ändert
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${API_KEY}`
        );
        setData(response.data);
      } catch (err) {
        console.error("Fehler beim Laden der Daten:", err);
      }
    };
    fetchData();
  }, [symbol]);
  // console.log("Neu hier,hier sind die DATA:", data);
  // Warten bis Daten da sind
  if (!data || !data.values) return null;
  // Aktuelle Werte + Firmenname
  const priceData = data.values[0];
  const companyName = tickerMap[symbol] || "Unbekannt";
  // Werte umdrehen für richtigen Zeitverlauf (älteste ➝ neueste)
  // const reversedValues = [...data.values].reverse();
  const reversedValues = data.values.toReversed();

  console.log("DATEN HERE Check", data);
  // Chart-Datenformat für react-chartjs-2
  const chartData = {
    labels: reversedValues.map((entry) => entry.datetime),
    datasets: [
      {
        label: `${symbol} Kurs`,
        data: reversedValues.map((entry) => parseFloat(entry.close)),
        fill: false,
        borderColor: "#facc15", // gelbe Linie (amber)
        backgroundColor: "#facc15",
        tension: 0.3,
      },
    ],
  };

  // Komplette Card-Ansicht inkl. Favoriten-Stern und Chart
  return (
    <div className="stock-card">
      {/* <FavoriteStar symbol={symbol} /> */}
      {/* klickbarer Favoritenstern */}
      <h2>
        {symbol} – {companyName} Aktienkurs
      </h2>
      <p>
        <strong>Aktueller Kurs:</strong> {priceData.close} $
      </p>
      <p>
        <strong>Tageshoch:</strong> {priceData.high} $
      </p>
      <p>
        <strong>Tagestief:</strong> {priceData.low} $
      </p>
      <p>
        <strong>Handelsvolumen:</strong> {priceData.volume} $
      </p>
      {/* Live Chart */}
      <div style={{ marginTop: "1rem" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default StockPriceDisplay;

// Die Kommentare sind mit Hilfe von Chatgpt eingefügt
// useEffect	Lädt Kursdaten von TwelveData, wenn das Symbol sich ändert
// priceData	Zeigt die aktuellsten Kurswerte (close, high, low, volume)
// FavoriteStar	Ermöglicht das Setzen/Entfernen des Symbols als Favorit (inkl. LocalStorage)
// chartData/chartOptions	Visualisiert den Kursverlauf als smoothe gelbe Linie
// tickerMap	Zeigt statt "AAPL" auch "Apple Inc." an
// ✔️ Karte mit Kursdaten
// ✔️ Firmenname aus JSON
// ✔️ Chart-Visualisierung
// ✔️ Favoriten-Stern mit Speicherfunktion
