import { useState } from "react";
import { Link } from "react-router-dom";
import StockSearch from "../components/StockSearch";
import StockPriceDisplay from "../components/StockPriceDisplay";
import EtfPriceDisplay from "../components/EtfPriceDisplay";

function Invest() {
  // Zustand zur Speicherung aller ausgewählten Tickersymbole
  const [stockSymbol, setStockSymbol] = useState([]);
  const [etfSymbol, setEtfSymbol] = useState([]);
  // const [symbols, setSymbols] = useState([]);
  // Funktion zur Aufnahme eines neuen Symbols (aus Dropdown)
  // const handleSymbolSelect = (newSymbol) => {
  // Nur hinzufügen, wenn noch nicht in der Liste
  //   if (newSymbol && !symbols.includes(newSymbol)) {
  //     setSymbols((prev) => [...prev, newSymbol]);
  //   }
  // };
  // Debug-Ausgabe aller aktuellen Symbole
  // console.log("here entlang", symbols);
  const handleStockSelect = (symbol) => {
    if (symbol && !stockSymbol.includes(symbol)) {
      setStockSymbol((prev) => [...prev, symbol]); // fügt zur Liste hinzu
    }
  };

  const handleEtfSelect = (symbol) => {
    if (symbol && !etfSymbol.includes(symbol)) {
      setEtfSymbol((prev) => [...prev, symbol]); // fügt zur Liste hinzu
    }
  };

  return (
    <>
      <div className="p-6 text-white">
        <h1 className="text-3xl font-mono mb-6">Investment</h1>

        {/* Zwei Spalten nebeneinander */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Linke Spalte: Aktien */}
          <div className=" p-4 rounded-xl shadow-lg">
            <h2 className="text-2xl text-center font-mono text-emerald-300 mb-2">
              Aktie auswählen
            </h2>
            <StockSearch
              onSymbolSelect={handleStockSelect}
              placeholder="Aktie suchen..."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
              hallo
              {stockSymbol.map((symbol) => (
                <StockPriceDisplay key={symbol} symbol={symbol} />
              ))}
            </div>
          </div>

          {/* Rechte Spalte: ETFs */}
          <div className=" p-4 rounded-xl shadow-lg">
            <h2 className="text-2xl text-center font-mono text-yellow-300 mb-2">
              ETF auswählen
            </h2>
            <StockSearch
              onSymbolSelect={handleEtfSelect}
              placeholder="ETF suchen..."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
              *
              {etfSymbol.map((symbol) => (
                <EtfPriceDisplay key={symbol} symbol={symbol} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Verlinkung zur nächsten Übersicht.. */}
      <Link to="/dashboard">
        <div className="mt-12 text-white text-center italic">
          „Befasse Dich mit Deinem Geld, sonst tut es jemand anderes!“
        </div>
      </Link>
    </>
  );
}

export default Invest;
