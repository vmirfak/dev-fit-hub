import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLoayout";
import { Slider, Typography } from "@mui/material";
import { FiMinus, FiPlus, FiTrash } from "react-icons/fi";
import { FaPlus, FaSave } from "react-icons/fa";

interface Exercise {
  name: string;
  sets: number;
  repetitions: number;
}
interface ExerciseGroup {
  day: number;
  exercises: Exercise[];
}
interface UserProfile {
  exercises: ExerciseGroup[];
}
const ExercisePlanDetails = () => {
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const availableExercises = [
    "Flexões",
    "Agachamentos",
    "Levantamento Terra",
    "Supino",
    "Remada",
  ];
  const generateInitialExercises = (day: number) => {
    return [
      {
        name: availableExercises[day % availableExercises.length],
        sets: 3,
        repetitions: 10,
      },
      {
        name: availableExercises[(day + 1) % availableExercises.length],
        sets: 3,
        repetitions: 12,
      },
    ];
  };
  const [exerciseGroups, setExerciseGroups] = useState<ExerciseGroup[]>(
    Array.from({ length: daysPerWeek }, (_, i) => ({
      day: i + 1,
      exercises: generateInitialExercises(i),
    }))
  );

  const handleAddExercise = (groupIndex: number) => {
    const newExerciseGroups = [...exerciseGroups];
    newExerciseGroups[groupIndex].exercises.push({
      name: "",
      sets: 0,
      repetitions: 0,
    });

    setExerciseGroups(newExerciseGroups);
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      exercises: newExerciseGroups,
    }));
  };

  const [userProfile, setUserProfile] = useState<UserProfile>({
    exercises: [],
  });

  const handleExerciseChange = (
    groupIndex: number,
    exerciseIndex: number,
    updatedExercise: Partial<Exercise>
  ) => {
    const newExerciseGroups = [...exerciseGroups];
    newExerciseGroups[groupIndex].exercises[exerciseIndex] = {
      ...newExerciseGroups[groupIndex].exercises[exerciseIndex],
      ...updatedExercise,
    };

    setExerciseGroups(newExerciseGroups);
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      exercises: newExerciseGroups,
    }));
  };
  const handleDaysPerWeekChange = (_: Event, value: number | number[]) => {
    const numDays = value as number;
    setDaysPerWeek(numDays);

    const updatedGroups: ExerciseGroup[] = Array.from(
      { length: numDays },
      (_, i) => ({
        day: i + 1,
        exercises: exerciseGroups[i]?.exercises || [],
      })
    );

    setExerciseGroups(updatedGroups);
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      trainingDays: numDays,
      exercises: updatedGroups,
    }));
  };
  const [isModalOpen] = useState(false);
  const handleSave = () => {
    console.log("Saving training plan:", userProfile);
  };
  return (
    <DefaultLayout isModalOpen={isModalOpen}>
      <Breadcrumb pageName="Plano de Treino" />
      <div>
        <Typography variant="subtitle1">
          Número de dias de exercício por semana:
        </Typography>
        <div className="w-full max-w-sm mx-auto">
          <Slider
            value={daysPerWeek}
            onChange={handleDaysPerWeekChange}
            aria-labelledby="slider-label"
            step={1}
            marks
            min={1}
            max={7}
            valueLabelDisplay="auto"
          />
        </div>

        {exerciseGroups.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="mb-4 border rounded-lg shadow-md flex flex-col w-full"
          >
            <button
              className="w-full p-4 text-left text-lg font-medium text-gray-800 bg-gray-200"
              type="button"
              onClick={() => {
                const element = document.getElementById(`day-${groupIndex}`);
                element?.classList.toggle("hidden");
              }}
            >
              Dia {group.day}
            </button>
            <div id={`day-${groupIndex}`} className="p-4">
              <div className="flex flex-wrap justify-center items-center gap-4 w-full">
                {group.exercises.map((exercise, exerciseIndex) => (
                  <div
                    key={exerciseIndex}
                    className="w-64 mb-3 p-3 bg-gray-100 rounded-md flex flex-col items-center"
                  >
                    <label className="block mb-1 text-sm">
                      Nome do exercício:
                    </label>
                    <select
                      className="block w-full px-2 py-1 mb-2 border rounded-md cursor-pointer dark:text-stone-800"
                      value={exercise.name}
                      onChange={(e) =>
                        handleExerciseChange(groupIndex, exerciseIndex, {
                          name: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled>
                        Selecione um exercício
                      </option>
                      {availableExercises.map((availableExercise) => (
                        <option
                          key={availableExercise}
                          value={availableExercise}
                        >
                          {availableExercise}
                        </option>
                      ))}
                    </select>

                    {/* Number of Sets */}
                    <label className="block mb-1 text-sm">
                      Número de sets:
                    </label>
                    <div className="flex items-center mb-2">
                      <button
                        className="w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                        onClick={() => {
                          const updatedSets = Math.max(1, exercise.sets - 1);
                          handleExerciseChange(groupIndex, exerciseIndex, {
                            sets: updatedSets,
                          });
                        }}
                      >
                        <FiMinus size={14} />
                      </button>
                      <input
                        className="w-16 text-center mx-2 dark:text-stone-800"
                        type="number"
                        value={exercise.sets}
                        readOnly
                      />
                      <button
                        className="w-6 h-6 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
                        onClick={() => {
                          const newExerciseGroups = [...exerciseGroups];
                          newExerciseGroups[groupIndex].exercises[
                            exerciseIndex
                          ].sets += 1;
                          setExerciseGroups(newExerciseGroups);
                        }}
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>

                    {/* Number of Repetitions */}
                    <label className="block mb-1 text-sm">
                      Número de repetições:
                    </label>
                    <div className="flex items-center mb-2">
                      <button
                        className="w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                        onClick={() => {
                          const updatedReps = Math.max(
                            1,
                            exercise.repetitions - 1
                          );
                          handleExerciseChange(groupIndex, exerciseIndex, {
                            repetitions: updatedReps,
                          });
                        }}
                      >
                        <FiMinus size={14} />
                      </button>
                      <input
                        className="w-16 text-center mx-2 dark:text-stone-800"
                        type="number"
                        value={exercise.repetitions || 0}
                        readOnly
                      />
                      <button
                        className="w-6 h-6 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
                        onClick={() => {
                          const updatedReps = exercise.repetitions + 1;
                          handleExerciseChange(groupIndex, exerciseIndex, {
                            repetitions: updatedReps,
                          });
                        }}
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>

                    {/* Remove Exercise Button */}
                    <button
                      className="mt-2 flex items-center justify-center px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                      onClick={() => {
                        const newExerciseGroups = [...exerciseGroups];
                        newExerciseGroups[groupIndex].exercises.splice(
                          exerciseIndex,
                          1
                        );
                        setExerciseGroups(newExerciseGroups);
                      }}
                    >
                      <FiTrash className="mr-2" color="white" />
                      Remover
                    </button>
                  </div>
                ))}
                <button
                  className="w-28 mb-3 p-3 bg-gray-100 text-center text-gray-600 rounded-md border-dashed border-2 border-gray-300 flex flex-col items-center justify-center hover:bg-gray-200 transition-all"
                  onClick={() => handleAddExercise(groupIndex)}
                >
                  <FaPlus className="mb-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
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

export default ExercisePlanDetails;
