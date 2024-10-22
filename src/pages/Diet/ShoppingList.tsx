import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLoayout";
import { jsPDF } from "jspdf";
import GroceryModal from "../../components/Modal/GroceryModal";
import { FiMinus, FiPlus, FiTrash2, FiList } from "react-icons/fi";

interface Ingredient {
  name: string;
  quantity: string;
}

interface Meal {
  id: number;
  name: string;
  ingredients: Ingredient[];
}

const mealsData: Meal[] = [
  {
    id: 1,
    name: "Salada de Frango Grelhado",
    ingredients: [
      { name: "Peito de Frango", quantity: "300g" },
      { name: "Alface", quantity: "1 molho" },
      { name: "Tomate", quantity: "2 unidades" },
      { name: "Azeite", quantity: "2 colheres de sopa" },
    ],
  },
  {
    id: 2,
    name: "Espaguete à Bolonhesa",
    ingredients: [
      { name: "Espaguete", quantity: "200g" },
      { name: "Carne Moída", quantity: "250g" },
      { name: "Molho de Tomate", quantity: "1 chávena" },
      { name: "Alho", quantity: "3 dentes" },
    ],
  },
  {
    id: 3,
    name: "Frango Salteado",
    ingredients: [
      { name: "Peito de Frango", quantity: "300g" },
      { name: "Pimentos", quantity: "2 unidades" },
      { name: "Cebola", quantity: "1 unidade" },
      { name: "Molho de Soja", quantity: "3 colheres de sopa" },
    ],
  },
  {
    id: 4,
    name: "Caril de Legumes",
    ingredients: [
      { name: "Batatas", quantity: "3 unidades" },
      { name: "Cenouras", quantity: "2 unidades" },
      { name: "Leite de Coco", quantity: "1 lata" },
      { name: "Pó de Caril", quantity: "2 colheres de sopa" },
    ],
  },
  {
    id: 5,
    name: "Tacos de Carne",
    ingredients: [
      { name: "Carne Moída", quantity: "200g" },
      { name: "Tortilhas de Taco", quantity: "8 unidades" },
      { name: "Alface", quantity: "1 molho" },
      { name: "Queijo Cheddar", quantity: "100g" },
    ],
  },
  {
    id: 6,
    name: "Panquecas com Frutos Vermelhos",
    ingredients: [
      { name: "Farinha de Trigo", quantity: "1 chávena" },
      { name: "Leite", quantity: "1 chávena" },
      { name: "Ovos", quantity: "2 unidades" },
      { name: "Frutos Vermelhos Mistos", quantity: "1 chávena" },
    ],
  },
  {
    id: 7,
    name: "Salada de Quinoa",
    ingredients: [
      { name: "Quinoa", quantity: "1 chávena" },
      { name: "Pepino", quantity: "1 unidade" },
      { name: "Tomates Cereja", quantity: "1 chávena" },
      { name: "Queijo Feta", quantity: "100g" },
    ],
  },
  {
    id: 8,
    name: "Massa Alfredo com Camarão",
    ingredients: [
      { name: "Camarão", quantity: "250g" },
      { name: "Massa", quantity: "200g" },
      { name: "Natas", quantity: "1 chávena" },
      { name: "Queijo Parmesão", quantity: "1/2 chávena" },
    ],
  },
  {
    id: 9,
    name: "Frango e Brócolos Salteados",
    ingredients: [
      { name: "Tiras de Carne", quantity: "300g" },
      { name: "Brócolos", quantity: "1 cabeça" },
      { name: "Molho de Soja", quantity: "2 colheres de sopa" },
      { name: "Alho", quantity: "3 dentes" },
    ],
  },
  {
    id: 10,
    name: "Tosta de Abacate",
    ingredients: [
      { name: "Pão", quantity: "2 fatias" },
      { name: "Abacate", quantity: "1 unidade" },
      { name: "Sumo de Limão", quantity: "1 colher de sopa" },
      { name: "Flocos de Chili", quantity: "1 colher de chá" },
    ],
  },
  {
    id: 11,
    name: "Salada Caprese",
    ingredients: [
      { name: "Mozzarella Fresca", quantity: "250g" },
      { name: "Tomates", quantity: "3 unidades" },
      { name: "Manjericão", quantity: "1 molho" },
      { name: "Vinagre Balsâmico", quantity: "2 colheres de sopa" },
    ],
  },
  {
    id: 12,
    name: "Pimentos Recheados",
    ingredients: [
      { name: "Pimentos", quantity: "4 unidades" },
      { name: "Quinoa", quantity: "1 chávena" },
      { name: "Feijão Preto", quantity: "1 lata" },
      { name: "Queijo Cheddar", quantity: "100g" },
    ],
  },
  {
    id: 13,
    name: "Frango Tikka Masala",
    ingredients: [
      { name: "Peito de Frango", quantity: "500g" },
      { name: "Iogurte", quantity: "1 chávena" },
      { name: "Pasta Tikka Masala", quantity: "2 colheres de sopa" },
      { name: "Leite de Coco", quantity: "1 chávena" },
    ],
  },
  {
    id: 14,
    name: "Legumes Salteados",
    ingredients: [
      { name: "Legumes Mistos", quantity: "300g" },
      { name: "Molho de Soja", quantity: "2 colheres de sopa" },
      { name: "Alho", quantity: "2 dentes" },
      { name: "Óleo de Sésamo", quantity: "1 colher de sopa" },
    ],
  },
  {
    id: 15,
    name: "Omelete",
    ingredients: [
      { name: "Ovos", quantity: "3 unidades" },
      { name: "Espinafre", quantity: "1 chávena" },
      { name: "Queijo Feta", quantity: "50g" },
      { name: "Azeite", quantity: "1 colher de sopa" },
    ],
  },
  {
    id: 16,
    name: "Sopa de Lentilhas",
    ingredients: [
      { name: "Lentilhas", quantity: "1 chávena" },
      { name: "Cenouras", quantity: "2 unidades" },
      { name: "Cebola", quantity: "1 unidade" },
      { name: "Caldo de Legumes", quantity: "4 chávenas" },
    ],
  },
  {
    id: 17,
    name: "Tacos de Peixe",
    ingredients: [
      { name: "Peixe Branco", quantity: "300g" },
      { name: "Tortilhas de Milho", quantity: "8 unidades" },
      { name: "Repolho", quantity: "1/2 cabeça" },
      { name: "Natas", quantity: "1/2 chávena" },
    ],
  },
  {
    id: 18,
    name: "Biscoitos com Pepitas de Chocolate",
    ingredients: [
      { name: "Farinha de Trigo", quantity: "2 chávenas" },
      { name: "Açúcar Mascavado", quantity: "1 chávena" },
      { name: "Manteiga", quantity: "1 chávena" },
      { name: "Pepitas de Chocolate", quantity: "1 chávena" },
    ],
  },
  {
    id: 19,
    name: "Estrogonofe de Carne",
    ingredients: [
      { name: "Tiras de Carne", quantity: "400g" },
      { name: "Cogumelos", quantity: "200g" },
      { name: "Natas", quantity: "1 chávena" },
      { name: "Massa de Ovos", quantity: "250g" },
    ],
  },
  {
    id: 20,
    name: "Berinjela à Parmegiana",
    ingredients: [
      { name: "Berinjela", quantity: "2 unidades" },
      { name: "Molho Marinara", quantity: "2 chávenas" },
      { name: "Queijo Mozzarella", quantity: "200g" },
      { name: "Queijo Parmesão", quantity: "100g" },
    ],
  },
  {
    id: 22,
    name: "Quesadilla de Legumes",
    ingredients: [
      { name: "Tortilhas de Trigo", quantity: "4 pcs" },
      { name: "Legumes Mistos", quantity: "2 chávenas" },
      { name: "Queijo Cheddar", quantity: "150g" },
      { name: "Natas", quantity: "1/2 chávena" },
    ],
  },
  {
    id: 23,
    name: "Massa Pesto",
    ingredients: [
      { name: "Massa", quantity: "250g" },
      { name: "Molho Pesto", quantity: "1/2 chávena" },
      { name: "Tomates Cereja", quantity: "1 chávena" },
      { name: "Queijo Parmesão", quantity: "50g" },
    ],
  },
  {
    id: 24,
    name: "Frango com Mel e Alho",
    ingredients: [
      { name: "Coxas de Frango", quantity: "500g" },
      { name: "Mel", quantity: "1/4 chávena" },
      { name: "Alho", quantity: "4 dentes" },
      { name: "Molho de Soja", quantity: "1/4 chávena" },
    ],
  },
  {
    id: 25,
    name: "Batatas Doces Fritas",
    ingredients: [
      { name: "Batatas Doces", quantity: "2 pcs" },
      { name: "Azeite", quantity: "2 colheres de sopa" },
      { name: "Páprica", quantity: "1 colher de chá" },
      { name: "Sal", quantity: "1 colher de chá" },
    ],
  },
  {
    id: 26,
    name: "Smoothie de Manga",
    ingredients: [
      { name: "Manga", quantity: "1 pc" },
      { name: "Iogurte", quantity: "1 chávena" },
      { name: "Leite", quantity: "1 chávena" },
      { name: "Mel", quantity: "1 colher de sopa" },
    ],
  },
  {
    id: 27,
    name: "Parfait de Iogurte Grego",
    ingredients: [
      { name: "Iogurte Grego", quantity: "1 chávena" },
      { name: "Granola", quantity: "1/2 chávena" },
      { name: "Frutos Vermelhos Mistos", quantity: "1 chávena" },
      { name: "Mel", quantity: "1 colher de sopa" },
    ],
  },
  {
    id: 28,
    name: "Frango Recheado com Espinafres e Feta",
    ingredients: [
      { name: "Peito de Frango", quantity: "4 pcs" },
      { name: "Espinafre", quantity: "2 chávenas" },
      { name: "Queijo Feta", quantity: "100g" },
      { name: "Azeite", quantity: "2 colheres de sopa" },
    ],
  },
];

