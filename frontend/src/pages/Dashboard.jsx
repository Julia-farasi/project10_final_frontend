import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user)
    return <div className="text-center text-white mt-10">Lade Daten...</div>;

  return (
    <div className="p-8 flex items-center justify-center">
      <div className="bg-gradient-to-t from-amber-100 to-emerald-700 p-8 rounded-xl shadow-xl text-center max-w-xl w-full">
        <h1 className="text-3xl font-bold text-green-300 mb-2">
          Willkommen {user.name}!
        </h1>
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
