import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLoayout';
import { useState } from 'react';

const FoodPlans = () => {
  const [expandedMeal, setExpandedMeal] = useState<number | null>(null);
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);

  const meals = [
    {
        mealName: 'Refeição 1 - Pequeno-Almoço',
        recipes: [
            {
                recipeName: 'Aveia',
                ingredients: [
                    { name: 'Flocos de Aveia', quantity: '100g' },
                    { name: 'Leite', quantity: '250ml' },
                    { name: 'Mel', quantity: '1 colher de sopa' },
                    { name: 'Banana', quantity: '1 média' },
                    { name: 'Canela', quantity: '1 colher de chá' },
                ],
            },
            {
                recipeName: 'Ovos Mexidos',
                ingredients: [
                    { name: 'Ovos', quantity: '3 grandes' },
                    { name: 'Manteiga', quantity: '1 colher de sopa' },
                    { name: 'Sal', quantity: 'a gosto' },
                    { name: 'Pimenta', quantity: 'a gosto' },
                    { name: 'Espinafre', quantity: '50g' },
                ],
            },
            {
                recipeName: 'Parfait de Iogurte Grego',
                ingredients: [
                    { name: 'Iogurte Grego', quantity: '200g' },
                    { name: 'Granola', quantity: '50g' },
                    { name: 'Frutos Vermelhos Mistos', quantity: '100g' },
                    { name: 'Mel', quantity: '1 colher de sopa' },
                    { name: 'Sementes de Chia', quantity: '1 colher de sopa' },
                ],
            },
            {
                recipeName: 'Tigela de Smoothie',
                ingredients: [
                    { name: 'Frutos Vermelhos Congelados', quantity: '150g' },
                    { name: 'Banana', quantity: '1 média' },
                    { name: 'Leite de Amêndoa', quantity: '200ml' },
                    { name: 'Granola', quantity: '30g' },
                    { name: 'Flocos de Coco', quantity: '1 colher de sopa' },
                ],
            },
            {
                recipeName: 'Tosta de Abacate',
                ingredients: [
                    { name: 'Pão Integral', quantity: '2 fatias' },
                    { name: 'Abacate', quantity: '1 médio' },
                    { name: 'Sal', quantity: 'a gosto' },
                    { name: 'Pimenta', quantity: 'a gosto' },
                    { name: 'Tomates-Cereja', quantity: '5 unidades' },
                ],
            },
        ],
    },
    {
        mealName: 'Refeição 2 - Lanche da Manhã',
        recipes: [
            {
                recipeName: 'Salada de Fruta',
                ingredients: [
                    { name: 'Maçã', quantity: '1 média' },
                    { name: 'Banana', quantity: '1 média' },
                    { name: 'Laranja', quantity: '1 média' },
                    { name: 'Uvas', quantity: '100g' },
                    { name: 'Iogurte', quantity: '100g' },
                ],
            },
            {
                recipeName: 'Mistura de Frutos Secos',
                ingredients: [
                    { name: 'Amêndoas', quantity: '30g' },
                    { name: 'Nozes', quantity: '30g' },
                    { name: 'Anacardos', quantity: '30g' },
                    { name: 'Cranberries Secas', quantity: '20g' },
                    { name: 'Sementes de Abóbora', quantity: '20g' },
                ],
            },
            {
                recipeName: 'Bolos de Arroz com Manteiga de Amendoim',
                ingredients: [
                    { name: 'Bolos de Arroz', quantity: '2 unidades' },
                    { name: 'Manteiga de Amendoim', quantity: '2 colheres de sopa' },
                    { name: 'Fatias de Banana', quantity: '1 média' },
                    { name: 'Mel', quantity: '1 colher de chá' },
                    { name: 'Sementes de Chia', quantity: '1 colher de chá' },
                ],
            },
            {
                recipeName: 'Hummus e Legumes',
                ingredients: [
                    { name: 'Hummus', quantity: '100g' },
                    { name: 'Palitos de Cenoura', quantity: '100g' },
                    { name: 'Fatias de Pepino', quantity: '100g' },
                    { name: 'Tiras de Pimento', quantity: '100g' },
                    { name: 'Tomates-Cereja', quantity: '100g' },
                ],
            },
            {
                recipeName: 'Batido de Proteína',
                ingredients: [
                    { name: 'Pó de Proteína', quantity: '1 medida' },
                    { name: 'Leite ou Água', quantity: '300ml' },
                    { name: 'Banana', quantity: '1 média' },
                    { name: 'Manteiga de Amendoim', quantity: '1 colher de sopa' },
                    { name: 'Espinafre', quantity: '1 chávena' },
                ],
            },
        ],
    },
    {
        mealName: 'Refeição 3 - Almoço',
        recipes: [
            {
                recipeName: 'Salada de Frango Grelhado',
                ingredients: [
                    { name: 'Peito de Frango', quantity: '200g' },
                    { name: 'Mistura de Verduras', quantity: '100g' },
                    { name: 'Tomates-Cereja', quantity: '10 unidades' },
                    { name: 'Azeite', quantity: '2 colheres de sopa' },
                    { name: 'Vinagre Balsâmico', quantity: '1 colher de sopa' },
                ],
            },
            {
                recipeName: 'Salteado de Legumes',
                ingredients: [
                    { name: 'Brócolos', quantity: '150g' },
                    { name: 'Pimentos', quantity: '100g' },
                    { name: 'Cenouras', quantity: '100g' },
                    { name: 'Molho de Soja', quantity: '2 colheres de sopa' },
                    { name: 'Óleo de Sésamo', quantity: '1 colher de sopa' },
                ],
            },
            {
                recipeName: 'Pasta Primavera',
                ingredients: [
                    { name: 'Pasta', quantity: '200g' },
                    { name: 'Courgette', quantity: '1 média' },
                    { name: 'Tomates-Cereja', quantity: '10 unidades' },
                    { name: 'Queijo Parmesão', quantity: '50g' },
                    { name: 'Azeite', quantity: '2 colheres de sopa' },
                ],
            },
            {
                recipeName: 'Tigela de Quinoa',
                ingredients: [
                    { name: 'Quinoa', quantity: '150g' },
                    { name: 'Feijão Preto', quantity: '100g' },
                    { name: 'Milho', quantity: '50g' },
                    { name: 'Abacate', quantity: '1 médio' },
                    { name: 'Sumo de Lima', quantity: '2 colheres de sopa' },
                ],
            },
            {
                recipeName: 'Smoothie de Fruta',
                ingredients: [
                    { name: 'Banana', quantity: '1 média' },
                    { name: 'Frutos Vermelhos', quantity: '100g' },
                    { name: 'Iogurte Grego', quantity: '150g' },
                    { name: 'Mel', quantity: '1 colher de sopa' },
                    { name: 'Leite de Amêndoa', quantity: '200ml' },
                ],
            },
        ],
    },
    {
        mealName: 'Refeição 4 - Lanche da Tarde',
        recipes: [
            {
                recipeName: 'Palitos de Legumes e Hummus',
                ingredients: [
                    { name: 'Cenoura', quantity: '1 média' },
                    { name: 'Aipo', quantity: '1 talo' },
                    { name: 'Pepino', quantity: '1 médio' },
                    { name: 'Hummus', quantity: '100g' },
                    { name: 'Pimento', quantity: '1 médio' },
                ],
            },
            {
                recipeName: 'Iogurte com Mel',
                ingredients: [
                    { name: 'Iogurte', quantity: '150g' },
                    { name: 'Mel', quantity: '1 colher de sopa' },
                    { name: 'Amêndoas', quantity: '20g' },
                    { name: 'Sementes de Chia', quantity: '1 colher de sopa' },
                    { name: 'Canela', quantity: '1 colher de chá' },
                ],
            },
            {
                recipeName: 'Queijo e Biscoitos',
                ingredients: [
                    { name: 'Queijo', quantity: '100g' },
                    { name: 'Biscoitos Integrais', quantity: '5-6 unidades' },
                    { name: 'Fatias de Maçã', quantity: '1 média' },
                    { name: 'Nozes', quantity: '10 unidades' },
                    { name: 'Uvas', quantity: '100g' },
                ],
            },
            {
                recipeName: 'Bolachas de Arroz com Abacate',
                ingredients: [
                    { name: 'Bolachas de Arroz', quantity: '2 unidades' },
                    { name: 'Abacate', quantity: '1 pequeno' },
                    { name: 'Sal', quantity: 'a gosto' },
                    { name: 'Pimenta', quantity: 'a gosto' },
                    { name: 'Sementes de Sésamo', quantity: '1 colher de chá' },
                ],
            },
            {
                recipeName: 'Batido de Banana',
                ingredients: [
                    { name: 'Banana', quantity: '1 média' },
                    { name: 'Leite de Amêndoa', quantity: '200ml' },
                    { name: 'Manteiga de Amendoim', quantity: '1 colher de sopa' },
                    { name: 'Sementes de Linhaça', quantity: '1 colher de sopa' },
                    { name: 'Gelo', quantity: '1 chávena' },
                ],
            },
        ],
    },
    {
        mealName: 'Refeição 5 - Jantar',
        recipes: [
            {
                recipeName: 'Salmão Grelhado',
                ingredients: [
                    { name: 'Salmão', quantity: '200g' },
                    { name: 'Limão', quantity: '1 médio' },
                    { name: 'Aspargos', quantity: '100g' },
                    { name: 'Azeite', quantity: '1 colher de sopa' },
                    { name: 'Ervas Aromáticas', quantity: 'a gosto' },
                ],
            },
            {
                recipeName: 'Peito de Frango com Legumes Assados',
                ingredients: [
                    { name: 'Peito de Frango', quantity: '200g' },
                    { name: 'Batata-doce', quantity: '200g' },
                    { name: 'Brócolos', quantity: '100g' },
                    { name: 'Cebola', quantity: '1 média' },
                    { name: 'Azeite', quantity: '2 colheres de sopa' },
                ],
            },
            {
                recipeName: 'Strogonoff de Cogumelos',
                ingredients: [
                    { name: 'Cogumelos', quantity: '200g' },
                    { name: 'Natas', quantity: '100ml' },
                    { name: 'Cebola', quantity: '1 média' },
                    { name: 'Alho', quantity: '2 dentes' },
                    { name: 'Arroz', quantity: '150g' },
                ],
            },
            {
                recipeName: 'Taco de Carne Moída',
                ingredients: [
                    { name: 'Carne Moída', quantity: '200g' },
                    { name: 'Tortilhas', quantity: '2 unidades' },
                    { name: 'Alface', quantity: '50g' },
                    { name: 'Tomate', quantity: '1 médio' },
                    { name: 'Queijo Ralado', quantity: '50g' },
                ],
            },
            {
                recipeName: 'Sopa de Legumes',
                ingredients: [
                    { name: 'Cenoura', quantity: '1 média' },
                    { name: 'Batata', quantity: '1 média' },
                    { name: 'Cebola', quantity: '1 média' },
                    { name: 'Alho', quantity: '2 dentes' },
                    { name: 'Caldo de Legumes', quantity: '1 litro' },
                ],
            },
        ],
    },
    {
        mealName: 'Refeição 6 - Ceia',
        recipes: [
            {
                recipeName: 'Iogurte com Frutos Secos',
                ingredients: [
                    { name: 'Iogurte', quantity: '150g' },
                    { name: 'Frutos Secos', quantity: '30g' },
                    { name: 'Mel', quantity: '1 colher de chá' },
                    { name: 'Canela', quantity: '1 colher de chá' },
                    { name: 'Sementes de Chia', quantity: '1 colher de sopa' },
                ],
            },
            {
                recipeName: 'Queijo com Fruta',
                ingredients: [
                    { name: 'Queijo', quantity: '100g' },
                    { name: 'Maçã', quantity: '1 média' },
                    { name: 'Pêra', quantity: '1 média' },
                    { name: 'Nozes', quantity: '10 unidades' },
                    { name: 'Uvas', quantity: '100g' },
                ],
            },
            {
                recipeName: 'Batido de Proteína',
                ingredients: [
                    { name: 'Pó de Proteína', quantity: '1 medida' },
                    { name: 'Leite', quantity: '300ml' },
                    { name: 'Banana', quantity: '1 média' },
                    { name: 'Manteiga de Amendoim', quantity: '1 colher de sopa' },
                    { name: 'Espinafre', quantity: '1 chávena' },
                ],
            },
            {
                recipeName: 'Bolachas de Arroz com Abacate',
                ingredients: [
                    { name: 'Bolachas de Arroz', quantity: '2 unidades' },
                    { name: 'Abacate', quantity: '1 pequeno' },
                    { name: 'Sal', quantity: 'a gosto' },
                    { name: 'Pimenta', quantity: 'a gosto' },
                    { name: 'Sementes de Sésamo', quantity: '1 colher de chá' },
                ],
            },
            {
                recipeName: 'Frutos Secos e Fruta Fresca',
                ingredients: [
                    { name: 'Frutos Secos', quantity: '30g' },
                    { name: 'Fruta Fresca', quantity: '1 peça' },
                    { name: 'Iogurte', quantity: '100g' },
                    { name: 'Mel', quantity: '1 colher de chá' },
                    { name: 'Sementes de Chia', quantity: '1 colher de sopa' },
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
                {expandedMeal === mealIndex ? '-' : '+'}
              </span>
            </div>
  
            <div className={`overflow-hidden transition-all duration-400 ease-in-out ${
              expandedMeal === mealIndex ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}>
              {expandedMeal === mealIndex && (
                <div>
                  {meal.recipes.map((recipe, recipeIndex) => (
                    <div key={recipeIndex}>
                      <div
                        className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 cursor-pointer rounded-lg"
                        onClick={() => toggleRecipeExpansion(recipeIndex)}
                      >
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                          {recipe.recipeName}
                        </h4>
                        <span className="text-2xl">
                          {expandedRecipe === recipeIndex ? '-' : '+'}
                        </span>
                      </div>
  
                      <div
                      className={`overflow-hidden transition-all duration-400 ease-in-out ${
                        expandedRecipe === recipeIndex ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                        {expandedRecipe === recipeIndex && (
                          <div className="grid grid-cols-5 gap-4 p-4">
                            {recipe.ingredients.map((ingredient, index) => (
                              <div
                                key={index}
                                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center"
                              >
                                <span className="font-semibold">{ingredient.name}</span>
                                <span className="text-sm text-gray-500">{ingredient.quantity}</span>
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
