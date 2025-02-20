import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLoayout";
import { useState } from "react";

const FoodPlans = () => {
  const [expandedMeal, setExpandedMeal] = useState<number | null>(null);
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);

  const meals = [
    {
        mealName: 'Refeição 1 - Pequeno-Almoço',
        recipes: [
            {
                recipeName: 'Aveia',
                macros: {
                    calories: '350 kcal',
                    protein: '10g',
                    carbs: '60g',
                    fat: '8g',
                },
                ingredients: [
                    { name: 'Flocos de Aveia', quantity: '100g' },
                    { name: 'Leite', quantity: '250ml' },
                    { name: 'Mel', quantity: '1 colher de sopa' },
                    { name: 'Banana', quantity: '1 média' },
                    { name: 'Canela', quantity: '1 colher de chá' },
                ],
            },
            {
                recipeName: 'Ovos Mexidos com Espinafre',
                macros: {
                    calories: '250 kcal',
                    protein: '18g',
                    carbs: '3g',
                    fat: '20g',
                },
                ingredients: [
                    { name: 'Ovos', quantity: '3 grandes' },
                    { name: 'Manteiga', quantity: '1 colher de sopa' },
                    { name: 'Espinafre', quantity: '50g' },
                    { name: 'Sal', quantity: 'a gosto' },
                    { name: 'Pimenta', quantity: 'a gosto' },
                ],
            },
            {
                recipeName: 'Panquecas de Banana',
                macros: {
                    calories: '320 kcal',
                    protein: '12g',
                    carbs: '50g',
                    fat: '8g',
                },
                ingredients: [
                    { name: 'Banana', quantity: '1 média' },
                    { name: 'Ovos', quantity: '2 unidades' },
                    { name: 'Aveia em Flocos', quantity: '50g' },
                    { name: 'Canela', quantity: 'a gosto' },
                    { name: 'Mel', quantity: '1 colher de chá' },
                ],
            },
            {
                recipeName: 'Tosta de Abacate com Ovo',
                macros: {
                    calories: '350 kcal',
                    protein: '14g',
                    carbs: '30g',
                    fat: '20g',
                },
                ingredients: [
                    { name: 'Pão Integral', quantity: '2 fatias' },
                    { name: 'Abacate', quantity: '1 médio' },
                    { name: 'Ovo', quantity: '1 grande' },
                    { name: 'Sal', quantity: 'a gosto' },
                    { name: 'Pimenta', quantity: 'a gosto' },
                ],
            },
        ],
    },
    {
        mealName: 'Refeição 2 - Lanche da Manhã',
        recipes: [
            {
                recipeName: 'Iogurte com Granola e Frutas',
                macros: {
                    calories: '250 kcal',
                    protein: '10g',
                    carbs: '35g',
                    fat: '8g',
                },
                ingredients: [
                    { name: 'Iogurte Natural', quantity: '200g' },
                    { name: 'Granola', quantity: '30g' },
                    { name: 'Frutas Vermelhas', quantity: '100g' },
                    { name: 'Mel', quantity: '1 colher de chá' },
                ],
            },
            {
                recipeName: 'Frutas com Amêndoas',
                macros: {
                    calories: '200 kcal',
                    protein: '5g',
                    carbs: '30g',
                    fat: '8g',
                },
                ingredients: [
                    { name: 'Maçã', quantity: '1 média' },
                    { name: 'Amêndoas', quantity: '30g' },
                ],
            },
            {
                recipeName: 'Bolo de Arroz com Abacate',
                macros: {
                    calories: '180 kcal',
                    protein: '3g',
                    carbs: '25g',
                    fat: '8g',
                },
                ingredients: [
                    { name: 'Bolo de Arroz', quantity: '2 unidades' },
                    { name: 'Abacate', quantity: '1/2 médio' },
                    { name: 'Sal', quantity: 'a gosto' },
                ],
            },
        ],
    },
    {
        mealName: 'Refeição 3 - Almoço',
        recipes: [
            {
                recipeName: 'Peito de Frango com Arroz Integral',
                macros: {
                    calories: '450 kcal',
                    protein: '35g',
                    carbs: '55g',
                    fat: '8g',
                },
                ingredients: [
                    { name: 'Peito de Frango', quantity: '150g' },
                    { name: 'Arroz Integral', quantity: '100g' },
                    { name: 'Brócolis', quantity: '100g' },
                ],
            },
            {
                recipeName: 'Salmão com Batata Doce',
                macros: {
                    calories: '500 kcal',
                    protein: '30g',
                    carbs: '45g',
                    fat: '20g',
                },
                ingredients: [
                    { name: 'Salmão', quantity: '150g' },
                    { name: 'Batata Doce', quantity: '200g' },
                    { name: 'Espargos', quantity: '100g' },
                ],
            },
        ],
    },
    {
        mealName: 'Refeição 4 - Lanche da Tarde',
        recipes: [
            {
                recipeName: 'Iogurte com Mel e Nozes',
                macros: {
                    calories: '200 kcal',
                    protein: '8g',
                    carbs: '20g',
                    fat: '10g',
                },
                ingredients: [
                    { name: 'Iogurte Natural', quantity: '150g' },
                    { name: 'Mel', quantity: '1 colher de chá' },
                    { name: 'Nozes', quantity: '20g' },
                ],
            },
            {
                recipeName: 'Sanduíche de Atum',
                macros: {
                    calories: '250 kcal',
                    protein: '15g',
                    carbs: '30g',
                    fat: '8g',
                },
                ingredients: [
                    { name: 'Pão Integral', quantity: '2 fatias' },
                    { name: 'Atum em Conserva', quantity: '100g' },
                    { name: 'Alface', quantity: 'a gosto' },
                    { name: 'Tomate', quantity: 'a gosto' },
                ],
            },
        ],
    },
    {
        mealName: 'Refeição 5 - Jantar',
        recipes: [
            {
                recipeName: 'Bife Grelhado com Salada',
                macros: {
                    calories: '400 kcal',
                    protein: '35g',
                    carbs: '10g',
                    fat: '20g',
                },
                ingredients: [
                    { name: 'Bife de Alcatra', quantity: '200g' },
                    { name: 'Salada Mista', quantity: 'a gosto' },
                    { name: 'Azeite', quantity: '1 colher de sopa' },
                ],
            },
            {
                recipeName: 'Omelete de Legumes',
                macros: {
                    calories: '250 kcal',
                    protein: '15g',
                    carbs: '5g',
                    fat: '18g',
                },
                ingredients: [
                    { name: 'Ovos', quantity: '3 unidades' },
                    { name: 'Tomate', quantity: '1 médio' },
                    { name: 'Espinafre', quantity: '50g' },
                    { name: 'Queijo', quantity: '30g' },
                ],
            },
        ],
    },
];

  const toggleMealExpansion = (mealIndex: number) => {
    setExpandedMeal(expandedMeal === mealIndex ? null : mealIndex);
  };

  const toggleRecipeExpansion = (recipeIndex: number) => {
    setExpandedRecipe(expandedRecipe === recipeIndex ? null : recipeIndex);
  };

  const [isOpen] = useState(false);

  return (
    <DefaultLayout isModalOpen={isOpen}>
      <Breadcrumb pageName="Meu Plano de Nutrição" />
      <div className="overflow-hidden rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
        {meals.map((meal, mealIndex) => (
          <div key={mealIndex} className="mb-6">
            <div
              className="flex justify-between items-center p-4 bg-blue-100 dark:bg-gray-800 cursor-pointer rounded-xl"
              onClick={() => toggleMealExpansion(mealIndex)}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-neutral-600">
                {meal.mealName}
              </h3>
              <span className="text-2xl">
                {expandedMeal === mealIndex ? "-" : "+"}
              </span>
            </div>

            <div
              className={`overflow-hidden transition-all duration-400 ease-in-out ${
                expandedMeal === mealIndex
                  ? "max-h-screen opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {expandedMeal === mealIndex && (
                <div>
                  {meal.recipes.map((recipe, recipeIndex) => (
                    <div key={recipeIndex}>
                      <div
                        className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 cursor-pointer rounded-lg"
                        onClick={() => toggleRecipeExpansion(recipeIndex)}
                      >
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                          Opção {recipeIndex + 1} - {recipe.recipeName}
                          <div className="text-sm text-gray-800 dark:text-gray-800 mt-1 flex gap-2">
                          <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-lg">
                              {recipe.macros.calories}
                            </span>
                            <span className="bg-green-200 text-green-800 px-2 py-1 rounded-lg">
                              P: {recipe.macros.protein}
                            </span>
                            <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-lg">
                              HC: {recipe.macros.carbs}
                            </span>
                            <span className="bg-red-200 text-red-800 px-2 py-1 rounded-lg">
                              G: {recipe.macros.fat}
                            </span>
                          </div>
                        </h4>

                        <span className="text-2xl">
                          {expandedRecipe === recipeIndex ? "-" : "+"}
                        </span>
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-400 ease-in-out ${
                          expandedRecipe === recipeIndex
                            ? "max-h-screen opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {expandedRecipe === recipeIndex && (
                          <div className="grid grid-cols-5 gap-4 p-4">
                            {recipe.ingredients.map((ingredient, index) => (
                              <div
                                key={index}
                                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center"
                              >
                                <span className="font-semibold">
                                  {ingredient.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {ingredient.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default FoodPlans;
