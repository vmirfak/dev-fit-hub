import { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../layout/DefaultLoayout";
import { IoFitness } from "react-icons/io5";
import { FaEdit, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineFileDone } from "react-icons/ai";
import { FiBarChart2 } from "react-icons/fi";
interface Exercise {
  day: string;
  exercise: string;
  sets: number;
  reps: string;
}
interface ExercisePlan {
  name: string;
  goal: string;
  duration: string;
  intensity: string;
  exercises: Exercise[];
}
const mockExercisePlans: Record<string, ExercisePlan> = {
  "1": {
    name: "Plano de Treino - João Silva",
    goal: "Ganhar Massa Muscular",
    duration: "8 semanas",
    intensity: "Alta",
    exercises: [
      { day: "Segunda-Feira", exercise: "Supino Reto", sets: 4, reps: "8-12" },
      {
        day: "Segunda-Feira",
        exercise: "Desenvolvimento com Halteres",
        sets: 4,
        reps: "10-12",
      },
      {
        day: "Terça-Feira",
        exercise: "Agachamento Livre",
        sets: 4,
        reps: "8-12",
      },
      {
        day: "Terça-Feira",
        exercise: "Stiff com Halteres",
        sets: 3,
        reps: "10-12",
      },
      {
        day: "Quarta-Feira",
        exercise: "Remada Curvada",
        sets: 4,
        reps: "8-12",
      },
      { day: "Quarta-Feira", exercise: "Barra Fixa", sets: 3, reps: "Máximo" },
    ],
  },
  "2": {
    name: "Plano de Treino - Maria Oliveira",
    goal: "Definição Muscular",
    duration: "6 semanas",
    intensity: "Média",
    exercises: [
      {
        day: "Segunda-Feira",
        exercise: "Corrida na Esteira",
        sets: 1,
        reps: "30 min",
      },
      {
        day: "Segunda-Feira",
        exercise: "Afundo com Halteres",
        sets: 3,
        reps: "12-15",
      },
      { day: "Terça-Feira", exercise: "Treino HIIT", sets: 1, reps: "20 min" },
      {
        day: "Quarta-Feira",
        exercise: "Supino Inclinado",
        sets: 4,
        reps: "10-12",
      },
      { day: "Quarta-Feira", exercise: "Rosca Direta", sets: 3, reps: "12-15" },
    ],
  },
};

const ExercisePlanOverview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan] = useState<string>("1");
  const handleCreateNew = () => {
    setIsModalOpen(true);
  };

  return (
    <DefaultLayout isModalOpen={isModalOpen}>
      <Breadcrumb pageName="Plano de Treino" />

      {/* Summary Card */}
      <div className="p-6 rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            {mockExercisePlans[selectedPlan].name}
          </h2>
          <IoFitness className="text-blue-500" size={28} />
        </div>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Objetivo: {mockExercisePlans[selectedPlan].goal}
        </p>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Duração: {mockExercisePlans[selectedPlan].duration}
        </p>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Intensidade: {mockExercisePlans[selectedPlan].intensity}
        </p>
      </div>

      {/* Exercise Schedule Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Dia
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Exercício
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Séries
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Repetições
              </th>
            </tr>
          </thead>
          <tbody>
            {mockExercisePlans[selectedPlan].exercises.map(
              (exercise, index) => (
                <tr
                  key={index}
                  className="border-b border-[#eee] hover:bg-gray-50 transition duration-200 dark:border-strokedark"
                >
                  <td className="py-3 px-4">{exercise.day}</td>
                  <td className="py-3 px-4">{exercise.exercise}</td>
                  <td className="py-3 px-4">{exercise.sets}</td>
                  <td className="py-3 px-4">{exercise.reps}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-4 md:grid-cols-4 sm:grid-cols-3 gap-4">
        <Link
          to="/athleteprogress"
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
        >
          <FiBarChart2 size={18} />
          <span>Ver Progresso</span>
        </Link>

        <Link
          to="/dietplandetails"
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          <AiOutlineFileDone size={18} />
          <span>Concluir Plano</span>
        </Link>
        <Link
          to="/exerciseplandetails/1"
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <FaEdit size={18} />
          <span>Editar Plano</span>
        </Link>
        <Link to="/newexerciseplan">
          <button
            onClick={handleCreateNew}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <FaPlus size={18} className="mr-2 " />
            Criar Novo
          </button>
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default ExercisePlanOverview;
