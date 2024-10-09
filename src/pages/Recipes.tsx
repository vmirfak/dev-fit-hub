import { useState } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLoayout";
import CheckboxTwo from "../components/Checkboxes/CheckboxTwo";

interface Recipe {
  id: number;
  recipeName: string;
  ingredients: { name: string; quantity: string }[];
  filters: {
    glutenFree: boolean;
    vegan: boolean;
    dairyFree: boolean;
    lowCarb: boolean;
    highProtein: boolean;
    quickPrep: boolean;
  };
}

const initialRecipes: Recipe[] = [
  {
    id: 1,
    recipeName: "Quinoa Salad",
    ingredients: [
      { name: "Quinoa", quantity: "1 cup" },
      { name: "Cucumber", quantity: "1/2" },
      { name: "Tomato", quantity: "1" },
      { name: "Olive Oil", quantity: "2 tbsp" },
    ],
    filters: {
      glutenFree: true,
      vegan: true,
      dairyFree: true,
      lowCarb: false,
      highProtein: true,
      quickPrep: true,
    },
  },
  {
    id: 2,
    recipeName: "Chicken Stir Fry",
    ingredients: [
      { name: "Chicken Breast", quantity: "200g" },
      { name: "Broccoli", quantity: "1 cup" },
      { name: "Bell Pepper", quantity: "1" },
      { name: "Soy Sauce", quantity: "2 tbsp" },
    ],
    filters: {
      glutenFree: false,
      vegan: false,
      dairyFree: true,
      lowCarb: false,
      highProtein: true,
      quickPrep: false,
    },
  },
  {
    id: 3,
    recipeName: "Vegetable Soup",
    ingredients: [
      { name: "Carrots", quantity: "2" },
      { name: "Celery", quantity: "2 stalks" },
      { name: "Onion", quantity: "1" },
      { name: "Vegetable Broth", quantity: "4 cups" },
    ],
    filters: {
      glutenFree: true,
      vegan: true,
      dairyFree: true,
      lowCarb: true,
      highProtein: false,
      quickPrep: true,
    },
  },
  {
    id: 4,
    recipeName: "Beef Tacos",
    ingredients: [
      { name: "Ground Beef", quantity: "300g" },
      { name: "Taco Shells", quantity: "6" },
      { name: "Lettuce", quantity: "1 cup" },
      { name: "Cheese", quantity: "1/2 cup" },
    ],
    filters: {
      glutenFree: false,
      vegan: false,
      dairyFree: false,
      lowCarb: false,
      highProtein: true,
      quickPrep: false,
    },
  },
  {
    id: 5,
    recipeName: "Pasta Primavera",
    ingredients: [
      { name: "Pasta", quantity: "200g" },
      { name: "Mixed Vegetables", quantity: "1 cup" },
      { name: "Olive Oil", quantity: "2 tbsp" },
      { name: "Parmesan Cheese", quantity: "1/4 cup" },
    ],
    filters: {
      glutenFree: false,
      vegan: false,
      dairyFree: false,
      lowCarb: false,
      highProtein: false,
      quickPrep: true,
    },
  },
  {
    id: 6,
    recipeName: "Grilled Chicken Salad",
    ingredients: [
      { name: "Chicken Breast", quantity: "300g" },
      { name: "Lettuce", quantity: "1 bunch" },
      { name: "Tomato", quantity: "2" },
      { name: "Olive Oil", quantity: "2 tbsp" },
    ],
    filters: {
      glutenFree: true,
      vegan: false,
      dairyFree: true,
      lowCarb: true,
      highProtein: true,
      quickPrep: true,
    },
  },
  {
    id: 7,
    recipeName: "Spaghetti Bolognese",
    ingredients: [
      { name: "Spaghetti", quantity: "200g" },
      { name: "Ground Beef", quantity: "250g" },
      { name: "Tomato Sauce", quantity: "1 cup" },
      { name: "Garlic", quantity: "3 cloves" },
    ],
    filters: {
      glutenFree: false,
      vegan: false,
      dairyFree: false,
      lowCarb: false,
      highProtein: true,
      quickPrep: false,
    },
  },
  {
    id: 8,
    recipeName: "Vegetable Curry",
    ingredients: [
      { name: "Potatoes", quantity: "3" },
      { name: "Carrots", quantity: "2" },
      { name: "Coconut Milk", quantity: "1 can" },
      { name: "Curry Powder", quantity: "2 tbsp" },
    ],
    filters: {
      glutenFree: true,
      vegan: true,
      dairyFree: true,
      lowCarb: false,
      highProtein: false,
      quickPrep: false,
    },
  },
  {
    id: 9,
    recipeName: "Shrimp Alfredo Pasta",
    ingredients: [
      { name: "Shrimp", quantity: "250g" },
      { name: "Pasta", quantity: "200g" },
      { name: "Heavy Cream", quantity: "1 cup" },
      { name: "Parmesan Cheese", quantity: "1/2 cup" },
    ],
    filters: {
      glutenFree: false,
      vegan: false,
      dairyFree: false,
      lowCarb: false,
      highProtein: true,
      quickPrep: false,
    },
  },
  {
    id: 10,
    recipeName: "Beef and Broccoli Stir Fry",
    ingredients: [
      { name: "Beef Strips", quantity: "300g" },
      { name: "Broccoli", quantity: "1 head" },
      { name: "Soy Sauce", quantity: "2 tbsp" },
      { name: "Garlic", quantity: "3 cloves" },
    ],
    filters: {
      glutenFree: true,
      vegan: false,
      dairyFree: true,
      lowCarb: false,
      highProtein: true,
      quickPrep: false,
    },
  },
  {
    id: 11,
    recipeName: "Avocado Toast",
    ingredients: [
      { name: "Bread", quantity: "2 slices" },
      { name: "Avocado", quantity: "1" },
      { name: "Lemon Juice", quantity: "1 tbsp" },
      { name: "Chili Flakes", quantity: "1 tsp" },
    ],
    filters: {
      glutenFree: false,
      vegan: true,
      dairyFree: true,
      lowCarb: false,
      highProtein: false,
      quickPrep: true,
    },
  },
  {
    id: 12,
    recipeName: "Egg Fried Rice",
    ingredients: [
      { name: "Rice", quantity: "2 cups" },
      { name: "Eggs", quantity: "2" },
      { name: "Peas", quantity: "1/2 cup" },
      { name: "Soy Sauce", quantity: "2 tbsp" },
    ],
    filters: {
      glutenFree: false,
      vegan: false,
      dairyFree: true,
      lowCarb: false,
      highProtein: false,
      quickPrep: true,
    },
  },
  {
    id: 13,
    recipeName: "Caprese Salad",
    ingredients: [
      { name: "Tomatoes", quantity: "2" },
      { name: "Mozzarella Cheese", quantity: "150g" },
      { name: "Basil", quantity: "1 bunch" },
      { name: "Balsamic Vinegar", quantity: "1 tbsp" },
    ],
    filters: {
      glutenFree: true,
      vegan: false,
      dairyFree: false,
      lowCarb: true,
      highProtein: false,
      quickPrep: true,
    },
  },
  {
    id: 14,
    recipeName: "Pasta Salad",
    ingredients: [
      { name: "Pasta", quantity: "200g" },
      { name: "Olives", quantity: "1/2 cup" },
      { name: "Feta Cheese", quantity: "100g" },
      { name: "Cherry Tomatoes", quantity: "1 cup" },
    ],
    filters: {
      glutenFree: false,
      vegan: false,
      dairyFree: false,
      lowCarb: false,
      highProtein: false,
      quickPrep: true,
    },
  },
  {
    id: 15,
    recipeName: "Chickpea Stew",
    ingredients: [
      { name: "Chickpeas", quantity: "2 cups" },
      { name: "Spinach", quantity: "2 cups" },
      { name: "Onion", quantity: "1" },
      { name: "Canned Tomatoes", quantity: "1 can" },
    ],
    filters: {
      glutenFree: true,
      vegan: true,
      dairyFree: true,
      lowCarb: false,
      highProtein: true,
      quickPrep: false,
    },
  },
  {
    id: 16,
    recipeName: "Zucchini Noodles with Pesto",
    ingredients: [
      { name: "Zucchini", quantity: "2" },
      { name: "Pesto Sauce", quantity: "1/4 cup" },
      { name: "Cherry Tomatoes", quantity: "1/2 cup" },
      { name: "Parmesan Cheese", quantity: "2 tbsp" },
    ],
    filters: {
      glutenFree: true,
      vegan: false,
      dairyFree: false,
      lowCarb: true,
      highProtein: false,
      quickPrep: true,
    },
  },
  {
    id: 17,
    recipeName: "Stuffed Peppers",
    ingredients: [
      { name: "Bell Peppers", quantity: "4" },
      { name: "Ground Turkey", quantity: "300g" },
      { name: "Rice", quantity: "1 cup" },
      { name: "Tomato Sauce", quantity: "1 cup" },
    ],
    filters: {
      glutenFree: false,
      vegan: false,
      dairyFree: true,
      lowCarb: false,
      highProtein: true,
      quickPrep: false,
    },
  },
  {
    id: 18,
    recipeName: "Banana Oatmeal",
    ingredients: [
      { name: "Rolled Oats", quantity: "1 cup" },
      { name: "Banana", quantity: "1" },
      { name: "Milk", quantity: "1 cup" },
      { name: "Honey", quantity: "1 tbsp" },
    ],
    filters: {
      glutenFree: false,
      vegan: false,
      dairyFree: false,
      lowCarb: false,
      highProtein: false,
      quickPrep: true,
    },
  },
  {
    id: 19,
    recipeName: "Fish Tacos",
    ingredients: [
      { name: "White Fish", quantity: "300g" },
      { name: "Taco Shells", quantity: "6" },
      { name: "Cabbage", quantity: "1 cup" },
      { name: "Salsa", quantity: "1/2 cup" },
    ],
    filters: {
      glutenFree: false,
      vegan: false,
      dairyFree: true,
      lowCarb: false,
      highProtein: true,
      quickPrep: true,
    },
  },
  {
    id: 20,
    recipeName: "Mango Smoothie",
    ingredients: [
      { name: "Mango", quantity: "1" },
      { name: "Yogurt", quantity: "1 cup" },
      { name: "Milk", quantity: "1/2 cup" },
      { name: "Honey", quantity: "1 tbsp" },
    ],
    filters: {
      glutenFree: true,
      vegan: false,
      dairyFree: false,
      lowCarb: false,
      highProtein: false,
      quickPrep: true,
    },
  },
  {
    id: 21,
    recipeName: "Sweet Potato Fries",
    ingredients: [
      { name: "Sweet Potatoes", quantity: "2" },
      { name: "Olive Oil", quantity: "2 tbsp" },
      { name: "Salt", quantity: "1 tsp" },
      { name: "Paprika", quantity: "1 tsp" },
    ],
    filters: {
      glutenFree: true,
      vegan: true,
      dairyFree: true,
      lowCarb: false,
      highProtein: false,
      quickPrep: true,
    },
  },
  {
    id: 22,
    recipeName: "Lentil Soup",
    ingredients: [
      { name: "Lentils", quantity: "1 cup" },
      { name: "Carrots", quantity: "2" },
      { name: "Celery", quantity: "2 stalks" },
      { name: "Vegetable Broth", quantity: "4 cups" },
    ],
    filters: {
      glutenFree: true,
      vegan: true,
      dairyFree: true,
      lowCarb: false,
      highProtein: true,
      quickPrep: false,
    },
  },
  {
    id: 23,
    recipeName: "Peanut Butter Banana Smoothie",
    ingredients: [
      { name: "Banana", quantity: "1" },
      { name: "Peanut Butter", quantity: "2 tbsp" },
      { name: "Milk", quantity: "1 cup" },
      { name: "Honey", quantity: "1 tbsp" },
    ],
    filters: {
      glutenFree: true,
      vegan: false,
      dairyFree: false,
      lowCarb: false,
      highProtein: true,
      quickPrep: true,
    },
  },
  {
    id: 24,
    recipeName: "Greek Yogurt Parfait",
    ingredients: [
      { name: "Greek Yogurt", quantity: "1 cup" },
      { name: "Granola", quantity: "1/2 cup" },
      { name: "Mixed Berries", quantity: "1 cup" },
      { name: "Honey", quantity: "1 tbsp" },
    ],
    filters: {
      glutenFree: false,
      vegan: false,
      dairyFree: false,
      lowCarb: false,
      highProtein: true,
      quickPrep: true,
    },
  },
  {
    id: 25,
    recipeName: "Oven-Baked Salmon",
    ingredients: [
      { name: "Salmon Fillet", quantity: "300g" },
      { name: "Lemon", quantity: "1" },
      { name: "Olive Oil", quantity: "2 tbsp" },
      { name: "Garlic", quantity: "2 cloves" },
    ],
    filters: {
      glutenFree: true,
      vegan: false,
      dairyFree: true,
      lowCarb: true,
      highProtein: true,
      quickPrep: false,
    },
  },
  {
    id: 26,
    recipeName: "Chia Seed Pudding",
    ingredients: [
      { name: "Chia Seeds", quantity: "1/4 cup" },
      { name: "Milk", quantity: "1 cup" },
      { name: "Vanilla Extract", quantity: "1 tsp" },
      { name: "Honey", quantity: "1 tbsp" },
    ],
    filters: {
      glutenFree: true,
      vegan: true,
      dairyFree: true,
      lowCarb: false,
      highProtein: true,
      quickPrep: true,
    },
  },
];

