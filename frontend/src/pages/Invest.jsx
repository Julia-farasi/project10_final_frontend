import { useState } from "react";
import { Link } from "react-router-dom";
import StockSearch from "../components/StockSearch";
import StockPriceDisplay from "../components/StockPriceDisplay";

function Invest() {
  // Zustand zur Speicherung aller ausgewählten Tickersymbole
  const [symbols, setSymbols] = useState([]);
  // Funktion zur Aufnahme eines neuen Symbols (aus Dropdown)
  const handleSymbolSelect = (newSymbol) => {
    // Nur hinzufügen, wenn noch nicht in der Liste
    if (newSymbol && !symbols.includes(newSymbol)) {
      setSymbols((prev) => [...prev, newSymbol]);
    }
  };
  // Debug-Ausgabe aller aktuellen Symbole
  // console.log("here entlang", symbols);
  return (
    <>
      <div className="font-mono text-2xl">Investment-News</div>
      <div className="dashboard-container">
        {/*  Dropdown zur Symbolauswahl */}
        <StockSearch onSymbolSelect={handleSymbolSelect} />
        {/* Anzeige der Stock Cards */}
        <div className="stock-container">
          {symbols.map((symbol) => (
            // Jede Karte zeigt Kursinfos für ein Symbol
            <StockPriceDisplay key={symbol} symbol={symbol} />
          ))}
        </div>
        {/* Verlinkung zur nächsten Übersicht.. */}
        <Link to="/dashboard">
          <div className="mt-12 text-white text-center italic">
            Zurück zu Deinem Dashboard...
          </div>
        </Link>
      </div>
    </>
  );
}

export default Invest;
