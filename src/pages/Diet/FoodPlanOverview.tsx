import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLoayout";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaEdit, FaShoppingCart, FaPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { AiOutlineFileDone } from "react-icons/ai";

interface Meal {
  day: string;
  meal: string;
  time: string;
}

interface FoodPlan {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  startDate: string;
  endDate: string;
  meals: Meal[];
  status: "prescribed" | "finished" | "active";
}

const mockFoodPlans: Record<string, FoodPlan> = {
  "1": {
    name: "Plano de Nutrição - Maria Oliveira",
    calories: 2200,
    protein: 130,
    carbs: 270,
    fats: 55,
    meals: [
      { day: "Segunda-Feira", meal: "Aveia e Fruta", time: "08:00 AM" },
      {
        day: "Segunda-Feira",
        meal: "Frango Grelhado e Arroz",
        time: "12:30 PM",
      },
      { day: "Segunda-Feira", meal: "Salmão e Vegetais", time: "07:00 PM" },
      { day: "Terça-Feira", meal: "Panquecas de Aveia", time: "08:00 AM" },
      { day: "Terça-Feira", meal: "Salada de Atum", time: "12:30 PM" },
      {
        day: "Terça-Feira",
        meal: "Peito de Frango e Batata Doce",
        time: "07:00 PM",
      },
    ],
    status: "prescribed",
    startDate: "01/01/2025",
    endDate: "31/01/2025",
  },
  "2": {
    name: "Plano de Nutrição - Maria Oliveira",
    calories: 1800,
    protein: 100,
    carbs: 200,
    fats: 45,
    meals: [
      {
        day: "Segunda-Feira",
        meal: "Smoothie de Banana e Nozes",
        time: "08:00 AM",
      },
      {
        day: "Segunda-Feira",
        meal: "Quinoa com Frango e Vegetais",
        time: "01:00 PM",
      },
      {
        day: "Segunda-Feira",
        meal: "Salmão Grelhado com Salada",
        time: "07:00 PM",
      },
      {
        day: "Terça-Feira",
        meal: "Tapioca com Queijo Branco",
        time: "08:00 AM",
      },
      { day: "Terça-Feira", meal: "Risoto de Cogumelos", time: "01:00 PM" },
    ],
    status: "finished",
    startDate: "01/02/2025",
    endDate: "28/02/2025",
  },
  "3": {
    name: "Plano de Nutrição - Maria Oliveira",
    calories: 2500,
    protein: 150,
    carbs: 300,
    fats: 70,
    meals: [
      {
        day: "Quarta-Feira",
        meal: "Ovos mexidos e pão integral",
        time: "08:00 AM",
      },
      {
        day: "Quarta-Feira",
        meal: "Carne Moída com Arroz Integral",
        time: "12:30 PM",
      },
      { day: "Quarta-Feira", meal: "Sopa de Legumes", time: "07:00 PM" },
      { day: "Quinta-Feira", meal: "Iogurte com Granola", time: "08:00 AM" },
      { day: "Quinta-Feira", meal: "Macarrão com Frango", time: "12:30 PM" },
      {
        day: "Quinta-Feira",
        meal: "Hambúrguer Caseiro com Batata Assada",
        time: "07:00 PM",
      },
    ],
    status: "active",
    startDate: "05/03/2025",
    endDate: "05/04/2025",
  },
  "4": {
    name: "Plano de Nutrição - Maria Oliveira",
    calories: 1600,
    protein: 90,
    carbs: 180,
    fats: 50,
    meals: [
      {
        day: "Segunda-Feira",
        meal: "Tapioca com queijo cottage",
        time: "07:30 AM",
      },
      {
        day: "Segunda-Feira",
        meal: "Filé de Peixe com Legumes",
        time: "12:00 PM",
      },
      { day: "Segunda-Feira", meal: "Sopa de Ervilha", time: "07:30 PM" },
      { day: "Terça-Feira", meal: "Cuscuz com Ovos", time: "08:00 AM" },
      {
        day: "Terça-Feira",
        meal: "Frango ao Curry com Arroz",
        time: "12:30 PM",
      },
      { day: "Terça-Feira", meal: "Crepioca com Atum", time: "07:00 PM" },
    ],
    status: "finished",
    startDate: "15/04/2025",
    endDate: "15/05/2025",
  },
  "5": {
    name: "Plano de Nutrição - Maria Oliveira",
    calories: 2700,
    protein: 160,
    carbs: 320,
    fats: 80,
    meals: [
      {
        day: "Quarta-Feira",
        meal: "Pão com pasta de amendoim",
        time: "07:00 AM",
      },
      { day: "Quarta-Feira", meal: "Strogonoff de Frango", time: "01:00 PM" },
      { day: "Quarta-Feira", meal: "Pizza Fit de Frango", time: "08:00 PM" },
      { day: "Quinta-Feira", meal: "Batata Doce com Ovo", time: "07:30 AM" },
      {
        day: "Quinta-Feira",
        meal: "Filé Mignon com Batata Rústica",
        time: "12:30 PM",
      },
      {
        day: "Quinta-Feira",
        meal: "Salada de Atum com Quinoa",
        time: "07:00 PM",
      },
    ],
    status: "finished",
    startDate: "10/06/2025",
    endDate: "10/07/2025",
  },
  "6": {
    name: "Plano de Nutrição - Maria Oliveira",
    calories: 1900,
    protein: 110,
    carbs: 250,
    fats: 40,
    meals: [
      {
        day: "Sexta-Feira",
        meal: "Iogurte com Chia e Frutas",
        time: "07:30 AM",
      },
      {
        day: "Sexta-Feira",
        meal: "Feijão Tropeiro com Arroz",
        time: "12:30 PM",
      },
      {
        day: "Sexta-Feira",
        meal: "Wrap de Frango com Ricota",
        time: "07:00 PM",
      },
      { day: "Sábado", meal: "Pão de Queijo e Café", time: "08:00 AM" },
      { day: "Sábado", meal: "Lasanha de Berinjela", time: "12:30 PM" },
      { day: "Sábado", meal: "Panqueca Proteica", time: "07:00 PM" },
    ],
    status: "finished",
    startDate: "20/07/2025",
    endDate: "20/08/2025",
  },
};

