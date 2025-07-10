import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import GrowthLine from "../components/GrowthLine";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const [affirmation, setAffirmation] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAffirmation = async () => {
      try {
        const response = await fetch("https://zenquotes.io/api/random");

        if (!response.ok) {
          throw new Error(`API-Fehler: Status ${response.status}`);
        }

        const data = await response.json();
        const quote = data?.[0]?.q;
        const author = data?.[0]?.a;

        if (quote && author) {
          setAffirmation(`„${quote}“ — ${author}`);
        } else {
          setAffirmation(
            "„Heute ist ein guter Tag, um es trotzdem zu versuchen.“"
          );
        }
      } catch (err) {
        console.error("Fehler beim Laden der Affirmation:", err);
        setError("Erfolg ist kein Zufall, sondern eine Entscheidung.");
      }
    };

    fetchAffirmation();
  }, []);

  if (!user) {
    return <div className="text-center text-white mt-10">Lade Daten...</div>;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col p-8 rounded-xl bg-[#014325] text-center max-w-xl w-full">
        <h1 className="text-3xl font-bold text-green-300 mb-2 font-mono">
          Willkommen {user?.name || "Freund"}!
        </h1>

        <p className="text-green-300 text-lg mb-6 font-mono">
          Schön, dass du wieder da bist in deinem MindMoney-Dashboard. Verwalte
          ab jetzt Deine Finanzen bewusst!
        </p>

        <blockquote className="italic text-green-700 bg-gradient-to-b from-emerald-400 to-amber-100 px-6 py-4 rounded-lg shadow-inner">
          <span className="block text-xl mb-2">🌱</span>
          <span className="block">
            {affirmation ||
              error ||
              "„Wie eine Pflanze wächst auch dein Wohlstand – mit Geduld, Pflege und Klarheit.“"}
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
               transition duration-300 ease-in-out"
            >
              💸 Los geht's!
            </button>
          </Link>
        </div>

        <div className="mt-2 rounded-xl bg-gray-900">
          <GrowthLine />
        </div>
      </div>
    </div>
  );
}
