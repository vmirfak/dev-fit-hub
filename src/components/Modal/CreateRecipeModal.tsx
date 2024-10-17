import React from "react";
import { Modal } from "@mui/material";
import { FaTimes, FaPlus } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newRecipe: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    glutenFree: boolean;
    vegan: boolean;
    dairyFree: boolean;
    lowCarb: boolean;
    highProtein: boolean;
    quickPrep: boolean;
    ingredients: Ingredient[];
  }) => void;
}

const CreateRecipeModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = React.useState("");
  const [calories, setCalories] = React.useState<string | number>("");
  const [protein, setProtein] = React.useState<string | number>("");
  const [carbs, setCarbs] = React.useState<string | number>("");
  const [fats, setFats] = React.useState<string | number>("");
  const [glutenFree, setGlutenFree] = React.useState(false);
  const [vegan, setVegan] = React.useState(false);
  const [dairyFree, setDairyFree] = React.useState(false);
  const [lowCarb, setLowCarb] = React.useState(false);
  const [highProtein, setHighProtein] = React.useState(false);
  const [quickPrep, setQuickPrep] = React.useState(false);
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([
    { name: "", quantity: 0, unit: "g" }, // Adicionada a unidade
  ]);

  const units = [
    "g",
    "mL",
    "kg",
    "L",
    "xícara",
    "colher de sopa",
    "colher de chá",
  ];

  const handleIngredientChange = (
    index: number,
    field: "name" | "quantity" | "unit", // Adicionada a unidade
    value: string | number
  ) => {
    const newIngredients = [...ingredients];
    if (field === "name") {
      newIngredients[index].name = value as string;
    } else if (field === "quantity") {
      newIngredients[index].quantity = Number(value);
    } else {
      newIngredients[index].unit = value as string; // Atualização da unidade
    }
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: 0, unit: "g" }]); // Adicionada a unidade padrão
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      calories: calories === "" ? 0 : Number(calories),
      protein: protein === "" ? 0 : Number(protein),
      carbs: carbs === "" ? 0 : Number(carbs),
      fats: fats === "" ? 0 : Number(fats),
      glutenFree,
      vegan,
      dairyFree,
      lowCarb,
      highProtein,
      quickPrep,
      ingredients,
    });

    // Limpar os campos após o envio
    setName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFats("");
    setGlutenFree(false);
    setVegan(false);
    setDairyFree(false);
    setLowCarb(false);
    setHighProtein(false);
    setQuickPrep(false);
    setIngredients([{ name: "", quantity: 0, unit: "g" }]);

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
        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 flex flex-col items-center text-center dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center justify-between w-full">
            <h2
              className="text-lg font-bold dark:text-slate-200"
              id="modal-title"
            >
              Criar Nova Receita
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
            {/* Nome da Receita */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Designação:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 bg-gray-50 py-1 px-10 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                placeholder="Nome da Receita"
              />
            </div>

            {/* Linha de Inputs */}
            <div className="grid grid-cols-4 gap-4">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Energia (kcal):
              </label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="border border-gray-300 bg-gray-50 py-1 px-1 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
              />
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Proteínas (g):
              </label>
              <input
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="border border-gray-300 bg-gray-50 py-1 px-1 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
              />
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Hidratos de Carbono (g):
              </label>
              <input
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className="border border-gray-300 bg-gray-50 py-1 px-1 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
              />
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Gorduras (g):
              </label>
              <input
                type="number"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
                className="border border-gray-300 bg-gray-50 py-1 px-1 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
              />
            </div>

            {/* Checkboxes em duas colunas */}
            <div className="mt-2 grid grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={glutenFree}
                  onChange={() => setGlutenFree(!glutenFree)}
                  className="mr-2 scale-150 cursor-pointer"
                />
                Sem Glúten
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={vegan}
                  onChange={() => setVegan(!vegan)}
                  className="mr-2 scale-150 cursor-pointer"
                />
                Vegano
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={dairyFree}
                  onChange={() => setDairyFree(!dairyFree)}
                  className="mr-2 scale-150 cursor-pointer"
                />
                Sem Lácteos
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={lowCarb}
                  onChange={() => setLowCarb(!lowCarb)}
                  className="mr-2 scale-150 cursor-pointer"
                />
                Baixo em Carboidratos
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={highProtein}
                  onChange={() => setHighProtein(!highProtein)}
                  className="mr-2 scale-150 cursor-pointer"
                />
                Alto em Proteínas
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={quickPrep}
                  onChange={() => setQuickPrep(!quickPrep)}
                  className="mr-2 scale-150 cursor-pointer"
                />
                Preparo Rápido
              </label>
            </div>

            {/* Ingredientes */}
            <div className="mt-4">
              <h3 className="text-lg font-bold dark:text-slate-200">
                Ingredientes:
              </h3>
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between my-2"
                >
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) =>
                      handleIngredientChange(index, "name", e.target.value)
                    }
                    placeholder="Nome do ingrediente"
                    className="border border-gray-300 bg-gray-50 py-1 px-2 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white w-2/5"
                  />
                  <input
                    type="number"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      handleIngredientChange(index, "quantity", e.target.value)
                    }
                    placeholder="Quantidade"
                    className="border border-gray-300 bg-gray-50 py-1 px-2 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white w-1/5"
                  />
                  <select
                    value={ingredient.unit}
                    onChange={(e) =>
                      handleIngredientChange(index, "unit", e.target.value)
                    }
                    className="border border-gray-300 bg-gray-50 py-1 px-2 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white w-1/5 cursor-pointer"
                  >
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() =>
                      setIngredients(ingredients.filter((_, i) => i !== index))
                    }
                    className="w-4 h-4 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                  >
                    <FiMinus size={14} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="flex items-center text-blue-500 hover:text-blue-700 mt-2"
              >
                <FaPlus className="mr-2" />
                Adicionar Ingrediente
              </button>
            </div>

            {/* Botão para Criar Receita */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Criar Receita
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateRecipeModal;
