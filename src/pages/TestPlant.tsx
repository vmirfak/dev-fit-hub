import { useState } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLoayout";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import { GrNext, GrPrevious } from "react-icons/gr";

const steps = [
  "User Profile Setup",
  "Nutritional Assessment",
  "Meal Plan Structure",
  "Food Selection & Recipes",
  "Review and Finalize Plan",
];

const DietPlan = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userProfile, setUserProfile] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "",
    healthGoals: "",
    dietaryRestrictions: "",
    foodPreferences: "",
    currentDiet: "", // New field
    dailyCaloricIntake: "", // New field
    allergies: "", // New field
    healthConditions: "", // New field
  });
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
    // Calculate nutritional assessment if moving to the next step
    if (activeStep === 0) {
      calculateNutritionalNeeds();
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setUserProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={userProfile.age}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    placeholder="Enter age"
                    required
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={userProfile.gender}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white cursor-pointer"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Weight */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={userProfile.weight}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    placeholder="Enter weight"
                    required
                  />
                </div>

                {/* Height */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={userProfile.height}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    placeholder="Enter height"
                    required
                  />
                </div>

                {/* Activity Level */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Activity Level
                  </label>
                  <select
                    name="activityLevel"
                    value={userProfile.activityLevel}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white cursor-pointer"
                    required
                  >
                    <option value="">Select activity level</option>
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Light activity</option>
                    <option value="moderate">Moderate activity</option>
                    <option value="active">Active</option>
                    <option value="very-active">Very active</option>
                  </select>
                </div>

                {/* Health Goals */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Health Goals
                  </label>
                  <input
                    type="text"
                    name="healthGoals"
                    value={userProfile.healthGoals}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    placeholder="Enter your health goals"
                    required
                  />
                </div>

                {/* Dietary Restrictions */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Dietary Restrictions
                  </label>
                  <input
                    type="text"
                    name="dietaryRestrictions"
                    value={userProfile.dietaryRestrictions}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    placeholder="Enter any dietary restrictions"
                  />
                </div>

                {/* Food Preferences */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Food Preferences
                  </label>
                  <input
                    type="text"
                    name="foodPreferences"
                    value={userProfile.foodPreferences}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    placeholder="Enter food preferences"
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
                    Current Diet
                  </label>
                  <textarea
                    name="currentDiet"
                    value={userProfile.currentDiet}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    placeholder="Describe your current diet"
                    rows={4}
                    required
                  />
                </div>

                {/* Daily Caloric Intake */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Daily Caloric Intake (kcal)
                  </label>
                  <input
                    type="number"
                    name="dailyCaloricIntake"
                    value={userProfile.dailyCaloricIntake}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    placeholder="Enter daily caloric intake"
                    required
                  />
                </div >
                {/* Display Caloric Needs */}
                <div className="md:col-span-2">
                  <Typography className="text-center">
                    Your calculated caloric needs are:{" "}
                    <strong>{caloricNeeds.toFixed(1)} kcal</strong>
                  </Typography>
                </div>
                {/* Preferred Macronutrient Ratios */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Preferred Macronutrient Ratios
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white">
                        Carbs [g]
                      </label>
                      <input
                        type="number"
                        name="carbsRatio"
                        value={macronutrients.carbs}
                        onChange={handleGoalAdjustmentChange}
                        className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        placeholder="Enter carbs ratio"
                        min={0}
                        max={100}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white">
                        Protein [g]
                      </label>
                      <input
                        type="number"
                        name="proteinRatio"
                        value={macronutrients.protein}
                        onChange={handleGoalAdjustmentChange}
                        className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        placeholder="Enter protein ratio"
                        min={0}
                        max={100}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white">
                        Fats [g]
                      </label>
                      <input
                        type="number"
                        name="fatRatio"
                        value={macronutrients.fats}
                        onChange={handleGoalAdjustmentChange}
                        className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        placeholder="Enter fats ratio"
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
                    Allergies
                  </label>
                  <input
                    type="text"
                    name="allergies"
                    value={userProfile.allergies}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    placeholder="List any allergies"
                  />
                </div>

                {/* Health Conditions */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Health Conditions
                  </label>
                  <input
                    type="text"
                    name="healthConditions"
                    value={userProfile.healthConditions}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    placeholder="List any health conditions"
                  />
                </div>
              </div>
            </form>
          </div>
        );

      case 2: // Meal Plan Structure
        return (
          <Typography variant="body1">
            <strong>Meal Plan Structure:</strong> Determine how many meals per
            day, their timing, portion sizes, and nutritional focus based on the
            calculated needs.
          </Typography>
        );
      case 3: // Food Selection & Recipes
        return (
          <Typography variant="body1">
            <strong>Food Selection & Recipes:</strong> Select appropriate foods
            and recipes that match the user’s dietary preferences and
            nutritional needs, offering customization options.
          </Typography>
        );
      case 4: // Review and Finalize Plan
        return (
          <Typography variant="body1">
            <strong>Review and Finalize Plan:</strong> Display the complete diet
            plan with all meals, nutritional breakdowns, and customizable
            options for user approval.
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <DefaultLayout isModalOpen={false}>
      <Breadcrumb pageName="Diet Plan" />
      <div className="overflow-hidden p-6 mt-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <span className="font-semibold text-gray-700">{label}</span>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className="flex flex-col items-center mt-6">
          {isLastStep ? (
            <Typography variant="h6" className="text-green-600">
              All steps completed
            </Typography>
          ) : (
            <div className="text-center">
              <Typography variant="body1" className="mb-4">
                Step {activeStep + 1}: {steps[activeStep]}
              </Typography>
              <div className="mb-4">{renderStepContent(activeStep)}</div>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  className="transition duration-600 transform hover:scale-105 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full"
                  startIcon={<GrPrevious />}
                >
                  Back
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className="transition duration-600 transform hover:scale-105 bg-green-600 text-white hover:bg-green-700 rounded-full"
                  endIcon={<GrNext />}
                >
                  {isLastStep ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DietPlan;
