import React from "react";
import { Modal } from "@mui/material";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newDietPlan: { name: string; email: string; startDate: string; endDate: string }) => void;
}

const DietPlanModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, startDate, endDate });
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 flex flex-col items-center text-center bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center justify-between w-full">
            <h2
              className="text-lg font-bold dark:text-slate-200 flex-grow text-center"
              id="modal-title"
            >
              Create New Diet Plan
            </h2>
            <button
              onClick={onClose}
              className="text-red-600 hover:text-red-800"
              aria-label="Close"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4 w-full">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-md px-4 py-2 flex items-center hover:bg-blue-700 transition duration-300"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default DietPlanModal;
