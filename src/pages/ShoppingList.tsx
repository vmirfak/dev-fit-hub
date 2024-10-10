import { useState } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLoayout";
import { jsPDF } from "jspdf";
import GroceryModal from "../components/Modal/GroceryModal";
import { FiMinus, FiPlus } from "react-icons/fi";

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
    name: "Grilled Chicken Salad",
    ingredients: [
      { name: "Chicken Breast", quantity: "300g" },
      { name: "Lettuce", quantity: "1 bunch" },
      { name: "Tomato", quantity: "2 pcs" },
      { name: "Olive Oil", quantity: "2 tbsp" },
    ],
  },
  {
    id: 2,
    name: "Spaghetti Bolognese",
    ingredients: [
      { name: "Spaghetti", quantity: "200g" },
      { name: "Ground Beef", quantity: "250g" },
      { name: "Tomato Sauce", quantity: "1 cup" },
      { name: "Garlic", quantity: "3 cloves" },
    ],
  },
  {
    id: 3,
    name: "Chicken Stir Fry",
    ingredients: [
      { name: "Chicken Breast", quantity: "300g" },
      { name: "Bell Peppers", quantity: "2 pcs" },
      { name: "Onion", quantity: "1 pc" },
      { name: "Soy Sauce", quantity: "3 tbsp" },
    ],
  },
  {
    id: 4,
    name: "Vegetable Curry",
    ingredients: [
      { name: "Potatoes", quantity: "3 pcs" },
      { name: "Carrots", quantity: "2 pcs" },
      { name: "Coconut Milk", quantity: "1 can" },
      { name: "Curry Powder", quantity: "2 tbsp" },
    ],
  },
  {
    id: 5,
    name: "Beef Tacos",
    ingredients: [
      { name: "Ground Beef", quantity: "200 g" },
      { name: "Taco Shells", quantity: "8 pcs" },
      { name: "Lettuce", quantity: "1 bunch" },
      { name: "Cheddar Cheese", quantity: "100g" },
    ],
  },
  {
    id: 6,
    name: "Pancakes with Berries",
    ingredients: [
      { name: "All-purpose Flour", quantity: "1 cup" },
      { name: "Milk", quantity: "1 cup" },
      { name: "Eggs", quantity: "2 pcs" },
      { name: "Mixed Berries", quantity: "1 cup" },
    ],
  },
  {
    id: 7,
    name: "Quinoa Salad",
    ingredients: [
      { name: "Quinoa", quantity: "1 cup" },
      { name: "Cucumber", quantity: "1 pc" },
      { name: "Cherry Tomatoes", quantity: "1 cup" },
      { name: "Feta Cheese", quantity: "100g" },
    ],
  },
  {
    id: 8,
    name: "Shrimp Alfredo Pasta",
    ingredients: [
      { name: "Shrimp", quantity: "250 g" },
      { name: "Pasta", quantity: "200 g" },
      { name: "Heavy Cream", quantity: "1 cup" },
      { name: "Parmesan Cheese", quantity: "1/2 cup" },
    ],
  },
  {
    id: 9,
    name: "Beef and Broccoli Stir Fry",
    ingredients: [
      { name: "Beef Strips", quantity: "300g" },
      { name: "Broccoli", quantity: "1 head" },
      { name: "Soy Sauce", quantity: "2 tbsp" },
      { name: "Garlic", quantity: "3 cloves" },
    ],
  },
  {
    id: 10,
    name: "Avocado Toast",
    ingredients: [
      { name: "Bread", quantity: "2 slices" },
      { name: "Avocado", quantity: "1 pc" },
      { name: "Lemon Juice", quantity: "1 tbsp" },
      { name: "Chili Flakes", quantity: "1 tsp" },
    ],
  },
  {
    id: 11,
    name: "Caprese Salad",
    ingredients: [
      { name: "Fresh Mozzarella", quantity: "250g" },
      { name: "Tomatoes", quantity: "3 pcs" },
      { name: "Basil", quantity: "1 bunch" },
      { name: "Balsamic Vinegar", quantity: "2 tbsp" },
    ],
  },
  {
    id: 12,
    name: "Stuffed Bell Peppers",
    ingredients: [
      { name: "Bell Peppers", quantity: "4 pcs" },
      { name: "Quinoa", quantity: "1 cup" },
      { name: "Black Beans", quantity: "1 can" },
      { name: "Cheddar Cheese", quantity: "100g" },
    ],
  },
  {
    id: 13,
    name: "Chicken Tikka Masala",
    ingredients: [
      { name: "Chicken Breast", quantity: "500g" },
      { name: "Yogurt", quantity: "1 cup" },
      { name: "Tikka Masala Paste", quantity: "2 tbsp" },
      { name: "Coconut Milk", quantity: "1 cup" },
    ],
  },
  {
    id: 14,
    name: "Vegetable Stir Fry",
    ingredients: [
      { name: "Mixed Vegetables", quantity: "300g" },
      { name: "Soy Sauce", quantity: "2 tbsp" },
      { name: "Garlic", quantity: "2 cloves" },
      { name: "Sesame Oil", quantity: "1 tbsp" },
    ],
  },
  {
    id: 15,
    name: "Omelette",
    ingredients: [
      { name: "Eggs", quantity: "3 pcs" },
      { name: "Spinach", quantity: "1 cup" },
      { name: "Feta Cheese", quantity: "50g" },
      { name: "Olive Oil", quantity: "1 tbsp" },
    ],
  },
  {
    id: 16,
    name: "Lentil Soup",
    ingredients: [
      { name: "Lentils", quantity: "1 cup" },
      { name: "Carrots", quantity: "2 pcs" },
      { name: "Onion", quantity: "1 pc" },
      { name: "Vegetable Broth", quantity: "4 cups" },
    ],
  },
  {
    id: 17,
    name: "Fish Tacos",
    ingredients: [
      { name: "White Fish", quantity: "300g" },
      { name: "Corn Tortillas", quantity: "8 pcs" },
      { name: "Cabbage", quantity: "1/2 head" },
      { name: "Sour Cream", quantity: "1/2 cup" },
    ],
  },
  {
    id: 18,
    name: "Chocolate Chip Cookies",
    ingredients: [
      { name: "All-purpose Flour", quantity: "2 cups" },
      { name: "Brown Sugar", quantity: "1 cup" },
      { name: "Butter", quantity: "1 cup" },
      { name: "Chocolate Chips", quantity: "1 cup" },
    ],
  },
  {
    id: 19,
    name: "Beef Stroganoff",
    ingredients: [
      { name: "Beef Strips", quantity: "400g" },
      { name: "Mushrooms", quantity: "200g" },
      { name: "Sour Cream", quantity: "1 cup" },
      { name: "Egg Noodles", quantity: "250g" },
    ],
  },
  {
    id: 20,
    name: "Eggplant Parmesan",
    ingredients: [
      { name: "Eggplant", quantity: "2 pcs" },
      { name: "Marinara Sauce", quantity: "2 cups" },
      { name: "Mozzarella Cheese", quantity: "200g" },
      { name: "Parmesan Cheese", quantity: "100g" },
    ],
  },
  {
    id: 21,
    name: "Caesar Salad",
    ingredients: [
      { name: "Romaine Lettuce", quantity: "1 head" },
      { name: "Caesar Dressing", quantity: "1/2 cup" },
      { name: "Croutons", quantity: "1 cup" },
      { name: "Parmesan Cheese", quantity: "50g" },
    ],
  },
  {
    id: 22,
    name: "Vegetable Quesadilla",
    ingredients: [
      { name: "Flour Tortillas", quantity: "4 pcs" },
      { name: "Mixed Vegetables", quantity: "2 cups" },
      { name: "Cheddar Cheese", quantity: "150g" },
      { name: "Sour Cream", quantity: "1/2 cup" },
    ],
  },
  {
    id: 23,
    name: "Pesto Pasta",
    ingredients: [
      { name: "Pasta", quantity: "250g" },
      { name: "Pesto Sauce", quantity: "1/2 cup" },
      { name: "Cherry Tomatoes", quantity: "1 cup" },
      { name: "Parmesan Cheese", quantity: "50g" },
    ],
  },
  {
    id: 24,
    name: "Honey Garlic Chicken",
    ingredients: [
      { name: "Chicken Thighs", quantity: "500g" },
      { name: "Honey", quantity: "1/4 cup" },
      { name: "Garlic", quantity: "4 cloves" },
      { name: "Soy Sauce", quantity: "1/4 cup" },
    ],
  },
  {
    id: 25,
    name: "Sweet Potato Fries",
    ingredients: [
      { name: "Sweet Potatoes", quantity: "2 pcs" },
      { name: "Olive Oil", quantity: "2 tbsp" },
      { name: "Paprika", quantity: "1 tsp" },
      { name: "Salt", quantity: "1 tsp" },
    ],
  },
  {
    id: 26,
    name: "Mango Smoothie",
    ingredients: [
      { name: "Mango", quantity: "1 pc" },
      { name: "Yogurt", quantity: "1 cup" },
      { name: "Milk", quantity: "1 cup" },
      { name: "Honey", quantity: "1 tbsp" },
    ],
  },
  {
    id: 27,
    name: "Greek Yogurt Parfait",
    ingredients: [
      { name: "Greek Yogurt", quantity: "1 cup" },
      { name: "Granola", quantity: "1/2 cup" },
      { name: "Mixed Berries", quantity: "1 cup" },
      { name: "Honey", quantity: "1 tbsp" },
    ],
  },
  {
    id: 28,
    name: "Spinach and Feta Stuffed Chicken",
    ingredients: [
      { name: "Chicken Breast", quantity: "4 pcs" },
      { name: "Spinach", quantity: "2 cups" },
      { name: "Feta Cheese", quantity: "100g" },
      { name: "Olive Oil", quantity: "2 tbsp" },
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

  return (
    <DefaultLayout isModalOpen={isModalOpen}>
      <Breadcrumb pageName="Shopping List" />
      <div className="p-4 overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Meal Selection Section */}
        <h2 className="text-xl font-bold mb-4">Select Meals for the Week</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4 lg:grid-cols-4">
          {mealsData.map((meal) => (
            <div
              key={meal.id}
              className={`p-4 border rounded-md cursor-pointer flex justify-between items-center ${
                selectedMeals.includes(meal)
                  ? "bg-blue-100 dark:bg-blue-100 dark:text-neutral-600"
                  : ""
              }`}
              onClick={() => handleMealSelect(meal)}
            >
              <h3 className="text-lg font-medium">{meal.name}</h3>

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

        {/* Generate Shopping List Button */}
        <button
          onClick={generateShoppingList}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
        >
          Generate Shopping List
        </button>

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
