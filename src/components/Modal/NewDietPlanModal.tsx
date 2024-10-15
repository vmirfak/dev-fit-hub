import React from "react";
import { Modal } from "@mui/material";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newDietPlan: {
    name: string;
    email: string;
    startDate: string;
    endDate: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    mealsPerDay: number;
  }) => void;
}

const DietPlanModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [calories, setCalories] = React.useState(0);
  const [protein, setProtein] = React.useState(0);
  const [carbs, setCarbs] = React.useState(0);
  const [fats, setFats] = React.useState(0);
  const [mealsPerDay, setMealsPerDay] = React.useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      email,
      startDate,
      endDate,
      calories,
      protein,
      carbs,
      fats,
      mealsPerDay,
    });
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
        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 flex flex-col items-center text-center">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-bold" id="modal-title">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-left">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-left">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-left">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-left">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-left">Total Calories</label>
                <input
                  type="number"
                  placeholder="Total Calories"
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-left">Protein (g)</label>
                <input
                  type="number"
                  placeholder="Protein (g)"
                  value={protein}
                  onChange={(e) => setProtein(Number(e.target.value))}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-left">Carbs (g)</label>
                <input
                  type="number"
                  placeholder="Carbs (g)"
                  value={carbs}
                  onChange={(e) => setCarbs(Number(e.target.value))}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-left">Fats (g)</label>
                <input
                  type="number"
                  placeholder="Fats (g)"
                  value={fats}
                  onChange={(e) => setFats(Number(e.target.value))}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-left">Meals Per Day</label>
                <input
                  type="number"
                  placeholder="Meals Per Day"
                  value={mealsPerDay}
                  onChange={(e) => setMealsPerDay(Number(e.target.value))}
                  required
                  min={1}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-md px-4 py-2 flex items-center hover:bg-blue-700 transition duration-300 mt-4"
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
