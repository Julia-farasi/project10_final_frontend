import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import GrowthLine from "../components/GrowthLine";
import { Link } from "react-router-dom";

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
        // "https://affirmations-api-by-apirobots.p.rapidapi.com/v1/affirmations/categories/success/random",
        // "https://affirmations-api-by-apirobots.p.rapidapi.com/v1/affirmations/categories/%7Bcategory%7D/random",
        // "https://api.apirobots.pro/v1/affirmations/categories/success/random",
        {
          method: "GET",
          headers: {
            // "x-rapidapi-host": "affirmations-api-by-apirobots.p.rapidapi.com",
            // "x-rapidapi-key":
            //   "4505a71a6emshddcb535de67b373p184dbfjsn64ed93458afb",
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
      return text;
    } catch (error) {
      console.error("Fehler beim Laden der Affirmation:", error);
      return "„Wie eine Pflanze wächst auch dein Wohlstand – mit Geduld, Pflege und Klarheit.“ "; //Heute ist ein guter Tag für deinen Erfolg!
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
    <div className="flex items-center justify-center">
      <div className="flex flex-col p-8 rounded-xl bg-[#014325] text-center max-w-xl w-full">
        {/* bg-gradient-to-t from-amber-100 to-emerald-700 */}
        <h1 className="text-3xl font-bold text-green-300 mb-2 font-mono">
          Willkommen {user?.name || "Freund"}!
        </h1>

        {/* <div className="bg-yellow-100 text-yellow-900 p-6 rounded-lg shadow-md text-center text-lg italic">
          🌟 {affirmation || "Lade Affirmation..."}
        </div> */}

        <p className="text-green-300 text-lg mb-6 font-mono">
          Schön, dass du wieder da bist in deinem MindMoney-Dashboard. Verwalte
          ab jetzt Deine Finanzen bewußt!
        </p>
        <blockquote className="italic text-green-700 bg-gradient-to-b from-emerald-400 to-amber-100 px-6 py-4 rounded-lg shadow-inner">
          <span className="block text-xl mb-2">🌱</span>
          <span className="block">
            {" "}
            {affirmation ||
              "„Wie eine Pflanze wächst auch dein Wohlstand – mit Geduld, Pflege und Klarheit.“ "}
            {/* „Wie eine Pflanze wächst auch dein Wohlstand – mit Geduld, Pflege
            und Klarheit.“ */}
          </span>
        </blockquote>
        <div className="m-6 flex justify-center">
          <Link to="/dashboard/budget">
            <button
              className="cursor-pointer px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-700 
               text-white font-mono text-lg font-semibold 
               rounded-xl shadow-lg shadow-amber-400
               hover:shadow-emerald-100
               hover:scale-105 hover:brightness-110 
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 
               transition duration-300 ease-in-out
               "
            >
              💸 Los geht's!
            </button>
          </Link>
        </div>
        {/* <div className="m-6 flex justify-center">
          <Link to="/dashboard/budget">
            <button
              className="px-6 py-3 bg-gradient-to-br from-emerald-500 via-green-600 to-green-700 
                 text-white font-mono text-lg font-semibold 
                 rounded-xl shadow-[0_4px_8px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(255,255,255,0.1)]
                 hover:shadow-[0_6px_12px_rgba(0,255,180,0.3),inset_0_-2px_6px_rgba(255,255,255,0.2)]
                 hover:translate-y-[-2px]
                 hover:brightness-110 
                 active:scale-95
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300 
                 transition-all duration-300 ease-in-out"
            >
              💸 Möchtest du deine Finanzen sehen?
            </button>
          </Link>
        </div> */}
        <div className="mt-2 rounded-xl bg-gray-900">
          <GrowthLine />
        </div>
      </div>
    </div>
  );
}
