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
      {" "}
      <div className="p-6 text-white">
        <h1 className="text-2xl font-mono mb-6 text-center">
          📈 Aktien & ETFs vergleichen
        </h1>

        {/* Zwei Spalten nebeneinander */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Linke Spalte: Aktie */}
          <div className="bg-slate-800 p-4 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold text-emerald-300 mb-2">
              Aktie auswählen
            </h2>
            {/* <StockSearch onSymbolSelect={(symbol) => setStockSymbol(symbol)} /> */}
            <StockSearch
              onSymbolSelect={handleStockSelect}
              placeholder="Aktie suchen..."
            />
          </div>

          {/* Rechte Spalte: ETF */}
          <div className="bg-slate-800 p-4 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold text-yellow-300 mb-2">
              ETF auswählen
            </h2>
            {/* <StockSearch onSymbolSelect={(symbol) => setEtfSymbol(symbol)} /> */}
            <StockSearch
              onSymbolSelect={handleEtfSelect}
              placeholder="ETF suchen..."
            />
          </div>
        </div>

        {/* Ausgabe der Karten */}
        <div className="stock-container">
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> */}
          {stockSymbol.map((symbol) => (
            <StockPriceDisplay key={symbol} symbol={symbol} />
          ))}
        </div>
        <div className="stock-container">
          {" "}
          {etfSymbol.map((symbol) => (
            <EtfPriceDisplay key={symbol} symbol={symbol} />
          ))}
        </div>
      </div>
      {/* <div className="font-mono text-2xl">Investment-News</div>
      <div className="dashboard-container"> */}
      {/*  Dropdown zur Symbolauswahl */}
      {/* <StockSearch onSymbolSelect={handleSymbolSelect} /> */}
      {/* Anzeige der Stock Cards */}
      {/* <div className="stock-container">
          {symbols.map((symbol) => ( */}
      {/* // Jede Karte zeigt Kursinfos für ein Symbol
        //     <StockPriceDisplay key={symbol} symbol={symbol} />
        //   ))}
        // </div> */}
      {/* Verlinkung zur nächsten Übersicht.. */}
      <Link to="/dashboard">
        <div className="mt-12 text-white text-center italic">
          Zurück zu Deinem Dashboard...
        </div>
      </Link>
      {/* </div> */}
    </>
  );
}

export default Invest;
