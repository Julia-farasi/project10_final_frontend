import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
// import MoodGardenProgress from "../components/MoodGardenProgress";
import CreateZielModal from "../components/CreateZielModal";
import EditZielModal from "../components/EditZielModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import GrowingPlant from "../components/GrowingPlant";
// import SvgPlant from "../components/SvgPlant";
import RealisticPlant from "../components/RealisticPlant";

const Ziele = () => {
  const [ziele, setZiele] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editZiel, setEditZiel] = useState(null);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    axios
      .get("http://localhost:8080/goals") // dein Express-Endpoint
      .then((res) => setZiele(res.data))
      .catch((err) => console.error(err));
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
      setZiele(ziele.filter((ziel) => ziel.id !== id));

      await MySwal.fire({
        title: "Gelöscht!",
        text: "Das Sparziel wurde erfolgreich entfernt.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
      await MySwal.fire({
        title: "Fehler",
        text: "Beim Löschen ist etwas schiefgelaufen.",
        icon: "error",
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🌱 Meine Sparziele</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Neues Ziel
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ziele.map((ziel) => (
          // <ZielCard key={ziel.id} ziel={ziel} />
          <ZielCard
            key={ziel.id}
            ziel={ziel}
            onEdit={() => setEditZiel(ziel)}
            onDelete={() => handleDelete(ziel.id)}
          />
        ))}
        <EditZielModal
          isOpen={!!editZiel}
          onClose={() => setEditZiel(null)}
          ziel={editZiel}
          onZielUpdated={(updatedZiel) => {
            setZiele(
              ziele.map((z) => (z.id === updatedZiel.id ? updatedZiel : z))
            );
            setEditZiel(null);
          }}
        />
      </div>

      <CreateZielModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onZielCreated={(newZiel) => setZiele([...ziele, newZiel])}
      />
    </div>
  );
};

const ZielCard = ({ ziel, onEdit, onDelete }) => {
  const { title, description, target_amount, saved_amount, deadline } = ziel;
  const progress = Math.min((saved_amount / target_amount) * 100, 100);

  return (
    <div className="relative bg-amber-50 shadow-md rounded-lg p-6 border border-green-200">
      {/* Bearbeiten-Button */}
      <div className="absolute top-2 right-2">
        <button
          onClick={onEdit}
          className="text-sm text-green-600 hover:underline"
        >
          ✏️ Bearbeiten
        </button>
        <button
          onClick={onDelete}
          className="text-sm text-red-500 hover:underline"
        >
          🗑️ Löschen
        </button>
      </div>

      <h2 className="text-xl text-gray-800 font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-sm text-gray-500 mb-4">
        Ziel: {target_amount} € · Gespart: {saved_amount} € · Deadline:{" "}
        {format(new Date(deadline), "dd.MM.yyyy")}
      </p>
      {/* <GrowingPlant progress={progress} /> */}
      <div className="flex justify-center mt-4">
        <RealisticPlant progress={progress} />
      </div>
      {/* <MoodGardenProgress
        progress={progress}
        target_amount={target_amount}
        saved_amount={saved_amount}
      /> */}
    </div>
  );
};

export default Ziele;
