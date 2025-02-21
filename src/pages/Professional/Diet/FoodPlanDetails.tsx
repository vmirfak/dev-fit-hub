import { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../layout/DefaultLoayout";
import { FaSave } from "react-icons/fa";

interface UserProfile {
  age: number;
  weight: number;
  height: number;
  dailyCaloricIntake: number;
  dietaryRestrictions: string;
  foodPreferences: string;
  currentDiet: string;
  allergies: string[];
  healthConditions: string[];
}

const FoodPlanDetails = () => {
  const [isModalOpen] = useState(false);
  const [foodPlan, setFoodPlan] = useState({
    name: "Plano de Nutrição Exemplo",
    description: "Dieta balanceada para ganho de massa muscular.",
    calories: 2500,
    protein: 150,
    carbs: 300,
    fats: 80,
  });

  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: 30,
    weight: 70,
    height: 175,
    dailyCaloricIntake: 2500,
    dietaryRestrictions: "",
    foodPreferences: "",
    currentDiet: "",
    allergies: [],
    healthConditions: [],
  });

  const allergiesList = ["Glúten", "Lactose", "Frutos do Mar"];

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFoodPlan({ ...foodPlan, [e.target.name]: e.target.value });
  };

  const handleUserProfileChange = (e: {
    target: { name: any; value: any };
  }) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saving food plan:", foodPlan);
    console.log("Saving user profile:", userProfile);
  };

  return (
    <DefaultLayout isModalOpen={isModalOpen}>
      <Breadcrumb pageName="Plano de Nutrição" />
      <div className="overflow-hidden rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
        <h2 className="text-xl font-semibold mb-4">Plano de Nutrição</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 dark:text-stone-300">
          <div>
            <h3 className="font-medium ">Nome do Plano</h3>
            <input
              type="text"
              name="name"
              value={foodPlan.name}
              onChange={handleChange}
              className="mt-2 p-2 border border-stroke rounded-md w-full dark:text-stone-900 "
            />
          </div>
          <div>
            <h3 className="font-medium">Descrição</h3>
            <input
              type="text"
              name="description"
              value={foodPlan.description}
              onChange={handleChange}
              className="mt-2 p-2 border border-stroke rounded-md w-full dark:text-stone-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 ">
          <div>
            <h3 className="font-medium dark:text-stone-300">Calorias</h3>
            <input
              type="number"
              name="calories"
              value={foodPlan.calories}
              onChange={handleChange}
              className="mt-2 p-2 border border-stroke rounded-md w-full dark:text-stone-900"
            />
          </div>
          <div>
            <h3 className="font-medium">Proteínas (g)</h3>
            <input
              type="number"
              name="protein"
              value={foodPlan.protein}
              onChange={handleChange}
              className="mt-2 p-2 border border-stroke rounded-md w-full dark:text-stone-900"
            />
          </div>
          <div>
            <h3 className="font-medium">Hidratos de Carbono (g)</h3>
            <input
              type="number"
              name="carbs"
              value={foodPlan.carbs}
              onChange={handleChange}
              className="mt-2 p-2 border border-stroke rounded-md w-full dark:text-stone-900"
            />
          </div>
          <div>
            <h3 className="font-medium">Gorduras (g)</h3>
            <input
              type="number"
              name="fats"
              value={foodPlan.fats}
              onChange={handleChange}
              className="mt-2 p-2 border border-stroke rounded-md w-full dark:text-stone-900"
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Perfil do Usuário</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-medium">Idade</h3>
            <input
              type="number"
              name="age"
              value={userProfile.age}
              onChange={handleUserProfileChange}
              className="mt-2 p-2 border border-stroke rounded-md w-full dark:text-stone-900"
            />
          </div>
          <div>
            <h3 className="font-medium">Peso (kg)</h3>
            <input
              type="number"
              name="weight"
              value={userProfile.weight}
              onChange={handleUserProfileChange}
              className="mt-2 p-2 border border-stroke rounded-md w-full dark:text-stone-900"
            />
          </div>
          <div>
            <h3 className="font-medium">Altura (cm)</h3>
            <input
              type="number"
              name="height"
              value={userProfile.height}
              onChange={handleUserProfileChange}
              className="mt-2 p-2 border border-stroke rounded-md w-full dark:text-stone-900"
            />
          </div>
          <div>
            <h3 className="font-medium">Ingestão Calórica Diária</h3>
            <input
              type="number"
              name="dailyCaloricIntake"
              value={userProfile.dailyCaloricIntake}
              onChange={handleUserProfileChange}
              className="mt-2 p-2 border border-stroke rounded-md w-full dark:text-stone-900"
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium">Restrições Dietéticas</h3>
          <input
            type="text"
            name="dietaryRestrictions"
            value={userProfile.dietaryRestrictions}
            onChange={handleUserProfileChange}
            className="mt-2 p-2 border border-stroke rounded-md w-full dark:text-stone-900"
          />
        </div>

        <div className="mb-6">
          <h3 className="font-medium">Preferências Alimentares</h3>
          <input
            type="text"
            name="foodPreferences"
            value={userProfile.foodPreferences}
            onChange={handleUserProfileChange}
            className="mt-2 p-2 border border-stroke rounded-md w-full dark:text-stone-900"
          />
        </div>

        <div className="mb-6">
          <h3 className="font-medium">Alergias</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allergiesList.map((allergy) => (
              <div key={allergy} className="flex items-center">
                <input
                  type="checkbox"
                  value={allergy}
                  checked={userProfile.allergies.includes(allergy)}
                  onChange={() => {
                    const updatedAllergies = userProfile.allergies.includes(
                      allergy
                    )
                      ? userProfile.allergies.filter((a) => a !== allergy)
                      : [...userProfile.allergies, allergy];
                    setUserProfile({
                      ...userProfile,
                      allergies: updatedAllergies,
                    });
                  }}
                  className="mr-2"
                />
                <label>{allergy}</label>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <FaSave />
          <span>Guardar Alterações</span>
        </button>
      </div>
    </DefaultLayout>
  );
};

export default FoodPlanDetails;
