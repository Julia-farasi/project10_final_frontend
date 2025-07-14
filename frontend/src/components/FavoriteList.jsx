// FavoriteList.jsx (used for Crypto + Aktien)
import { useEffect, useState } from "react";
import CryptoPriceDisplay from "./CryptoPriceDisplay";
import StockPriceDisplay from "./StockPriceDisplay";

const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  if (favorites.length === 0) return <p className="text-white"></p>; //→→ Keine Favoriten vorhanden

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map((symbol) => (
        <div key={symbol} className="relative">
          {symbol.includes("/") ? (
            <CryptoPriceDisplay symbol={symbol} />
          ) : (
            <StockPriceDisplay symbol={symbol} />
          )}
        </div>
      ))}
    </div>
  );
};

export default FavoriteList;
