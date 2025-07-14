import { Dialog } from "@headlessui/react";
import { useState } from "react";
import axios from "axios";

const CreateZielModal = ({ isOpen, onClose, onZielCreated }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    target_amount: "",
    saved_amount: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/goals", form);
      onZielCreated(res.data);
      onClose();
    } catch (err) {
      console.error("Fehler beim Erstellen:", err);
    }
  };

  return (
    // <Dialog
    //   open={isOpen}
    //   onClose={onClose}
    //   className="fixed z-10 inset-0 overflow-y-auto"
    // >
    //   <div className="flex items-center justify-center min-h-screen px-4">

    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Ersetze das hier 👇 */}
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />

        <div className="bg-[#93c989] text-emerald-900 rounded-lg shadow-lg p-6 z-20 w-full max-w-md">
          {/* <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />[#67b4a3]
        <div className="bg-white rounded-lg shadow-lg p-6 z-20 w-full max-w-md"> */}
          <Dialog.Title className="text-xl font-semibold mb-4">
            Neues Sparziel
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              placeholder="Titel"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <textarea
              name="description"
              placeholder="Beschreibung"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="target_amount"
              type="number"
              placeholder="Zielbetrag (€)"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="saved_amount"
              type="number"
              placeholder="Bereits gespart (€)"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {/* <input
              name="monthly_rate"
              type="number"
              placeholder="Monatliche Sparrate (€)"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            /> */}
            <input
              name="deadline"
              type="date"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-400 rounded cursor-pointer hover:bg-gray-300"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-600 cursor-pointer"
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

export default CreateZielModal;
