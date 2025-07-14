import { useState } from "react";
import { Link } from "react-router-dom";
import StockSearch from "../components/StockSearch";
import StockPriceDisplay from "../components/StockPriceDisplay";
// import EtfPriceDisplay from "../components/EtfPriceDisplay";
import CryptoSearch from "../components/CryptoSearch";
import CryptoPriceDisplay from "../components/CryptoPriceDisplay";
import FavoriteList from "../components/FavoriteList";

function Invest() {
  // Zustand zur Speicherung aller ausgewählten Tickersymbole
  const [stockSymbol, setStockSymbol] = useState([]);
  // const [etfSymbol, setEtfSymbol] = useState([]);
  const [cryptoSymbol, setCryptoSymbol] = useState([]);
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

  const handleCryptoSelect = (symbol) => {
    if (symbol && !cryptoSymbol.includes(symbol)) {
      setCryptoSymbol((prev) => [...prev, symbol]); // fügt zur Liste hinzu
    }
  };

  return (
    <>
      <div className="p-6 text-white">
        <h1 className="text-3xl font-mono font-bold text-amber-50 mb-6">
          Investment
        </h1>

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
              {stockSymbol.map((symbol) => (
                <StockPriceDisplay key={symbol} symbol={symbol} />
              ))}
            </div>
            <div className="flex flex-wrap justify-center">
              <Link
                to="http://www.comdirect.de/pbl/a.do?rd=/cms/lp/kwk-depot.html&ci=201012740000000EM000000000000&wc=XMSMY"
                target="_blank"
              >
                <button
                  className="cursor-pointer mt-8 px-6 py-2 bg-gradient-to-r from-emerald-800 to-violet-950
               text-amber-100 font-mono text-lg font-semibold 
               rounded-xl
               hover:shadow-emerald-100
               hover:scale-105 hover:brightness-110 
               focus:outline-none 
               transition duration-300 ease-in-out "
                >
                  💸 Buy now!
                </button>
              </Link>
            </div>
          </div>

          {/* Rechte Spalte: ETFs */}
          <div className=" p-4 rounded-xl shadow-lg">
            <h2 className="text-2xl text-center font-mono text-yellow-300 mb-2">
              Cryptocurrency auswählen
            </h2>
            <CryptoSearch
              onSymbolSelect={handleCryptoSelect}
              placeholder="Crypto suchen..."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
              {cryptoSymbol.map((symbol) => (
                <CryptoPriceDisplay key={symbol} symbol={symbol} />
              ))}
            </div>
            <div className="flex flex-wrap justify-center">
              <Link
                to="https://bitvavo.com/invite?a=2B5E4DB9F9"
                target="_blank"
              >
                <button
                  className="cursor-pointer mt-8 px-6 py-2 bg-gradient-to-r from-emerald-800 to-violet-950
               text-amber-100 font-mono text-lg font-semibold 
               rounded-xl
               hover:shadow-emerald-100
               hover:scale-105 hover:brightness-110 
               focus:outline-none 
               transition duration-300 ease-in-out "
                >
                  💸 Buy now!
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Favoriten-Anzeige */}
        <div className="mb-10">
          {/* <h2 className="text-2xl font-mono text-cyan-300 mb-4 text-center">
            Angeheftete Favoriten
          </h2> */}
          <FavoriteList />
        </div>
      </div>
      {/* Verlinkung zur nächsten Übersicht.. */}
      <Link to="/dashboard">
        <div className="mt-12 text-white text-center text-lg italic">
          „Heute ist ein guter Tag, um es zu versuchen.“
        </div>
      </Link>

      <Link to="/dashboard/zusatz">
        <div className="mt-12 text-white text-center italic">zu den News →</div>
      </Link>
    </>
  );
}

export default Invest;
