// src/pages/Ziele.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ZielCard from "../components/ZielCard";
import CreateZielModal from "../components/CreateZielModal";
import EditZielModal from "../components/EditZielModal";

const Ziele = () => {
  const [ziele, setZiele] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editZiel, setEditZiel] = useState(null);
  const MySwal = withReactContent(Swal);

  const loadZiele = () => {
    axios
      .get("http://localhost:8080/goals")
      .then((res) => setZiele(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadZiele();
  }, []);

  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: "Bist du sicher?",
      text: "Willst du dieses Sparziel wirklich löschen?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ja, löschen!",
      cancelButtonText: "Abbrechen",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8080/goals/${id}`);
      setZiele((prev) => prev.filter((ziel) => ziel.id !== id));
      await MySwal.fire("Gelöscht!", "Das Ziel wurde entfernt.", "success");
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
      MySwal.fire("Fehler", "Konnte Ziel nicht löschen", "error");
    }
  };

  const updateZiel = (updatedZiel) => {
    setZiele((prev) =>
      prev.map((z) => (z.id === updatedZiel.id ? updatedZiel : z))
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-amber-50">🌱 Meine Sparziele</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 transition"
        >
          + Neues Ziel
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ziele.map((ziel) => (
          <ZielCard
            key={ziel.id}
            ziel={ziel}
            onEdit={() => setEditZiel(ziel)}
            onDelete={() => handleDelete(ziel.id)}
            onZielUpdated={updateZiel}
          />
        ))}
      </div>

      <EditZielModal
        isOpen={!!editZiel}
        onClose={() => setEditZiel(null)}
        ziel={editZiel}
        onZielUpdated={(updatedZiel) => {
          updateZiel(updatedZiel);
          setEditZiel(null);
        }}
      />

      <CreateZielModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onZielCreated={(newZiel) => setZiele((prev) => [...prev, newZiel])}
      />
    </div>
  );
};

export default Ziele;
