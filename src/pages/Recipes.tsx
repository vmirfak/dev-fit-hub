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