const ShoppingList = () => {
  // State management
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);
  const [mealQuantities, setMealQuantities] = useState<{
    [key: number]: number;
  }>({});
  const [shoppingList, setShoppingList] = useState<Ingredient[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleMealSelect = (meal: Meal) => {
    if (selectedMeals.includes(meal)) {
      setSelectedMeals(selectedMeals.filter((m) => m.id !== meal.id));
      setMealQuantities((prev) => {
        const updatedQuantities = { ...prev };
        delete updatedQuantities[meal.id];
        return updatedQuantities;
      });
    } else {
      setSelectedMeals([...selectedMeals, meal]);
      setMealQuantities((prev) => ({ ...prev, [meal.id]: 1 }));
    }
  };

  const incrementQuantity = (mealId: number) => {
    setMealQuantities((prev) => ({
      ...prev,
      [mealId]: prev[mealId] + 1,
    }));
  };

  const decrementQuantity = (mealId: number) => {
    setMealQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[mealId];

      if (currentQuantity === 1) {
        setSelectedMeals((prevSelected) =>
          prevSelected.filter((meal) => meal.id !== mealId)
        );
        return {
          ...prevQuantities,
          [mealId]: 0,
        };
      }

      return {
        ...prevQuantities,
        [mealId]: currentQuantity - 1,
      };
    });
  };

  const generateShoppingList = () => {
    const list: {
      [key: string]: {
        name: string;
        quantity: string;
        amount: number;
        unit: string;
      };
    } = {};

    selectedMeals.forEach((meal) => {
      const quantityMultiplier = mealQuantities[meal.id] || 1;
      meal.ingredients.forEach((ingredient) => {
        const match = ingredient.quantity.match(/(\d+)(\s*)([a-zA-Z]*)/);
        const parsedAmount = match ? parseFloat(match[1]) : 0;
        const unit = match && match[3] ? match[3] : "";

        if (list[ingredient.name]) {
          list[ingredient.name].amount += parsedAmount * quantityMultiplier;
        } else {
          list[ingredient.name] = {
            name: ingredient.name,
            quantity: ingredient.quantity,
            amount: parsedAmount * quantityMultiplier,
            unit,
          };
        }
      });
    });

    const sortedList = Object.values(list).sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setShoppingList(
      sortedList.map((item) => ({
        name: item.name,
        quantity: `${item.amount} ${item.unit}`,
      }))
    );

    setModalOpen(true);
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 10;
    const columnWidth = (pageWidth - 2 * margin) / 3;

    pdf.setFontSize(10);
    pdf.text("Shopping List", margin, 20);

    let xOffset = margin;
    let yOffset = 30;
    let columnCount = 0;

    shoppingList.forEach((item, _index) => {
      if (columnCount < 3) {
        pdf.text(`${item.name}: ${item.quantity}`, xOffset, yOffset);
        xOffset += columnWidth;
        columnCount++;
      }

      if (columnCount === 3) {
        columnCount = 0;
        xOffset = margin;
        yOffset += 10;
      }
    });

    pdf.save("shopping-list.pdf");
  };

  const clearSelection = () => {
    setSelectedMeals([]);
    setMealQuantities({});
  };

  return (
    <DefaultLayout isModalOpen={isModalOpen}>
      <Breadcrumb pageName="Lista de Compras" />
      <div className="p-4 overflow-hidden rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4 lg:grid-cols-4">
          {mealsData.map((meal) => (
            <div
              key={meal.id}
              className={`h-16 p-4 border rounded-xl cursor-pointer flex justify-between items-center ${
                selectedMeals.includes(meal)
                  ? "bg-blue-100 dark:bg-blue-100 dark:text-neutral-600"
                  : ""
              }`}
              onClick={() => handleMealSelect(meal)}
            >
              <h3 className="text-sm font-medium">{meal.name}</h3>

              {selectedMeals.includes(meal) && (
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent deselection
                      decrementQuantity(meal.id);
                    }}
                    className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="mx-1 px-2 py-1 bg-gray-100 text-gray-800">
                    {mealQuantities[meal.id]}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent deselection
                      incrementQuantity(meal.id);
                    }}
                    className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={clearSelection}
            className="flex items-center px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <FiTrash2 className="mr-2" />
            Limpar Seleção
          </button>
          <button
            onClick={generateShoppingList}
            className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <FiList className="mr-2" />
            Gerar Lista de Compras
          </button>
        </div>

        <GroceryModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          shoppingList={shoppingList}
          generatePDF={generatePDF}
        />
      </div>
    </DefaultLayout>
  );
};

export default ShoppingList;
