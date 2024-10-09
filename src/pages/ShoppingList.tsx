import { useState } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLoayout";

// Define types for ingredients and meals
interface Ingredient {
  name: string;
  quantity: string;
}

interface Meal {
  id: number;
  name: string;
  ingredients: Ingredient[];
}

// Mock data for meals
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
  ];

const ShoppingList = () => {
  // Define state with proper types
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);
  const [shoppingList, setShoppingList] = useState<Ingredient[]>([]);
  const [isOpen] = useState(false);

  // Handle meal selection
  const handleMealSelect = (meal: Meal) => {
    setSelectedMeals((prevSelected) =>
      prevSelected.includes(meal)
        ? prevSelected.filter((m) => m.id !== meal.id)
        : [...prevSelected, meal]
    );
  };

  // Generate shopping list based on selected meals
  const generateShoppingList = () => {
    const list: { [key: string]: { name: string; quantity: string; amount: number; unit: string } } = {};
  
    selectedMeals.forEach((meal) => {
      meal.ingredients.forEach((ingredient) => {
        // Use regex to separate numbers and unit
        const match = ingredient.quantity.match(/(\d+)(\s*)([a-zA-Z]*)/);
        const parsedAmount = match ? parseFloat(match[1]) : 0;
        const unit = match && match[3] ? match[3] : "";
  
        if (list[ingredient.name]) {
          list[ingredient.name].amount += parsedAmount;
        } else {
          list[ingredient.name] = {
            name: ingredient.name,
            quantity: ingredient.quantity,
            amount: parsedAmount,
            unit,
          };
        }
      });
    });
  
    setShoppingList(
      Object.values(list).map((item) => ({
        name: item.name,
        quantity: `${item.amount} ${item.unit}`,
      }))
    );
  };
  
  

  return (
    <DefaultLayout isModalOpen={isOpen}>
      <Breadcrumb pageName="Shopping List" />
      <div className="p-4 overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Meal Selection Section */}
        <h2 className="text-xl font-bold mb-4">Select Meals for the Week</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4 lg:grid-cols-4">
          {mealsData.map((meal) => (
            <div
              key={meal.id}
              className={`p-4 border rounded-md cursor-pointer ${
                selectedMeals.includes(meal)
                  ? "border-blue-500 bg-blue-100 dark:bg-blue-500 dark:text-zinc-700"
                  : "border-gray-300"
              }`}
              onClick={() => handleMealSelect(meal)}
            >
              <h3 className="text-lg font-medium">{meal.name}</h3>
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

        {/* Shopping List Display Section */}
        {shoppingList.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Your Shopping List</h2>
            <ul className="list-disc pl-5">
              {shoppingList.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ShoppingList;
