import { useState, useEffect } from "react";

const FavoriteStar = ({ symbol }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Beim Laden prüfen, ob im localStorage gespeichert
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(symbol));
  }, [symbol]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(symbol)) {
      const updated = favorites.filter((s) => s !== symbol);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      const updated = [...favorites, symbol];
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(true);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className="absolute top-2 right-2 text-yellow-400 text-xl hover:scale-110 transition-transform"
      title={isFavorite ? "Entfernen aus Favoriten" : "Zu Favoriten hinzufügen"}
    >
      {isFavorite ? "★" : "☆"}
    </button>
  );
};

export default FavoriteStar;
