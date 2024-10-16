import React, { useState } from "react";
import { Modal } from "@mui/material";
import { FaTimes } from "react-icons/fa";

interface Recipe {
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fats: number;
}

interface AddRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipesData: Recipe[];
  onAddRecipe: (recipe: Recipe) => void; 
}
const AddRecipeModal: React.FC<AddRecipeModalProps> = ({
  isOpen,
  onClose,
  recipesData,
  onAddRecipe,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  if (!isOpen) return null;

  const handleAddRecipe = () => {
    if (selectedRecipe) {
      onAddRecipe(selectedRecipe);
      onClose();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 flex flex-col items-center text-center dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center justify-between w-full">
            <h2
              className="text-lg font-bold dark:text-slate-200 flex-grow text-center"
              id="modal-title"
            >
              Adicionar Nova Receita
            </h2>
            <button
              onClick={onClose}
              className="text-red-600 hover:text-red-800"
              aria-label="Close"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Select Recipe Dropdown */}
          <div className="my-4 w-full">
            <select
              value={selectedRecipe ? selectedRecipe.name : ""}
              onChange={(e) =>
                setSelectedRecipe(
                  recipesData.find((recipe) => recipe.name === e.target.value) || null
                )
              }
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="" disabled>
                Selecione uma Receita
              </option>
              {recipesData.map((recipe) => (
                <option key={recipe.name} value={recipe.name}>
                  {recipe.name}
                </option>
              ))}
            </select>
          </div>

          {/* Button to Add Selected Recipe */}
          <button
            onClick={handleAddRecipe}
            disabled={!selectedRecipe}
            className={`${
              selectedRecipe ? "bg-green-500" : "bg-gray-400"
            } text-white rounded-md px-4 py-2 flex items-center hover:bg-green-600 transition duration-300`}
          >
            Adicionar Receita
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddRecipeModal;
