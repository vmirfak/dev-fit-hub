import React, { useState } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLoayout";
import Modal from "../components/Modal";

// Updated data structure to organize exercises by day
const exercisePlansData = [
  {
    planName: "Strength Training Program",
    description: "A 4-week program focused on building strength and endurance.",
    weeklyPlan: [
      {
        day: "Day 1",
        exercises: [
          {
            name: "Squats",
            sets: 4,
            repetitions: 10,
            duration: "N/A",
            instructions: "Keep your back straight.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Bench Press",
            sets: 3,
            repetitions: 8,
            duration: "N/A",
            instructions: "Lower the bar to your chest.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Deadlifts",
            sets: 4,
            repetitions: 10,
            duration: "N/A",
            instructions: "Maintain a straight back.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Plank",
            sets: 3,
            repetitions: "N/A",
            duration: "1 minute",
            instructions: "Hold your body in a straight line.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
        ],
      },
      {
        day: "Day 2",
        exercises: [
          {
            name: "Pull-ups",
            sets: 3,
            repetitions: 5,
            duration: "N/A",
            instructions: "Pull your chin above the bar.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Push-ups",
            sets: 4,
            repetitions: 12,
            duration: "N/A",
            instructions: "Keep your body straight.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Lunges",
            sets: 3,
            repetitions: 10,
            duration: "N/A",
            instructions: "Step forward and lower your hips.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Bicycle Crunches",
            sets: 3,
            repetitions: 15,
            duration: "N/A",
            instructions: "Touch your elbow to the opposite knee.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
        ],
      },
      {
        day: "Day 3",
        exercises: [
          {
            name: "Barbell Rows",
            sets: 4,
            repetitions: 10,
            duration: "N/A",
            instructions: "Keep your back straight.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Shoulder Press",
            sets: 3,
            repetitions: 10,
            duration: "N/A",
            instructions: "Press above your head.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Leg Press",
            sets: 4,
            repetitions: 12,
            duration: "N/A",
            instructions: "Push with your feet.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Jumping Jacks",
            sets: 3,
            repetitions: 20,
            duration: "N/A",
            instructions: "Jump while spreading your arms and legs.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
        ],
      },
      {
        day: "Day 4",
        exercises: [
          {
            name: "Zumba Class",
            sets: 1,
            repetitions: "N/A",
            duration: "45 minutes",
            instructions: "Follow the instructor.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Side Plank",
            sets: 3,
            repetitions: "N/A",
            duration: "30 seconds each side",
            instructions: "Keep your body straight.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Burpees",
            sets: 3,
            repetitions: 10,
            duration: "N/A",
            instructions: "Squat, jump back, and jump up.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Russian Twists",
            sets: 3,
            repetitions: 15,
            duration: "N/A",
            instructions: "Twist your torso.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
        ],
      },
    ],
  },
  {
    planName: "Cardio Conditioning Plan",
    description: "A 2-week plan to improve cardiovascular health.",
    weeklyPlan: [
      {
        day: "Day 1",
        exercises: [
          {
            name: "Running",
            sets: "N/A",
            repetitions: "N/A",
            duration: "30 minutes",
            instructions: "Maintain a steady pace.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Cycling",
            sets: "N/A",
            repetitions: "N/A",
            duration: "45 minutes",
            instructions: "Keep a consistent rhythm.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Jump Rope",
            sets: 5,
            repetitions: "1 minute",
            duration: "N/A",
            instructions: "Skip rope at a steady pace.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "High Knees",
            sets: 3,
            repetitions: 30,
            duration: "N/A",
            instructions: "Drive your knees to your chest.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
        ],
      },
      {
        day: "Day 2",
        exercises: [
          {
            name: "Rowing",
            sets: 1,
            repetitions: "N/A",
            duration: "20 minutes",
            instructions: "Row at a moderate pace.",
            videoLink: "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Burpees",
            sets: 3,
            repetitions: 10,
            duration: "N/A",
            instructions: "Squat, jump back, and jump up.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Jumping Jacks",
            sets: 3,
            repetitions: 20,
            duration: "N/A",
            instructions: "Jump while spreading your arms and legs.",
            videoLink:
              "https://www.youtube.com/watch?v=U3HlEF_E9fo",
          },
          {
            name: "Mountain Climbers",
            sets: 3,
            repetitions: 15,
            duration: "N/A",
            instructions: "Drive your knees towards your chest.",
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
                <h4 className="text-lg font-medium mb-2">
                  Weekly Training Schedule
                </h4>

                {/* Day List */}
                {plan.weeklyPlan.map((dayPlan, dayIndex) => (
                  <div key={dayIndex} className="mb-4">
                    {/* Day Header */}
                    <div
                      className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 cursor-pointer rounded"
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
                      <div className="p-3 border border-gray-300 dark:border-gray-600 rounded mt-2 bg-gray-50 dark:bg-gray-800">
                        <h5 className="text-md font-medium mb-2">Exercises</h5>

                        {/* Exercise List */}
                        {dayPlan.exercises.map((exercise, exerciseIndex) => (
                          <div key={exerciseIndex} className="mb-4">
                            {/* Exercise Header */}
                            <div
                              className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 cursor-pointer rounded"
                              onClick={() =>
                                toggleExerciseExpansion(exerciseIndex)
                              }
                            >
                              <div>
                                <h6 className="text-sm font-semibold">
                                  {exercise.name}
                                </h6>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Sets: {exercise.sets} | Repetitions:{" "}
                                  {exercise.repetitions} | Duration:{" "}
                                  {exercise.duration}
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
                                  <strong>Instructions:</strong>{" "}
                                  {exercise.instructions}
                                </p>
                                <button
                                  className="mt-2 text-blue-500"
                                  onClick={() => {
                                    setIsModalOpen(true);
                                    setVideoUrl(exercise.videoLink);
                                    setselectedExerciseName(exercise.name);
                                  }}
                                >
                                  Watch Video
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
