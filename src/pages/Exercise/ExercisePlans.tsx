import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLoayout";
import Modal from "../../components/Modal";

// Updated data structure to organize exercises by day
const exercisePlansData = [
  {
    planName: "Programa de Treino de Força",
    description: "Um programa de 4 semanas focado em aumentar a força e a resistência.",
    weeklyPlan: [
      {
        day: "Dia 1",
        exercises: [
          {
            name: "Agachamentos",
            sets: 4,
            repetitions: 10,
            duration: "N/A",
            instructions: "Mantenha as costas retas.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Supino",
            sets: 3,
            repetitions: 8,
            duration: "N/A",
            instructions: "Baixe a barra até o peito.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Levantamento Terra",
            sets: 4,
            repetitions: 10,
            duration: "N/A",
            instructions: "Mantenha as costas retas.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Prancha",
            sets: 3,
            repetitions: "N/A",
            duration: "1 minuto",
            instructions: "Mantenha o corpo em linha reta.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
        ],
      },
      {
        day: "Dia 2",
        exercises: [
          {
            name: "Pull-ups",
            sets: 3,
            repetitions: 5,
            duration: "N/A",
            instructions: "Puxe o queixo acima da barra.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Flexões",
            sets: 4,
            repetitions: 12,
            duration: "N/A",
            instructions: "Mantenha o corpo reto.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Avanços",
            sets: 3,
            repetitions: 10,
            duration: "N/A",
            instructions: "Dê um passo à frente e baixe os quadris.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Bicicleta Abdominal",
            sets: 3,
            repetitions: 15,
            duration: "N/A",
            instructions: "Toque o cotovelo no joelho oposto.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
        ],
      },
      {
        day: "Dia 3",
        exercises: [
          {
            name: "Remadas com Barra",
            sets: 4,
            repetitions: 10,
            duration: "N/A",
            instructions: "Mantenha as costas retas.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Pressão de Ombros",
            sets: 3,
            repetitions: 10,
            duration: "N/A",
            instructions: "Pressione acima da cabeça.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Leg Press",
            sets: 4,
            repetitions: 12,
            duration: "N/A",
            instructions: "Empurre com os pés.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Jumping Jacks",
            sets: 3,
            repetitions: 20,
            duration: "N/A",
            instructions: "Salte enquanto espalha os braços e as pernas.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
        ],
      },
      {
        day: "Dia 4",
        exercises: [
          {
            name: "Aula de Zumba",
            sets: 1,
            repetitions: "N/A",
            duration: "45 minutos",
            instructions: "Siga o instrutor.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Prancha Lateral",
            sets: 3,
            repetitions: "N/A",
            duration: "30 segundos de cada lado",
            instructions: "Mantenha o corpo reto.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Burpees",
            sets: 3,
            repetitions: 10,
            duration: "N/A",
            instructions: "Agache, salte para trás e salte para cima.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Torções Russas",
            sets: 3,
            repetitions: 15,
            duration: "N/A",
            instructions: "Gire o tronco.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
        ],
      },
    ],
  },
  {
    planName: "Plano de Condicionamento Cardíaco",
    description: "Um plano de 2 semanas para melhorar a saúde cardiovascular.",
    weeklyPlan: [
      {
        day: "Dia 1",
        exercises: [
          {
            name: "Corrida",
            sets: "N/A",
            repetitions: "N/A",
            duration: "30 minutos",
            instructions: "Mantenha um ritmo constante.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Ciclismo",
            sets: "N/A",
            repetitions: "N/A",
            duration: "45 minutos",
            instructions: "Mantenha um ritmo consistente.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Pular Corda",
            sets: 5,
            repetitions: "1 minuto",
            duration: "N/A",
            instructions: "Pule a corda em um ritmo constante.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Elevações de Joelho",
            sets: 3,
            repetitions: 30,
            duration: "N/A",
            instructions: "Leve os joelhos até o peito.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
        ],
      },
      {
        day: "Dia 2",
        exercises: [
          {
            name: "Remo",
            sets: 1,
            repetitions: "N/A",
            duration: "20 minutos",
            instructions: "Remar em um ritmo moderado.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Burpees",
            sets: 3,
            repetitions: 10,
            duration: "N/A",
            instructions: "Agache, salte para trás e salte para cima.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Jumping Jacks",
            sets: 3,
            repetitions: 20,
            duration: "N/A",
            instructions: "Salte enquanto espalha os braços e as pernas.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Escaladores",
            sets: 3,
            repetitions: 15,
            duration: "N/A",
            instructions: "Leve os joelhos em direção ao peito.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
        ],
      },
    ],
  },
];


const ExercisePlans: React.FC = () => {
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [selectedExerciseName, setselectedExerciseName] = useState(""); // Ensure this line exists

  const togglePlanExpansion = (index: number) => {
    setExpandedPlan(expandedPlan === index ? null : index);
    setExpandedDay(null); // Reset day and exercise when changing plan
    setExpandedExercise(null);
  };

  const toggleDayExpansion = (index: number) => {
    setExpandedDay(expandedDay === index ? null : index);
    setExpandedExercise(null); // Close any expanded exercises when switching days
  };

  const toggleExerciseExpansion = (index: number) => {
    // Toggle the exercise expansion state without affecting the modal
    setExpandedExercise(expandedExercise === index ? null : index);
  };

  
  return (
    <DefaultLayout isModalOpen={isModalOpen}>
      <Breadcrumb pageName="O meu Plano de Treino" />

      <div className="overflow-hidden rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
        {/* Exercise Plans List */}
        {exercisePlansData.map((plan, planIndex) => (
          <div key={planIndex} className="mb-6">
            {/* Plan Header */}
            <div
              className="flex justify-between items-center p-4 bg-blue-100 dark:bg-gray-800 cursor-pointer rounded-xl"
              onClick={() => togglePlanExpansion(planIndex)}
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-neutral-600">
                  {plan.planName}
                </h3>
                <p className="text-sm text-gray-700 dark:text-neutral-600">
                  {plan.description}
                </p>
              </div>
              <span className="text-2xl ">
                {expandedPlan === planIndex ? "-" : "+"}
              </span>
            </div>

            {/* Expandable Plan Details */}
            {expandedPlan === planIndex && (
              <div className="p-4 border-gray-200 dark:border-gray-600">
                <h4 className="text-lg font-medium mb-2">
                  Treino Semanal
                </h4>

                {/* Day List */}
                {plan.weeklyPlan.map((dayPlan, dayIndex) => (
                  <div key={dayIndex} className="mb-4">
                    {/* Day Header */}
                    <div
                      className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 cursor-pointer rounded-xl"
                      onClick={() => toggleDayExpansion(dayIndex)}
                    >
                      <div>
                        <h5 className="text-md font-semibold">{dayPlan.day}</h5>
                      </div>
                      <span className="text-xl ">
                        {expandedDay === dayIndex ? "-" : "+"}
                      </span>
                    </div>

                    {/* Expandable Day Details */}
                    {expandedDay === dayIndex && (
                      <div className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl mt-2 bg-gray-50 dark:bg-gray-800">
                        <h5 className="text-md font-medium mb-2">Exercícios</h5>

                        {/* Exercise List */}
                        {dayPlan.exercises.map((exercise, exerciseIndex) => (
                          <div key={exerciseIndex} className="mb-4">
                            {/* Exercise Header */}
                            <div
                              className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 cursor-pointer rounded-xl"
                              onClick={() =>
                                toggleExerciseExpansion(exerciseIndex)
                              }
                            >
                              <div>
                                <h6 className="text-sm font-semibold">
                                  {exercise.name}
                                </h6>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Sets: {exercise.sets} | Repetições:{" "}
                                  {exercise.repetitions} | Duração:{" "}
                                  {exercise.duration}
                                </p>
                              </div>
                              <span className="text-xl ">
                                {expandedExercise === exerciseIndex ? "-" : "+"}
                              </span>
                            </div>

                            {/* Expandable Exercise Details */}
                            {expandedExercise === exerciseIndex && (
                              <div className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl mt-2 bg-gray-50 dark:bg-gray-800">
                                <p className="text-sm text-gray-800 dark:text-gray-200">
                                  <strong>Instruções:</strong>{" "}
                                  {exercise.instructions}
                                </p>
                                <button
                                  className="mt-2 text-blue-600"
                                  onClick={() => {
                                    setIsModalOpen(true);
                                    setVideoUrl(exercise.videoLink);
                                    setselectedExerciseName(exercise.name);
                                  }}
                                >
                                  Ver Vídeo
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Modal for Video */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          videoUrl={videoUrl || ""}
          exerciseName={selectedExerciseName}
        />
      </div>
    </DefaultLayout>
  );
};

export default ExercisePlans;
