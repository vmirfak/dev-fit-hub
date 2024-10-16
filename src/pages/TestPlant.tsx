import { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLoayout";
import { Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import { GrNext, GrPrevious } from "react-icons/gr";
import Slider from "@mui/material/Slider";
import { FaPlus } from "react-icons/fa";
import AddRecipeModal from "../components/Modal/RecipeModal";
import { FiMinus } from "react-icons/fi";

const steps = [
  "Configuração do Perfil do Utilizador",
  "Avaliação Nutricional",
  "Estrutura do Plano de Refeições",
  "Revisão e Finalização do Plano",
];

interface Recipe {
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fats: number;
}

const recipesData: Recipe[] = [
  { name: "Salada de Quinoa", calories: 220, carbs: 40, protein: 8, fats: 5 },
  { name: "Frango Grelhado", calories: 300, carbs: 0, protein: 35, fats: 10 },
  { name: "Batata Doce Assada", calories: 180, carbs: 41, protein: 4, fats: 0 },
  { name: "Salmão ao Forno", calories: 250, carbs: 0, protein: 28, fats: 15 },
  { name: "Tigela de Aveia", calories: 350, carbs: 60, protein: 10, fats: 9 },
  {
    name: "Esparguete de Abóbora",
    calories: 150,
    carbs: 30,
    protein: 4,
    fats: 2,
  },
  { name: "Frutas Frescas", calories: 100, carbs: 25, protein: 1, fats: 0 },
  {
    name: "Omelete de Espinafres",
    calories: 200,
    carbs: 2,
    protein: 16,
    fats: 14,
  },
  { name: "Arroz Integral", calories: 215, carbs: 45, protein: 5, fats: 1 },
  { name: "Wrap de Frango", calories: 350, carbs: 40, protein: 30, fats: 10 },
  { name: "Sopa de Lentilhas", calories: 180, carbs: 32, protein: 12, fats: 3 },
  { name: "Peito de Peru", calories: 240, carbs: 0, protein: 35, fats: 8 },
  { name: "Torta de Legumes", calories: 210, carbs: 28, protein: 6, fats: 8 },
  {
    name: "Risoto de Cogumelos",
    calories: 330,
    carbs: 55,
    protein: 8,
    fats: 10,
  },
  {
    name: "Hambúrguer Vegetariano",
    calories: 250,
    carbs: 30,
    protein: 15,
    fats: 8,
  },
  { name: "Panqueca de Banana", calories: 200, carbs: 40, protein: 6, fats: 4 },
  { name: "Peixe Grelhado", calories: 220, carbs: 0, protein: 30, fats: 10 },
  { name: "Massa Integral", calories: 320, carbs: 60, protein: 10, fats: 5 },
  { name: "Tofu Grelhado", calories: 150, carbs: 4, protein: 15, fats: 8 },
  { name: "Sanduíche de Atum", calories: 270, carbs: 35, protein: 20, fats: 7 },
];

const healthConditionsList = [
  "Diabetes",
  "Hipertensão",
  "Doença Cardíaca",
  "Asma",
  "Doença Renal",
  "Problemas na Tiroide",
  "Colesterol Alto",
  "Obesidade",
];

const allergiesList = [
  "Amendoins",
  "Marisco",
  "Laticínios",
  "Glúten",
  "Soja",
  "Ovos",
  "Nozes",
  "Trigo",
  "Peixe",
];

interface UserProfile {
  age: string;
  gender: string;
  weight: string;
  height: string;
  activityLevel: string;
  healthGoals: string;
  dietaryRestrictions: string;
  foodPreferences: string;
  currentDiet: string;
  dailyCaloricIntake: string;
  allergies: string[];
  mealsPerDay: string;
  healthConditions: string[];
  [key: string]: any;
}

const DietPlan = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "",
    healthGoals: "",
    dietaryRestrictions: "",
    foodPreferences: "",
    currentDiet: "",
    dailyCaloricIntake: "",
    allergies: [],
    mealsPerDay: "",
    healthConditions: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [caloricNeeds, setCaloricNeeds] = useState(0);
  const [macronutrients, setMacronutrients] = useState({
    carbs: 0,
    protein: 0,
    fats: 0,
  });
  const [goalAdjustment, setGoalAdjustment] = useState(0);
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, steps.length - 1)
    );

    // Mantém o cálculo da avaliação nutricional se avançar do primeiro passo
    if (activeStep === 0) {
      calculateNutritionalNeeds();
    }
  };
  const [addedRecipes, setAddedRecipes] = useState<Recipe[][]>([]);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setUserProfile((prevState) => {
      if (type === "checkbox") {
        return {
          ...prevState,
          [name]: checked
            ? [...(prevState[name] as string[]), value]
            : (prevState[name] as string[]).filter((item) => item !== value),
        };
      }

      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleGoalAdjustmentChange = (e: { target: { value: any } }) => {
    const newAdjustment = Number(e.target.value);
    setGoalAdjustment(newAdjustment);
    // Recalculate nutritional needs with the new adjustment immediately
    calculateNutritionalNeeds();
  };

  const calculateNutritionalNeeds = () => {
    const { weight, height, age, activityLevel } = userProfile;

    const weightNum = Number(weight);
    const heightNum = Number(height);
    const ageNum = Number(age);

    let bmr: number;

    // Basic BMR calculation
    if (userProfile.gender === "male") {
      bmr = 88.362 + 13.397 * weightNum + 4.799 * heightNum - 5.677 * ageNum;
    } else {
      bmr = 447.593 + 9.247 * weightNum + 3.098 * heightNum - 4.33 * ageNum;
    }

    const activityMultipliers: { [key: string]: number } = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      "very-active": 1.9,
    };

    const activityMultiplier =
      activityMultipliers[activityLevel as keyof typeof activityMultipliers];
    const calories = bmr * activityMultiplier + goalAdjustment; // Calculate total calories

    // Round caloric needs to one decimal place
    const roundedCalories = Number(calories.toFixed(1));

    let proteinRatio = 0.25;
    let fatRatio = 0.25;
    let carbsRatio = 0.5;

    if (userProfile.healthGoals.toLowerCase().includes("weight loss")) {
      proteinRatio = 0.3;
      fatRatio = 0.2;
      carbsRatio = 0.5;
    } else if (userProfile.healthGoals.toLowerCase().includes("muscle gain")) {
      proteinRatio = 0.4;
      fatRatio = 0.3;
      carbsRatio = 0.3;
    }

    const protein = Number(((roundedCalories * proteinRatio) / 4).toFixed(1)); // Round to 1 decimal place
    const fats = Number(((roundedCalories * fatRatio) / 9).toFixed(1)); // Round to 1 decimal place
    const carbs = Number(((roundedCalories * carbsRatio) / 4).toFixed(1)); // Round to 1 decimal place

    setCaloricNeeds(roundedCalories); // Set rounded caloric needs
    setMacronutrients({ carbs, protein, fats });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [expandedMeal, setExpandedMeal] = useState<number | null>(null);

  const toggleMealExpansion = (index: number) => {
    setExpandedMeal((prev) => (prev === index ? null : index));
  };

  const [currentMealIndex, setCurrentMealIndex] = useState<number | null>(null);

  useEffect(() => {
    const mealsCount = Number(userProfile.mealsPerDay) || 0;
    setAddedRecipes((prevRecipes) => {
      const updatedRecipes = Array.from({ length: mealsCount }, (_, index) => {
        // Retain existing recipes if they exist
        return prevRecipes[index] || [];
      });
      return updatedRecipes;
    });
  }, [userProfile.mealsPerDay]);

  const handleAddRecipe = (newRecipe: Recipe, mealIndex: number) => {
    setAddedRecipes((prevRecipes) => {
      const updatedRecipes = [...prevRecipes];
      updatedRecipes[mealIndex].push(newRecipe);
      return updatedRecipes;
    });
    setIsModalOpen(false);
  };

  const openModal = (index: number) => {
    console.log("Opening modal for meal index:", index);
    setCurrentMealIndex(index);
    setIsModalOpen(true);
  };

  useEffect(() => {
    console.log(addedRecipes);
  }, [addedRecipes]);

  const calculateMacros = () => {
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFats = 0;

    addedRecipes.forEach((recipes) => {
      recipes.forEach((recipe) => {
        totalCarbs += recipe.carbs;
        totalProtein += recipe.protein;
        totalFats += recipe.fats;
      });
    });

    return {
      carbs: totalCarbs,
      protein: totalProtein,
      fats: totalFats,
    };
  };

  // Call this function whenever you add or remove a recipe
  const calculatedMacros = calculateMacros();

  const handleRemoveRecipe = (mealIndex: number, recipeIndex: number) => {
    setAddedRecipes((prevRecipes) => {
      const updatedMeals = [...prevRecipes];
      updatedMeals[mealIndex] = updatedMeals[mealIndex].filter(
        (_, i) => i !== recipeIndex
      );
      return updatedMeals;
    });
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0: // User Profile Setup
        return (
          <div>
            <form>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Age */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Idade
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={userProfile.age}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    placeholder="Introduz a Idade"
                    required
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Género
                  </label>
                  <select
                    name="gender"
                    value={userProfile.gender}
                    onChange={handleSelectChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white cursor-pointer"
                    required
                  >
                    <option value="">Seleciona Géreno</option>
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                    <option value="other">Outro</option>
                  </select>
                </div>

                {/* Weight */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={userProfile.weight}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    placeholder="Introduz Peso"
                    required
                  />
                </div>

                {/* Height */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={userProfile.height}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    placeholder="Introduz Altura"
                    required
                  />
                </div>

                {/* Activity Level */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Nível de Atividade
                  </label>
                  <select
                    name="activityLevel"
                    value={userProfile.activityLevel}
                    onChange={handleSelectChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white cursor-pointer"
                    required
                  >
                    <option value="">Selecionar nível de atividade</option>
                    <option value="Sedentária">Sedentário</option>
                    <option value="Leve">Atividade leve</option>
                    <option value="Moderada">Atividade moderada</option>
                    <option value="Ativa">Ativo</option>
                    <option value="Muito-Ativa">Muito ativo</option>
                  </select>
                </div>

                {/* Health Goals */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Objetivos
                  </label>
                  <input
                    type="text"
                    name="healthGoals"
                    value={userProfile.healthGoals}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    placeholder="Introduz os Objetivos"
                    required
                  />
                </div>

                {/* Dietary Restrictions */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Restrições
                  </label>
                  <input
                    type="text"
                    name="dietaryRestrictions"
                    value={userProfile.dietaryRestrictions}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    placeholder="Introduz restrições"
                  />
                </div>

                {/* Food Preferences */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Preferências Alimentares
                  </label>
                  <input
                    type="text"
                    name="foodPreferences"
                    value={userProfile.foodPreferences}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    placeholder="Introduz as Preferências"
                  />
                </div>
              </div>
            </form>
          </div>
        );
      case 1: // Nutritional Assessment
        return (
          <div>
            <form>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Current Diet */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Dieta Atual
                  </label>
                  <textarea
                    name="currentDiet"
                    value={userProfile.currentDiet}
                    onChange={handleTextareaChange}
                    className="border border-stroke bg-gray-50 py-3 px-5 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white w-full h-40"
                    placeholder="Desceve a dieta atual"
                    rows={6}
                    required
                  />
                </div>
                {/* Display Caloric Needs */}
                <div className="md:col-span-2">
                  <Typography className="text-center">
                    As tuas necessidades calóricas:{" "}
                    <strong>{caloricNeeds.toFixed(1)} kcal</strong>
                  </Typography>
                </div>
                {/* Daily Caloric Intake */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Ingestão Calórica Diária (kcal)
                  </label>
                  <input
                    type="number"
                    name="dailyCaloricIntake"
                    value={userProfile.dailyCaloricIntake}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white w-1/3"
                    placeholder="Introduz a Ingestão Calórica Diária"
                    required
                  />
                </div>

                {/* Preferred Macronutrient Ratios */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Quantidades de Macro-nutrientes
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white">
                        HC [g]
                      </label>
                      <input
                        type="number"
                        name="carbsRatio"
                        value={macronutrients.carbs}
                        onChange={handleGoalAdjustmentChange}
                        className="border border-stroke bg-gray-50 py-3 px-5 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white w-full h-12"
                        min={0}
                        max={100}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white">
                        P [g]
                      </label>
                      <input
                        type="number"
                        name="proteinRatio"
                        value={macronutrients.protein}
                        onChange={handleGoalAdjustmentChange}
                        className="border border-stroke bg-gray-50 py-3 px-5 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white w-full h-12"
                        min={0}
                        max={100}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white">
                        G [g]
                      </label>
                      <input
                        type="number"
                        name="fatRatio"
                        value={macronutrients.fats}
                        onChange={handleGoalAdjustmentChange}
                        className="border border-stroke bg-gray-50 py-3 px-5 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white w-full h-12"
                        min={0}
                        max={100}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Allergies */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Alergias
                  </label>
                  <div className="flex flex-wrap gap-4 justify-center items-center">
                    {allergiesList.map((allergy) => (
                      <div key={allergy} className="flex items-center">
                        <input
                          type="checkbox"
                          name="allergies"
                          value={allergy}
                          checked={userProfile.allergies.includes(allergy)}
                          onChange={handleInputChange}
                          className="border scale-150 border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        />
                        <label className="ml-2 text-sm text-black dark:text-white">
                          {allergy}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Health Conditions */}
                <div className="md:col-span-2 ">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Condições Físicas
                  </label>
                  <div className="flex flex-wrap gap-4 justify-center items-center">
                    {healthConditionsList.map((condition) => (
                      <div key={condition} className="flex items-center">
                        <input
                          type="checkbox"
                          name="healthConditions"
                          value={condition}
                          checked={userProfile.healthConditions.includes(
                            condition
                          )}
                          onChange={handleInputChange}
                          className="border scale-150 border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        />
                        <label className="ml-2 text-sm text-black dark:text-white">
                          {condition}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>
        );
      case 2: // Meal Plan Structure
        return (
          <div>
            <form>
              <div>
                <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
                  {/* Resumo Projetado Section */}
                  <div className="p-6 border-2 border-green-500 rounded-lg shadow-lg bg-green-50 flex-1 w-full">
                    <h3 className="text-lg font-bold mb-4 text-green-700">
                      Resumo Projetado:
                    </h3>
                    <div className="flex space-x-6">
                      <div className="p-4 border border-green-400 rounded bg-white flex-1">
                        <p className="text-green-600 font-semibold">
                          HC: {macronutrients.carbs}g
                        </p>
                      </div>
                      <div className="p-4 border border-green-400 rounded bg-white flex-1">
                        <p className="text-green-600 font-semibold">
                          P: {macronutrients.protein}g
                        </p>
                      </div>
                      <div className="p-4 border border-green-400 rounded bg-white flex-1">
                        <p className="text-green-600 font-semibold">
                          G: {macronutrients.fats}g
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Resumo Calculado Section */}
                  <div className="p-6 border-2 border-blue-500 rounded-lg shadow-lg bg-blue-50 flex-1 w-full">
                    <h3 className="text-lg font-bold mb-4 text-blue-700">
                      Resumo Calculado:
                    </h3>
                    <div className="flex space-x-6">
                      <div
                        className={`p-4 border border-blue-400 rounded bg-white flex-1 ${
                          calculatedMacros.carbs > macronutrients.carbs
                            ? "text-red-600"
                            : "text-blue-600"
                        } font-semibold`}
                      >
                        <p>HC:</p>
                        {calculatedMacros.carbs}g
                      </div>
                      <div
                        className={`p-4 border border-blue-400 rounded bg-white flex-1 ${
                          calculatedMacros.protein > macronutrients.protein
                            ? "text-red-600"
                            : "text-blue-600"
                        } font-semibold`}
                      >
                        <p>P:</p>
                        {calculatedMacros.protein}g
                      </div>
                      <div
                        className={`p-4 border border-blue-400 rounded bg-white flex-1 ${
                          calculatedMacros.fats > macronutrients.fats
                            ? "text-red-600"
                            : "text-blue-600"
                        } font-semibold`}
                      >
                        <p>G:</p>
                        {calculatedMacros.fats}g
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slider Section */}
                <div className="mt-6">
                  {" "}
                  {/* Add margin-top for spacing */}
                  <label htmlFor="mealsPerDay">
                    Número de Refeições por Dia:
                  </label>
                  <Slider
                    aria-label="Número de Refeições"
                    value={Number(userProfile.mealsPerDay)}
                    onChange={(_e, value) => {
                      setUserProfile((prevState) => ({
                        ...prevState,
                        mealsPerDay: value.toString(),
                      }));
                    }}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={8}
                  />
                </div>
              </div>
            </form>

            {/* Refeições Section */}
            <div className="mt-6 w-full">
              <div className="grid grid-cols-1 gap-3">
                {Array.from(
                  { length: Number(userProfile.mealsPerDay) },
                  (_, index) => (
                    <div key={index} className="mb-6">
                      <div
                        className="flex justify-between items-center p-4 bg-blue-100 dark:bg-gray-800 cursor-pointer rounded-lg"
                        onClick={() => toggleMealExpansion(index)}
                      >
                        <h4 className="text-xl font-bold text-gray-900 dark:text-neutral-600">
                          Refeição {index + 1}
                        </h4>
                        <span className="text-2xl">
                          {expandedMeal === index ? "-" : "+"}
                        </span>
                      </div>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          expandedMeal === index
                            ? "max-h-screen opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="p-4 flex flex-col items-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                          {addedRecipes[index]?.map((recipe, recipeIndex) => (
                            <div
                              key={recipeIndex}
                              className="flex items-center justify-between w-full mb-2 p-2 border-b border-gray-300"
                            >
                              <span className="font-bold">{recipe.name}</span>

                              <div className="flex-1 flex justify-center">
                                <span className="text-sm text-gray-500 px-2 py-1 rounded border border-yellow-100 font-semibold text-center">
                                  {recipe.calories} kcal | {recipe.protein}g P |{" "}
                                  {recipe.carbs}g C | {recipe.fats}g F
                                </span>
                              </div>

                              <button
                                type="button"
                                className="w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                                onClick={() =>
                                  handleRemoveRecipe(index, recipeIndex)
                                }
                              >
                                <FiMinus size={14} />
                              </button>
                            </div>
                          ))}

                          <button
                            type="button"
                            className="mt-4 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 flex items-center justify-center w-10 h-10"
                            onClick={() => openModal(index)} // Pass the current meal index
                          >
                            <FaPlus className="text-2xl" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <AddRecipeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                recipesData={recipesData}
                onAddRecipe={(newRecipe: Recipe) => {
                  if (currentMealIndex !== null) {
                    handleAddRecipe(newRecipe, currentMealIndex);
                  } else {
                    console.error(
                      "Current meal index is null when adding recipe"
                    );
                  }
                }}
              />
            </div>
          </div>
        );
      case 3: // Revisão e Finalização do Plano
        return (
          <div>
            <Typography variant="body1">
              <strong>Perfil do Utilizador:</strong>
              <br />
              Idade: {userProfile.age} <br />
              Género: {userProfile.gender} <br />
              Peso: {userProfile.weight} kg
              <br />
              Altura: {userProfile.height} cm
              <br />
              Nível de Atividade: {userProfile.activityLevel} <br />
              Calorias Diárias: {caloricNeeds} kcal
              <br />
              Objectivo: {userProfile.healthGoals}
            </Typography>

            <Typography variant="body1">
              <strong>Alergias:</strong>
              <br />
              {userProfile.allergies.length > 0
                ? userProfile.allergies.join(", ")
                : "Nenhuma alergia"}
            </Typography>

            <Typography variant="body1">
              <strong>Condições de Saúde:</strong>
              <br />
              {userProfile.healthConditions.length > 0
                ? userProfile.healthConditions.join(", ")
                : "Nenhuma condição de saúde"}
            </Typography>

            {addedRecipes.map((mealRecipes, mealIndex) => (
              <div key={mealIndex} className="my-4">
                <Typography variant="h6">
                  <strong>Refeição {mealIndex + 1}:</strong>
                </Typography>
                <ul>
                  {mealRecipes.map((recipe, recipeIndex) => (
                    <li key={recipeIndex}>
                      {recipe.name} - {recipe.calories} kcal ({recipe.carbs}g
                      carbs, {recipe.protein}g proteína, {recipe.fats}g
                      gorduras)
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <Typography variant="body1">
              <strong>Total Nutricional:</strong>
              <br />
              Carboidratos: {calculatedMacros.carbs}g<br />
              Proteínas: {calculatedMacros.protein}g<br />
              Gorduras: {calculatedMacros.fats}g
            </Typography>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DefaultLayout isModalOpen={isModalOpen}>
      <Breadcrumb pageName="Diet Plan" />
      <div className="overflow-hidden p-6 mt-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="mx-auto">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>
                  <span className="font-semibold text-gray-700 dark:text-white">
                    {label}
                  </span>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        <div className="flex flex-col items-center mt-6">
          <div className="text-center">
            <Typography
              variant="h4"
              className="mb-12 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-600 tracking-wider"
            >
              Passo {activeStep + 1}: {steps[activeStep]}
            </Typography>

            <div className="mb-10 mt-10">{renderStepContent(activeStep)}</div>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleBack}
                disabled={activeStep === 0}
                className="transition duration-600 transform hover:scale-105 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full"
                style={{ textTransform: "none" }} // Remove caps lock
                startIcon={<GrPrevious />}
              >
                Passo Anterior
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className="transition duration-600 transform hover:scale-105 bg-green-600 text-white hover:bg-green-700 rounded-full"
                style={{ textTransform: "none" }} // Remove caps lock
                endIcon={<GrNext />}
              >
                {isLastStep ? "Terminar" : "Próximo Passo"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DietPlan;
