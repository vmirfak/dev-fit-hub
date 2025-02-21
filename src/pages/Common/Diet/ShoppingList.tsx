import { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../layout/DefaultLoayout";
import { jsPDF } from "jspdf";
import GroceryModal from "../../../components/Modal/GroceryModal";
import { FiMinus, FiPlus, FiTrash2, FiList } from "react-icons/fi";

interface Ingredient {
  name: string;
  quantity: string;
}

interface Meal {
  id: number;
  name: string;
  category: string;
  ingredients: Ingredient[];
}

const mealsData: Meal[] = [
  {
    id: 1,
    name: "Salada de Frango Grelhado",
    category: "Almoço",
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
    category: "Almoço",
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
    category: "Jantar",
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
    category: "Jantar",
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
    category: "Jantar",
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
    category: "Pequeno Almoço",
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
    category: "Almoço",
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
    category: "Jantar",
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
    category: "Almoço",
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
    category: "Lanche da Manhã",
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
    category: "Lanche da Tarde",
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
    category: "Jantar",
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
    category: "Jantar",
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
    category: "Lanche da Tarde",
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
    category: "Ceia",
    ingredients: [
      { name: "Ovos", quantity: "3 unidades" },
      { name: "Espinafre", quantity: "1 chávena" },
      { name: "Queijo Feta", quantity: "50g" },
      { name: "Azeite", quantity: "1 colher de sopa" },
    ],
  },
  {
    id: 16,
    name: "Sopa de Abóbora",
    category: "Almoço",
    ingredients: [
      { name: "Abóbora", quantity: "500g" },
      { name: "Cebola", quantity: "1 unidade" },
      { name: "Alho", quantity: "2 dentes" },
      { name: "Caldo de Legumes", quantity: "1 litro" },
    ],
  },
  {
    id: 17,
    name: "Wrap de Frango e Abacate",
    category: "Lanche da Manhã",
    ingredients: [
      { name: "Tortilha", quantity: "1 unidade" },
      { name: "Peito de Frango", quantity: "150g" },
      { name: "Abacate", quantity: "1/2 unidade" },
      { name: "Iogurte Grego", quantity: "2 colheres de sopa" },
    ],
  },
  {
    id: 18,
    name: "Risoto de Cogumelos",
    category: "Jantar",
    ingredients: [
      { name: "Arroz Arbóreo", quantity: "200g" },
      { name: "Cogumelos", quantity: "300g" },
      { name: "Cebola", quantity: "1 unidade" },
      { name: "Caldo de Legumes", quantity: "1 litro" },
    ],
  },
  {
    id: 19,
    name: "Smoothie de Manga e Maracujá",
    category: "Lanche da Tarde",
    ingredients: [
      { name: "Manga", quantity: "1 unidade" },
      { name: "Maracujá", quantity: "2 unidades" },
      { name: "Iogurte Natural", quantity: "1 chávena" },
      { name: "Mel", quantity: "1 colher de sopa" },
    ],
  },
  {
    id: 20,
    name: "Bife de Peru Grelhado",
    category: "Jantar",
    ingredients: [
      { name: "Bife de Peru", quantity: "250g" },
      { name: "Batata Doce", quantity: "2 unidades" },
      { name: "Espargos", quantity: "1 molho" },
      { name: "Azeite", quantity: "2 colheres de sopa" },
    ],
  },
  {
    id: 21,
    name: "Tarte de Queijo e Espinafre",
    category: "Ceia",
    ingredients: [
      { name: "Massa Folhada", quantity: "1 folha" },
      { name: "Espinafre", quantity: "200g" },
      { name: "Queijo Ricotta", quantity: "150g" },
      { name: "Ovo", quantity: "1 unidade" },
    ],
  },
  {
    id: 22,
    name: "Cuscuz com Legumes",
    category: "Almoço",
    ingredients: [
      { name: "Cuscuz", quantity: "1 chávena" },
      { name: "Cenoura", quantity: "1 unidade" },
      { name: "Ervilhas", quantity: "1 chávena" },
      { name: "Azeite", quantity: "2 colheres de sopa" },
    ],
  },
  {
    id: 23,
    name: "Salada de Atum",
    category: "Lanche da Tarde",
    ingredients: [
      { name: "Atum em Conserva", quantity: "1 lata" },
      { name: "Milho", quantity: "1 chávena" },
      { name: "Feijão Vermelho", quantity: "1 chávena" },
      { name: "Cebola Roxa", quantity: "1/2 unidade" },
    ],
  },
  {
    id: 24,
    name: "Frango Assado com Batatas",
    category: "Jantar",
    ingredients: [
      { name: "Frango Inteiro", quantity: "1 unidade" },
      { name: "Batatas", quantity: "4 unidades" },
      { name: "Alecrim", quantity: "2 ramos" },
      { name: "Azeite", quantity: "3 colheres de sopa" },
    ],
  },
  {
    id: 25,
    name: "Pão de Banana",
    category: "Pequeno Almoço",
    ingredients: [
      { name: "Bananas Maduras", quantity: "3 unidades" },
      { name: "Farinha de Trigo", quantity: "2 chávenas" },
      { name: "Ovos", quantity: "2 unidades" },
      { name: "Açúcar", quantity: "1/2 chávena" },
    ],
  },
  {
    id: 26,
    name: "Salmão Grelhado com Brócolos",
    category: "Jantar",
    ingredients: [
      { name: "Salmão", quantity: "2 postas" },
      { name: "Brócolos", quantity: "1 cabeça" },
      { name: "Limão", quantity: "1 unidade" },
      { name: "Azeite", quantity: "2 colheres de sopa" },
    ],
  },
  {
    id: 27,
    name: "Pizza Caseira",
    category: "Jantar",
    ingredients: [
      { name: "Massa de Pizza", quantity: "1 unidade" },
      { name: "Molho de Tomate", quantity: "1 chávena" },
      { name: "Queijo Mozzarella", quantity: "200g" },
      { name: "Fiambre", quantity: "100g" },
    ],
  },
  {
    id: 28,
    name: "Bolo de Cenoura",
    category: "Sobremesa",
    ingredients: [
      { name: "Cenoura", quantity: "3 unidades" },
      { name: "Farinha de Trigo", quantity: "2 chávenas" },
      { name: "Ovos", quantity: "3 unidades" },
      { name: "Açúcar", quantity: "1 chávena" },
    ],
  },
  {
    id: 29,
    name: "Feijoada Vegetariana",
    category: "Almoço",
    ingredients: [
      { name: "Feijão Preto", quantity: "2 chávenas" },
      { name: "Abóbora", quantity: "200g" },
      { name: "Cenoura", quantity: "2 unidades" },
      { name: "Tomate", quantity: "2 unidades" },
    ],
  },
  {
    id: 30,
    name: "Sanduíche de Peru e Queijo",
    category: "Lanche da Manhã",
    ingredients: [
      { name: "Pão Integral", quantity: "2 fatias" },
      { name: "Peito de Peru", quantity: "100g" },
      { name: "Queijo Suíço", quantity: "2 fatias" },
      { name: "Mostarda", quantity: "1 colher de chá" },
    ],
  },
  {
    id: 31,
    name: "Lasanha de Vegetais",
    category: "Jantar",
    ingredients: [
      { name: "Massa de Lasanha", quantity: "200g" },
      { name: "Beringela", quantity: "1 unidade" },
      { name: "Abobrinha", quantity: "1 unidade" },
      { name: "Molho de Tomate", quantity: "2 chávenas" },
    ],
  },
  {
    id: 32,
    name: "Tarte de Maçã",
    category: "Sobremesa",
    ingredients: [
      { name: "Maçãs", quantity: "4 unidades" },
      { name: "Massa Folhada", quantity: "1 folha" },
      { name: "Açúcar", quantity: "1/2 chávena" },
      { name: "Canela", quantity: "1 colher de chá" },
    ],
  },
  {
    id: 33,
    name: "Hambúrguer de Quinoa",
    category: "Jantar",
    ingredients: [
      { name: "Quinoa", quantity: "1 chávena" },
      { name: "Feijão Preto", quantity: "1 chávena" },
      { name: "Cebola", quantity: "1/2 unidade" },
      { name: "Pão de Hambúrguer", quantity: "2 unidades" },
    ],
  },
  {
    id: 34,
    name: "Sopa de Lentilhas",
    category: "Almoço",
    ingredients: [
      { name: "Lentilhas", quantity: "1 chávena" },
      { name: "Cenoura", quantity: "2 unidades" },
      { name: "Cebola", quantity: "1 unidade" },
      { name: "Alho", quantity: "2 dentes" },
    ],
  },
  {
    id: 35,
    name: "Bolo de Chocolate",
    category: "Sobremesa",
    ingredients: [
      { name: "Farinha de Trigo", quantity: "2 chávenas" },
      { name: "Cacau em Pó", quantity: "1/2 chávena" },
      { name: "Ovos", quantity: "3 unidades" },
      { name: "Açúcar", quantity: "1 chávena" },
    ],
  },
  {
    id: 36,
    name: "Salada de Grão-de-Bico",
    category: "Almoço",
    ingredients: [
      { name: "Grão-de-Bico", quantity: "1 chávena" },
      { name: "Tomate", quantity: "2 unidades" },
      { name: "Pepino", quantity: "1 unidade" },
      { name: "Azeite", quantity: "2 colheres de sopa" },
    ],
  },
  {
    id: 37,
    name: "Frango à Parmegiana",
    category: "Jantar",
    ingredients: [
      { name: "Peito de Frango", quantity: "2 unidades" },
      { name: "Molho de Tomate", quantity: "1 chávena" },
      { name: "Queijo Mozzarella", quantity: "200g" },
      { name: "Farinha de Rosca", quantity: "1 chávena" },
    ],
  },
  {
    id: 38,
    name: "Smoothie de Banana e Aveia",
    category: "Pequeno Almoço",
    ingredients: [
      { name: "Banana", quantity: "2 unidades" },
      { name: "Aveia", quantity: "1/2 chávena" },
      { name: "Leite", quantity: "1 chávena" },
      { name: "Mel", quantity: "1 colher de sopa" },
    ],
  },
  {
    id: 39,
    name: "Ratatouille",
    category: "Jantar",
    ingredients: [
      { name: "Beringela", quantity: "1 unidade" },
      { name: "Abobrinha", quantity: "1 unidade" },
      { name: "Tomate", quantity: "2 unidades" },
      { name: "Pimentos", quantity: "2 unidades" },
    ],
  },
  {
    id: 40,
    name: "Pudim de Chia",
    category: "Sobremesa",
    ingredients: [
      { name: "Sementes de Chia", quantity: "1/4 chávena" },
      { name: "Leite de Coco", quantity: "1 chávena" },
      { name: "Mel", quantity: "1 colher de sopa" },
      { name: "Frutos Vermelhos", quantity: "1/2 chávena" },
    ],
  },
];

const ShoppingList = () => {
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

  const categorizedMeals = mealsData.reduce((acc, meal) => {
    if (!acc[meal.category]) {
      acc[meal.category] = [];
    }
    acc[meal.category].push(meal);
    return acc;
  }, {} as Record<string, Meal[]>);

  const generatePDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 10;
    const columnWidth = (pageWidth - 2 * margin) / 3;

    pdf.setFontSize(10);
    pdf.text("Lista de Compras: ", margin, 20);

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
        {Object.entries(categorizedMeals).map(([category, meals]) => (
          <div key={category} className="mb-4">
            <h3 className="text-base font-bold mb-2 text-gray-800 dark:text-white">
              {category}
            </h3>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-4 lg:grid-cols-4">
              {meals.map((meal) => (
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
                          e.stopPropagation();
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
                          e.stopPropagation();
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
          </div>
        ))}
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
            disabled={selectedMeals.length === 0}
            className={`flex items-center px-6 py-2 rounded-md transition-colors ${
              selectedMeals.length > 0
                ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
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
