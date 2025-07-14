import { useEffect, useState } from "react";
import { Link } from "react-router";

const Zusatz = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const API_TOKEN = "OjpYZCpG8bE4O45tqLfk8d54DEt5q5ucatp67azj";
  // const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const ENDPOINT = `https://api.marketaux.com/v1/news/all?limit=10&language=de&countries=us&api_token=OjpYZCpG8bE4O45tqLfk8d54DEt5q5ucatp67azj`;

  // const ENDPOINT = `https://api.marketaux.com/v1/news/all?countries=us&filter_entities=true&limit=10&published_after=${yesterday}&api_token=${API_TOKEN}`;

  // const ENDPOINT = `https://api.marketaux.com/v1/news/all?countries=us&filter_entities=true&limit=10&published_after=2025-07-09T11:19&api_token=${API_TOKEN}&limit=6`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(ENDPOINT);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Anzahl Artikel:", data.data.length);
        setNews(data.data || []);
      } catch (err) {
        console.error("Fehler beim Laden der News:", err);
        setError("Fehler beim Abrufen der Finanznews.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-mono font-bold text-amber-50 mb-6">
        Aktuelle Finanznachrichten
        {/* (Marketaux) */}
      </h2>

      {loading && <p className="text-gray-500">Lade News...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article) => (
          <div
            key={article.uuid}
            className="bg-white rounded-lg shadow hover:shadow-lg transition duration-200 overflow-hidden"
          >
            {article.image_url?.startsWith("http") && (
              <img
                src={article.image_url}
                alt={article.title}
                onError={(e) => (e.target.style.display = "none")}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {article.description ||
                  article.snippet ||
                  "Keine Beschreibung verfügbar."}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  {new Date(article.published_at).toLocaleDateString()}
                </span>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Weiterlesen →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Verlinkung zur nächsten Übersicht.. */}
      <Link to="/dashboard">
        <div className="mt-30 text-white text-center text-lg italic">
          „Befasse Dich mit Deinem Geld, sonst tut es jemand anderes!“
        </div>
      </Link>
    </div>
  );
};

export default Zusatz;
