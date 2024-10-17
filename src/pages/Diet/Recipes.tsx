import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLoayout";
import CheckboxTwo from "../../components/Checkboxes/CheckboxTwo";

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
    recipeName: "Salada de Quinoa",
    ingredients: [
      { name: "Quinoa", quantity: "1 chávena" },
      { name: "Pepino", quantity: "1/2" },
      { name: "Tomate", quantity: "1" },
      { name: "Azeite", quantity: "2 colheres de sopa" },
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
    recipeName: "Frango Salteado",
    ingredients: [
      { name: "Peito de Frango", quantity: "200g" },
      { name: "Brócolos", quantity: "1 chávena" },
      { name: "Pimento", quantity: "1" },
      { name: "Molho de Soja", quantity: "2 colheres de sopa" },
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
    recipeName: "Sopa de Legumes",
    ingredients: [
      { name: "Cenouras", quantity: "2" },
      { name: "Aipo", quantity: "2 talos" },
      { name: "Cebola", quantity: "1" },
      { name: "Caldo de Legumes", quantity: "4 chávenas" },
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
    recipeName: "Tacos de Carne de Vaca",
    ingredients: [
      { name: "Carne de Vaca Picada", quantity: "300g" },
      { name: "Tortilhas", quantity: "6" },
      { name: "Alface", quantity: "1 chávena" },
      { name: "Queijo", quantity: "1/2 chávena" },
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
      { name: "Massa", quantity: "200g" },
      { name: "Legumes Mistos", quantity: "1 chávena" },
      { name: "Azeite", quantity: "2 colheres de sopa" },
      { name: "Queijo Parmesão", quantity: "1/4 chávena" },
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
    recipeName: "Salada de Frango Grelhado",
    ingredients: [
      { name: "Peito de Frango", quantity: "300g" },
      { name: "Alface", quantity: "1 molho" },
      { name: "Tomate", quantity: "2" },
      { name: "Azeite", quantity: "2 colheres de sopa" },
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
    recipeName: "Espaguete à Bolonhesa",
    ingredients: [
      { name: "Espaguete", quantity: "200g" },
      { name: "Carne de Vaca Picada", quantity: "250g" },
      { name: "Molho de Tomate", quantity: "1 chávena" },
      { name: "Alho", quantity: "3 dentes" },
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
    recipeName: "Caril de Legumes",
    ingredients: [
      { name: "Batatas", quantity: "3" },
      { name: "Cenouras", quantity: "2" },
      { name: "Leite de Coco", quantity: "1 lata" },
      { name: "Pó de Caril", quantity: "2 colheres de sopa" },
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
    recipeName: "Pasta Alfredo com Camarão",
    ingredients: [
      { name: "Camarão", quantity: "250g" },
      { name: "Massa", quantity: "200g" },
      { name: "Nata", quantity: "1 chávena" },
      { name: "Queijo Parmesão", quantity: "1/2 chávena" },
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
    recipeName: "Frango e Brócolos Salteados",
    ingredients: [
      { name: "Tiras de Carne de Vaca", quantity: "300g" },
      { name: "Brócolos", quantity: "1 cabeça" },
      { name: "Molho de Soja", quantity: "2 colheres de sopa" },
      { name: "Alho", quantity: "3 dentes" },
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
    recipeName: "Tosta de Abacate",
    ingredients: [
      { name: "Pão", quantity: "2 fatias" },
      { name: "Abacate", quantity: "1" },
      { name: "Sumo de Limão", quantity: "1 colher de sopa" },
      { name: "Flocos de Chili", quantity: "1 colher de chá" },
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
    recipeName: "Arroz Frito com Ovo",
    ingredients: [
      { name: "Arroz", quantity: "2 chávenas" },
      { name: "Ovos", quantity: "2" },
      { name: "Ervilhas", quantity: "1/2 chávena" },
      { name: "Molho de Soja", quantity: "2 colheres de sopa" },
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
    recipeName: "Salada Caprese",
    ingredients: [
      { name: "Tomates", quantity: "2" },
      { name: "Queijo Mozarela", quantity: "150g" },
      { name: "Manjericão", quantity: "1 molho" },
      { name: "Vinagre Balsâmico", quantity: "1 colher de sopa" },
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
    recipeName: "Salada de Massa",
    ingredients: [
      { name: "Massa", quantity: "200g" },
      { name: "Azeitonas", quantity: "1/2 chávena" },
      { name: "Queijo Feta", quantity: "100g" },
      { name: "Tomates Cereja", quantity: "1 chávena" },
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
    recipeName: "Guisado de Grão-de-Bico",
    ingredients: [
      { name: "Grão-de-Bico", quantity: "2 chávenas" },
      { name: "Espinafre", quantity: "2 chávenas" },
      { name: "Cebola", quantity: "1" },
      { name: "Alho", quantity: "3 dentes" },
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
    id: 16,
    recipeName: "Omelete de Espinafres",
    ingredients: [
      { name: "Ovos", quantity: "3" },
      { name: "Espinafres", quantity: "1 chávena" },
      { name: "Cebola", quantity: "1/2" },
      { name: "Queijo", quantity: "50g" },
    ],
    filters: {
      glutenFree: true,
      vegan: false,
      dairyFree: false,
      lowCarb: true,
      highProtein: true,
      quickPrep: true,
    },
  },
  {
    id: 17,
    recipeName: "Pudim de Chia",
    ingredients: [
      { name: "Sementes de Chia", quantity: "1/4 chávena" },
      { name: "Leite de Amêndoa", quantity: "1 chávena" },
      { name: "Mel", quantity: "1 colher de sopa" },
      { name: "Frutos Vermelhos", quantity: "1/2 chávena" },
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
    id: 18,
    recipeName: "Smoothie Verde",
    ingredients: [
      { name: "Espinafres", quantity: "1 chávena" },
      { name: "Banana", quantity: "1" },
      { name: "Leite de Amêndoa", quantity: "1 chávena" },
      { name: "Manteiga de Amendoim", quantity: "1 colher de sopa" },
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
    id: 19,
    recipeName: "Bowl de Açaí",
    ingredients: [
      { name: "Polpa de Açaí", quantity: "1 chávena" },
      { name: "Banana", quantity: "1" },
      { name: "Granola", quantity: "1/2 chávena" },
      { name: "Mel", quantity: "1 colher de sopa" },
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
    id: 20,
    recipeName: "Frango ao Limão",
    ingredients: [
      { name: "Peito de Frango", quantity: "300g" },
      { name: "Sumo de Limão", quantity: "2 colheres de sopa" },
      { name: "Alho", quantity: "3 dentes" },
      { name: "Azeite", quantity: "1 colher de sopa" },
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
    id: 21,
    recipeName: "Lasanha de Legumes",
    ingredients: [
      { name: "Folhas de Lasanha", quantity: "9" },
      { name: "Espinafres", quantity: "2 chávenas" },
      { name: "Ricotta", quantity: "250g" },
      { name: "Molho de Tomate", quantity: "1 chávena" },
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
    id: 22,
    recipeName: "Salada de Grão-de-Bico",
    ingredients: [
      { name: "Grão-de-Bico", quantity: "1 chávena" },
      { name: "Pimento Vermelho", quantity: "1" },
      { name: "Cebola Roxa", quantity: "1/2" },
      { name: "Salsa", quantity: "1 molho" },
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
    id: 23,
    recipeName: "Salmão Grelhado",
    ingredients: [
      { name: "Salmão", quantity: "2 filés" },
      { name: "Azeite", quantity: "2 colheres de sopa" },
      { name: "Limão", quantity: "1" },
      { name: "Ervas Finas", quantity: "a gosto" },
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
    id: 24,
    recipeName: "Hambúrguer Vegetariano",
    ingredients: [
      { name: "Feijão Preto", quantity: "1 chávena" },
      { name: "Aveia", quantity: "1/2 chávena" },
      { name: "Cebola", quantity: "1/2" },
      { name: "Alho", quantity: "2 dentes" },
    ],
    filters: {
      glutenFree: false,
      vegan: true,
      dairyFree: true,
      lowCarb: false,
      highProtein: true,
      quickPrep: false,
    },
  },
  {
    id: 25,
    recipeName: "Bife com Legumes",
    ingredients: [
      { name: "Bife", quantity: "200g" },
      { name: "Cenoura", quantity: "1" },
      { name: "Brócolos", quantity: "1 chávena" },
      { name: "Azeite", quantity: "1 colher de sopa" },
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
    recipeName: "Tortilha de Batata",
    ingredients: [
      { name: "Batatas", quantity: "3" },
      { name: "Ovos", quantity: "4" },
      { name: "Cebola", quantity: "1" },
      { name: "Azeite", quantity: "1/4 chávena" },
    ],
    filters: {
      glutenFree: true,
      vegan: false,
      dairyFree: false,
      lowCarb: false,
      highProtein: false,
      quickPrep: false,
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
          <h2 className="text-2xl font-bold mb-2">Filtros</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <CheckboxTwo
              label="Gluten-Free"
              checked={filters.glutenFree}
              onChange={() => toggleFilter("glutenFree")}
            />
            <CheckboxTwo
              label="Vegano"
              checked={filters.vegan}
              onChange={() => toggleFilter("vegan")}
            />
            <CheckboxTwo
              label="Sem-Lactose"
              checked={filters.dairyFree}
              onChange={() => toggleFilter("dairyFree")}
            />
            <CheckboxTwo
              label="Low-Carb"
              checked={filters.lowCarb}
              onChange={() => toggleFilter("lowCarb")}
            />
            <CheckboxTwo
              label="Alta-Proteína"
              checked={filters.highProtein}
              onChange={() => toggleFilter("highProtein")}
            />
            <CheckboxTwo
              label="Preparação Rápida"
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
                  Ingredientes
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