const FoodPlanOverview = () => {
  const [isModalOpen] = useState(false);
  const { id } = useParams();
  const [foodPlan, setFoodPlan] = useState<FoodPlan | null>(null);

  useEffect(() => {
    if (id && mockFoodPlans[id]) {
      setFoodPlan(mockFoodPlans[id]);
    }
  }, [id]);

  if (!foodPlan) {
    return (
      <DefaultLayout isModalOpen={isModalOpen}>
        <Breadcrumb pageName="Plano de Nutrição" />
        <p className="text-center text-gray-500">Nenhum plano encontrado.</p>
      </DefaultLayout>
    );
  }

  const finishedPlans = Object.values(mockFoodPlans).filter(
    (plan) => plan.status === "finished"
  );

  return (
    <DefaultLayout isModalOpen={isModalOpen}>
      <Breadcrumb pageName="Plano de Nutrição" />

      {/* Food Plan Overview */}
      <div className="p-6 rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            {foodPlan.name}
          </h2>
          <IoFastFoodSharp className="text-green-500" size={28} />
        </div>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Este plano fornece aproximadamente {foodPlan.calories} kCal por dia.
        </p>

        <div className="flex justify-between mt-4">
          <p className="text-blue-500">Proteína: {foodPlan.protein}g</p>
          <p className="text-yellow-500">
            Hidratos de Carbono: {foodPlan.carbs}g
          </p>
          <p className="text-red-500">Gorduras: {foodPlan.fats}g</p>
        </div>
      </div>

      {/* Meal Schedule Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Dia
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Refeição
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Horário
              </th>
            </tr>
          </thead>
          <tbody>
            {foodPlan.meals.map((meal, index) => (
              <tr
                key={index}
                className="border-b border-[#eee] hover:bg-gray-50 transition duration-200 dark:border-strokedark"
              >
                <td className="py-3 px-4">{meal.day}</td>
                <td className="py-3 px-4">{meal.meal}</td>
                <td className="py-3 px-4">{meal.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botões de Ação */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 sm:grid-cols-4 gap-4">
        <Link
          to={`/dietplandetails/${id}`}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          <AiOutlineFileDone size={18} />
          <span>Concluir Plano</span>
        </Link>
        <Link
          to={`/dietplandetails/${id}`}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <FaEdit size={18} />
          <span>Editar Plano</span>
        </Link>
        <Link
          to="/shoppinglist"
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          <FaShoppingCart size={18} />
          <span>Lista de Compras</span>
        </Link>
        <Link
          to="/newdietplan"
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <FaPlus size={18} />
          <span>Criar Novo</span>
        </Link>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          Planos Passados
        </h3>
      </div>
      {/* Seção Planos Passados Concluídos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {finishedPlans.length > 0 ? (
          finishedPlans.map((plan) => (
            <div
              key={plan.name}
              className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 rounded-lg shadow-lg text-white"
            >
              <h4 className="text-lg font-semibold">{plan.name}</h4>
              <p className="text-sm mt-2">{plan.calories} kCal / dia</p>
              <div className="text-sm mt-2">
                <p>
                  P: {plan.protein}g | G: {plan.fats}g | HC: {plan.carbs}g
                </p>
              </div>
              <div className="text-sm mt-2">
                <p>
                  De {plan.startDate} a {plan.endDate}
                </p>
              </div>
              <Link
                to={`/foodplandetails/${plan.name}`}
                className="flex items-center text-white mt-4 inline-block hover:text-yellow-300 transition"
              >
                <FaMagnifyingGlass
                  title="Detalhes do Plano"
                  className="mr-2 h-5 w-5"
                />
                Ver detalhes
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Não há planos passados.
          </p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default FoodPlanOverview;
