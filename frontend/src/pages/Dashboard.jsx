import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  console.log("userInDashboardAuchLEER??", user);
  const [affirmation, setAffirmation] = useState("");

  // const fetchAffirmation = async () => {
  //   return "Du bist genau da, wo du sein sollst.";
  // };
  const fetchAffirmation = async () => {
    try {
      const response = await fetch(
        "https://affirmations-api-by-apirobots.p.rapidapi.com/v1/affirmations/categories/%7Bcategory%7D/random",
        // "https://api.apirobots.pro/v1/affirmations/categories/success/random",
        {
          headers: {
            "x-rapidapi-key":
              "4505a71a6emshddcb535de67b373p184dbfjsn64ed93458afb", // Ersetze mit deinem echten API-Key
            "x-rapidapi-host": "affirmations-api-by-apirobots.p.rapidapi.com",
          },
        }
      );
      if (!response.ok) {
        console.error("API Fehlerstatus:", response.status);
        throw new Error(`API antwortet mit Status ${response.status}`);
      }
      const data = await response.json();
      console.log("Affirmation API response:", data);
      // ❗ Achtung: was genau kommt zurück?
      const text =
        data.text || data.message || data.affirmation || "Erfolg ist in dir.";
      setAffirmation(text);
      // setAffirmation(data.text);
      // console.log("dataInDaschboard", data);
      return data.text;
    } catch (error) {
      console.error("Fehler beim Laden der Affirmation:", error);
      return "Heute ist ein guter Tag für deinen Erfolg!";
    }
  };
  useEffect(() => {
    const saved = localStorage.getItem("affirmationOfTheSession");
    if (saved) {
      setAffirmation(saved);
    } else {
      fetchAffirmation().then((text) => {
        setAffirmation(text);
        localStorage.setItem("affirmationOfTheSession", text);
      });
    }
  }, []);

  if (!user)
    return <div className="text-center text-white mt-10">Lade Daten...</div>;

  return (
    <div className="p-8 flex items-center justify-center">
      <div className=" bg-gradient-to-t from-amber-100 to-emerald-800 p-8 rounded-xl shadow-xl text-center max-w-xl w-full">
        {/* bg-gradient-to-t from-amber-100 to-emerald-700 */}
        <h1 className="text-3xl font-bold text-green-300 mb-2">
          Willkommen {user.name}!
        </h1>

        <div className="bg-yellow-100 text-yellow-900 p-6 rounded-lg shadow-md text-center text-lg italic">
          🌟 {affirmation || "Lade Affirmation..."}
        </div>

        <p className="text-green-300 text-lg mb-6">
          Schön, dass du wieder da bist in deinem MindMoney-Dashboard.
        </p>
        <blockquote className="italic text-green-700 bg-amber-50 px-6 py-4 rounded-lg shadow-inner">
          <span className="block text-xl mb-2">🌱</span>
          <span className="block">
            „Wie eine Pflanze wächst auch dein Wohlstand – mit Geduld, Pflege
            und Klarheit.“
          </span>
        </blockquote>
      </div>
    </div>
  );
}
