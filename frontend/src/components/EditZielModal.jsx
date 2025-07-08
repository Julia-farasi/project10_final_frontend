import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import axios from "axios";

const EditZielModal = ({ isOpen, onClose, ziel, onZielUpdated }) => {
  const [form, setForm] = useState({ ...ziel });

  useEffect(() => {
    if (ziel) setForm({ ...ziel });
  }, [ziel]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8080/goals/${ziel.id}`,
        form
      );
      onZielUpdated(res.data);
      onClose();
    } catch (err) {
      console.error("Fehler beim Aktualisieren:", err);
    }
  };

  if (!ziel) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
        <div className="bg-white rounded-lg shadow-lg p-6 z-20 w-full max-w-md">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Sparziel bearbeiten
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              placeholder="Titel"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <textarea
              name="description"
              placeholder="Beschreibung"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="target_amount"
              type="number"
              placeholder="Zielbetrag (€)"
              value={form.target_amount}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="saved_amount"
              type="number"
              placeholder="Bereits gespart (€)"
              value={form.saved_amount}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="monthly_rate"
              type="number"
              placeholder="Monatliche Sparrate (€)"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="deadline"
              type="date"
              value={form.deadline?.slice(0, 10)}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Speichern
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default EditZielModal;