const Recipes = () => {
  const [isOpen] = useState(false);
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    glutenFree: false,
    vegan: false,
    dairyFree: false,
    lowCarb: false,
    highProtein: false,
    quickPrep: false,
  });

  const toggleRecipeExpansion = (id: number) => {
    setExpandedRecipe(expandedRecipe === id ? null : id);
  };

  const toggleFilter = (filterName: keyof typeof filters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const filteredRecipes = initialRecipes.filter((recipe) => {
    const recipeFilters = recipe.filters;
    return (
      (!filters.glutenFree || recipeFilters.glutenFree) &&
      (!filters.vegan || recipeFilters.vegan) &&
      (!filters.dairyFree || recipeFilters.dairyFree) &&
      (!filters.lowCarb || recipeFilters.lowCarb) &&
      (!filters.highProtein || recipeFilters.highProtein) &&
      (!filters.quickPrep || recipeFilters.quickPrep)
    );
  });

  return (
    <DefaultLayout isModalOpen={isOpen}>
      <Breadcrumb pageName="Recipes" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Filters</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <CheckboxTwo
              label="Gluten-Free"
              checked={filters.glutenFree}
              onChange={() => toggleFilter("glutenFree")}
            />
            <CheckboxTwo
              label="Vegan"
              checked={filters.vegan}
              onChange={() => toggleFilter("vegan")}
            />
            <CheckboxTwo
              label="Dairy-Free"
              checked={filters.dairyFree}
              onChange={() => toggleFilter("dairyFree")}
            />
            <CheckboxTwo
              label="Low-Carb"
              checked={filters.lowCarb}
              onChange={() => toggleFilter("lowCarb")}
            />
            <CheckboxTwo
              label="High-Protein"
              checked={filters.highProtein}
              onChange={() => toggleFilter("highProtein")}
            />
            <CheckboxTwo
              label="Quick Prep"
              checked={filters.quickPrep}
              onChange={() => toggleFilter("quickPrep")}
            />
          </div>
        </div>

        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="mb-6">
            <div
              className="flex justify-between items-center p-4 bg-blue-100 dark:bg-gray-800 cursor-pointer rounded-lg"
              onClick={() => toggleRecipeExpansion(recipe.id)}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-neutral-600">
                {recipe.recipeName}
              </h3>
              <span className="text-2xl">
                {expandedRecipe === recipe.id ? "-" : "+"}
              </span>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedRecipe === recipe.id
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">
                  Ingredients
                </h4>
                <ul className="list-disc pl-5">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      {ingredient.name}: {ingredient.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Recipes;
