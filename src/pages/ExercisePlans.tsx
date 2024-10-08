import React, { useState } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLoayout";

// Dummy data for exercise plans
const exercisePlansData = [
  {
    planName: "Strength Training Program",
    description: "A 4-week program focused on building strength and endurance.",
    exercises: [
      {
        name: "Squats",
        sets: 4,
        repetitions: 10,
        duration: "N/A",
        instructions:
          "Keep your back straight, and go as low as you can while maintaining balance.",
      },
      {
        name: "Bench Press",
        sets: 3,
        repetitions: 8,
        duration: "N/A",
        instructions: "Lower the bar to your chest and press up explosively.",
      },
      {
        name: "Plank",
        sets: 3,
        repetitions: "N/A",
        duration: "1 minute",
        instructions:
          "Hold your body in a straight line, engaging your core muscles.",
      },
    ],
  },
  {
    planName: "Cardio Conditioning Plan",
    description: "A 2-week plan to improve cardiovascular health.",
    exercises: [
      {
        name: "Running",
        sets: "N/A",
        repetitions: "N/A",
        duration: "30 minutes",
        instructions: "Maintain a steady pace and focus on breathing control.",
      },
      {
        name: "Cycling",
        sets: "N/A",
        repetitions: "N/A",
        duration: "45 minutes",
        instructions:
          "Keep a consistent pedaling rhythm and adjust resistance as needed.",
      },
    ],
  },
];

const ExercisePlans: React.FC = () => {
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null);
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);

  const togglePlanExpansion = (index: number) => {
    setExpandedPlan(expandedPlan === index ? null : index);
    setExpandedExercise(null); // Close any expanded exercises when switching plans
  };

  const toggleExerciseExpansion = (index: number) => {
    setExpandedExercise(expandedExercise === index ? null : index);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Exercise Plans" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">

        {/* Exercise Plans List */}
        {exercisePlansData.map((plan, planIndex) => (
          <div key={planIndex} className="mb-6">
            {/* Plan Header */}
            <div
              className="flex justify-between items-center p-4 bg-blue-100 dark:bg-gray-800 cursor-pointer rounded-lg"
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
                <h4 className="text-lg font-medium mb-2">Exercises</h4>

                {/* Exercise List */}
                {plan.exercises.map((exercise, exerciseIndex) => (
                  <div key={exerciseIndex} className="mb-4">
                    {/* Exercise Header */}
                    <div
                      className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 cursor-pointer rounded"
                      onClick={() => toggleExerciseExpansion(exerciseIndex)}
                    >
                      <div>
                        <h5 className="text-md font-semibold">
                          {exercise.name}
                        </h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Sets: {exercise.sets} | Repetitions:{" "}
                          {exercise.repetitions} | Duration: {exercise.duration}
                        </p>
                      </div>
                      <span className="text-xl ">
                        {expandedExercise === exerciseIndex ? "-" : "+"}
                      </span>
                    </div>

                    {/* Expandable Exercise Details */}
                    {expandedExercise === exerciseIndex && (
                      <div className="p-3 border border-gray-300 dark:border-gray-600 rounded mt-2 bg-gray-50 dark:bg-gray-800">
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          <strong>Instructions:</strong> {exercise.instructions}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default ExercisePlans;
