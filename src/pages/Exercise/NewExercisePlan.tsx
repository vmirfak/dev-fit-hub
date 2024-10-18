import { useState, ChangeEventHandler, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLoayout";
import { FaPlus } from "react-icons/fa"; // Import Icon
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Slider,
} from "@mui/material";
import { ActivityLevel, HealthGoals } from "../../enum/enum";
import { fileToDataString } from "../../utils/utils";
import { GrNext, GrPrevious } from "react-icons/gr";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { FiMinus, FiPlus, FiTrash } from "react-icons/fi";

interface Exercise {
  name: string;
  sets: number;
  amountOfSets: number;
  repetitions: number;
}

interface ExerciseGroup {
  day: number;
  exercises: Exercise[];
}

const steps = [
  "Perfil do Utilizador",
  "Avaliação Física",
  "Planeamento",
  "Revisão e Finalização do Plano",
];

interface Measurement {
  name: string;
  value: string;
}

interface UserProfile {
  age: string;
  name: string;
  gender: string;
  email: string;
  weight: string;
  height: string;
  activityLevel: ActivityLevel;
  healthGoals: HealthGoals;
  healthConditions: string[];
  images: string[];
  measurements: Measurement[];
  exercises: ExerciseGroup[];
  pressaoArterial: string;
  [key: string]: any;
}

const NewExercisePlan = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [previewImgUrls, setPreviewImgUrls] = useState<string[]>([]);
  const isLastStep = activeStep === steps.length - 1;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [, setSelectedImages] = useState<FileList | null>(null);
  const [exerciseGroups, setExerciseGroups] = useState<ExerciseGroup[]>(
    Array.from({ length: 3 }, (_, i) => ({
      day: i + 1,
      exercises: [],
    }))
  );

  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: "",
    gender: "",
    weight: "",
    name: "",
    height: "",
    email: "",
    activityLevel: ActivityLevel.Sedentaria,
    healthGoals: HealthGoals.ManterPeso,
    images: [],
    healthConditions: [],
    measurements: [
      { name: "cintura", value: "" },
      { name: "quadril", value: "" },
      { name: "braco", value: "" },
      { name: "coxa", value: "" },
      { name: "panturrilha", value: "" },
      { name: "abdomen", value: "" },
      { name: "triceps", value: "" },
      { name: "biceps", value: "" },
      { name: "subescapular", value: "" },
      { name: "suprailiaco", value: "" },
      { name: "abdominal", value: "" },
      { name: "peito", value: "" },
      { name: "percentualGordura", value: "" },
      { name: "massaMagra", value: "" },
      { name: "massaGorda", value: "" },
    ],
    exercises: [],
    pressaoArterial: "",
  });
  const availableExercises = [
    "Flexões",
    "Agachamentos",
    "Levantamento Terra",
    "Supino",
    "Remada",
  ];

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

  const handleAddExercise = (groupIndex: number) => {
    const newExerciseGroups = [...exerciseGroups];
    newExerciseGroups[groupIndex].exercises.push({
      name: "",
      sets: 0,
      amountOfSets: 0,
      repetitions: 0,
    });

    setExerciseGroups(newExerciseGroups);
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      exercises: newExerciseGroups,
    }));
  };

  const handleNext = () => {
    const missingFields = [];

    if (activeStep === 0) {
      if (!userProfile.name) {
        missingFields.push("nome");
      }
      if (!userProfile.email) {
        missingFields.push("e-mail");
      }
      if (!userProfile.gender) {
        missingFields.push("género");
      }
    }

    if (missingFields.length > 0) {
      setSnackbarMessage(`Campos em falta: ${missingFields.join(", ")}`);
      setOpenSnackbar(true);
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const files = event.target.files;
    if (!files) {
      return;
    }

    const urls: string[] = [];

    // Process each selected file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const imgUrl = await fileToDataString(file);
        urls.push(imgUrl);
      } catch (error) {
        console.log(error);
      }
    }

    // Update state
    setSelectedImages(files);
    setPreviewImgUrls(urls);
    setUserProfile((prevState) => ({
      ...prevState,
      images: urls,
    }));
    console.log(urls);
  };

  const [medicoes, setMedicoes] = useState({
    cintura: "",
    quadril: "",
    braco: "",
    coxa: "",
    panturrilha: "",
    abdomen: "",
    triceps: "",
    biceps: "",
    subescapular: "",
    suprailiaco: "",
    abdominal: "",
    peito: "",
    percentualGordura: "",
    massaMagra: "",
    massaGorda: "",
    pressaoArterial: "",
    habitosAlimentares: "",
  });

  useEffect(() => {
    setUserProfile((prevUserProfile) => ({
      ...prevUserProfile,
      measurements: Object.entries(medicoes).map(([name, value]) => ({
        name,
        value,
      })),
    }));
  }, [medicoes]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    // Update each individual measurement in medicoes state
    setMedicoes((prevMedicoes) => ({
      ...prevMedicoes,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div>
            <form>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Nome */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Nome
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={userProfile.name}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    placeholder="Introduz o Nome"
                    required
                  />
                </div>

                {/* E-mail */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    E-mail
                  </label>
                  <input
                    type="email" // Changed to email type for better validation
                    name="email"
                    value={userProfile.email}
                    onChange={handleInputChange}
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    placeholder="Introduz o e-mail"
                    required
                  />
                </div>

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
                    <option value="">Seleciona Género</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
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
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Nível de Atividade
                  </label>
                  <select
                    name="activityLevel"
                    value={userProfile.activityLevel}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        activityLevel: Number(e.target.value) as ActivityLevel,
                      })
                    }
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white cursor-pointer"
                    required
                  >
                    <option value={ActivityLevel.Sedentaria}>Sedentária</option>
                    <option value={ActivityLevel.Ligeira}>Ligeira</option>
                    <option value={ActivityLevel.Moderada}>Moderada</option>
                    <option value={ActivityLevel.Ativa}>Ativa</option>
                    <option value={ActivityLevel.MuitoAtiva}>
                      Muito Ativa
                    </option>
                  </select>
                </div>

                {/* Health Goals */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Objetivos
                  </label>
                  <select
                    name="healthGoals"
                    value={userProfile.healthGoals}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        healthGoals: Number(e.target.value) as HealthGoals,
                      })
                    }
                    className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white cursor-pointer"
                    required
                  >
                    <option value={HealthGoals.PerderPeso}>Perder Peso</option>
                    <option value={HealthGoals.GanharMassaMuscular}>
                      Ganhar Massa Muscular
                    </option>
                    <option value={HealthGoals.ManterPeso}>Manter Peso</option>
                    <option value={HealthGoals.MelhorarCondicaoFisica}>
                      Melhorar Condição Física
                    </option>
                  </select>
                </div>

                {/* Upload Photos */}
                <div className="col-span-1 md:col-span-2 flex flex-col items-center">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Carregar Fotos
                  </label>
                  <div className="flex flex-col items-center">
                    {previewImgUrls.length > 0 && (
                      <div className="image_wrapper flex flex-wrap gap-4 mb-4 justify-center">
                        {previewImgUrls.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Preview ${index}`}
                            className="w-32 h-32 object-cover rounded-md border border-gray-300"
                          />
                        ))}
                      </div>
                    )}
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple // Allow multiple file uploads
                      className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        );
      case 1:
        return (
          <div>
            {/* Dobras Subcutâneas */}
            <Typography variant="subtitle1">
              Dobras Subcutâneas (em mm):
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label htmlFor="subescapular" className="block mb-1">
                  Subescapular
                </label>
                <input
                  type="number"
                  name="subescapular"
                  id="subescapular"
                  className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  onChange={handleChange}
                  placeholder="mm"
                />
              </div>
              <div>
                <label htmlFor="peitoral" className="block mb-1">
                  Peitoral
                </label>
                <input
                  type="number"
                  name="peitoral"
                  id="peitoral"
                  className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  onChange={handleChange}
                  placeholder="mm"
                />
              </div>
              <div>
                <label htmlFor="tricipial" className="block mb-1">
                  Tricipial
                </label>
                <input
                  type="number"
                  name="tricipial"
                  id="tricipial"
                  className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  onChange={handleChange}
                  placeholder="mm"
                />
              </div>
              <div>
                <label htmlFor="abdominal" className="block mb-1">
                  Abdominal
                </label>
                <input
                  type="number"
                  name="abdominal"
                  id="abdominal"
                  className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  onChange={handleChange}
                  placeholder="mm"
                />
              </div>
              <div>
                <label htmlFor="iliaca" className="block mb-1">
                  Iliaca
                </label>
                <input
                  type="number"
                  name="iliaca"
                  id="iliaca"
                  className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  onChange={handleChange}
                  placeholder="mm"
                />
              </div>
              <div>
                <label htmlFor="crural" className="block mb-1">
                  Crural
                </label>
                <input
                  type="number"
                  name="crural"
                  id="crural"
                  className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  onChange={handleChange}
                  placeholder="mm"
                />
              </div>
              <div>
                <label htmlFor="geminal" className="block mb-1">
                  Geminal
                </label>
                <input
                  type="number"
                  name="geminal"
                  id="geminal"
                  className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  onChange={handleChange}
                  placeholder="mm"
                />
              </div>
            </div>

            {/* Perímetros */}
            <Typography variant="subtitle1" className="mt-4">
              Perímetros (em cm):
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="bracoRelaxado" className="block mb-1">
                  Braço Relaxado
                </label>
                <input
                  type="number"
                  name="bracoRelaxado"
                  id="bracoRelaxado"
                  className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  onChange={handleChange}
                  placeholder="cm"
                />
              </div>
              <div>
                <label htmlFor="bracoTenso" className="block mb-1">
                  Braço Tenso
                </label>
                <input
                  type="number"
                  name="bracoTenso"
                  id="bracoTenso"
                  className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  onChange={handleChange}
                  placeholder="cm"
                />
              </div>
              <div>
                <label htmlFor="anca" className="block mb-1">
                  Anca
                </label>
                <input
                  type="number"
                  name="anca"
                  id="anca"
                  className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  onChange={handleChange}
                  placeholder="cm"
                />
              </div>
              <div>
                <label htmlFor="toraxica" className="block mb-1">
                  Torácica
                </label>
                <input
                  type="number"
                  name="toraxica"
                  id="toraxica"
                  className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  onChange={handleChange}
                  placeholder="cm"
                />
              </div>
              <div>
                <label htmlFor="cintura" className="block mb-1">
                  Cintura
                </label>
                <input
                  type="number"
                  name="cintura"
                  id="cintura"
                  className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  onChange={handleChange}
                  placeholder="cm"
                />
              </div>
              <div>
                <label htmlFor="geminalPerimetro" className="block mb-1">
                  Geminal
                </label>
                <input
                  type="number"
                  name="geminalPerimetro"
                  id="geminalPerimetro"
                  className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  onChange={handleChange}
                  placeholder="cm"
                />
              </div>
              <div>
                <label htmlFor="cruralPerimetro" className="block mb-1">
                  Crural
                </label>
                <input
                  type="number"
                  name="cruralPerimetro"
                  id="cruralPerimetro"
                  className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  onChange={handleChange}
                  placeholder="cm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="pressaoArterial" className="block mb-1 mt-8">
                Medição da Pressão Arterial
              </label>
              <input
                type="number"
                name="pressaoArterial"
                id="pressaoArterial"
                value={userProfile.pressaoArterial}
                onChange={handleInputChange}
                className="border border-stroke bg-gray-50 py-2 px-4 text-black rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                placeholder="mmHg"
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="block mt-8 mb-1">Condições Físicas</label>
              <div className="flex flex-wrap gap-4">
                {["Diabetes", "Hipertensão", "Asma", "Alergias"].map(
                  (condicao) => (
                    <div key={condicao} className="flex items-center">
                      <input
                        type="checkbox"
                        name="healthConditions"
                        value={condicao}
                        id={condicao}
                        checked={userProfile.healthConditions.includes(
                          condicao
                        )}
                        onChange={handleInputChange}
                        className="cursor-pointer scale-150 border border-stroke bg-gray-50 rounded-md focus:border-primary focus:ring focus:ring-primary/30 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                      />
                      <label htmlFor={condicao} className="ml-2">
                        {condicao}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
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
                    const element = document.getElementById(
                      `day-${groupIndex}`
                    );
                    element?.classList.toggle("hidden");
                  }}
                >
                  Dia {group.day}
                </button>
                <div id={`day-${groupIndex}`} className="hidden p-4">
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
                          className="block w-full px-2 py-1 mb-2 border rounded-md cursor-pointer"
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
                              const updatedSets = Math.max(
                                1,
                                exercise.amountOfSets - 1
                              );
                              handleExerciseChange(groupIndex, exerciseIndex, {
                                amountOfSets: updatedSets,
                              });
                            }}
                          >
                            <FiMinus size={14} />
                          </button>
                          <input
                            className="w-16 text-center mx-2"
                            type="number"
                            value={exercise.amountOfSets}
                            readOnly
                          />
                          <button
                            className="w-6 h-6 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
                            onClick={() => {
                              const newExerciseGroups = [...exerciseGroups];
                              newExerciseGroups[groupIndex].exercises[
                                exerciseIndex
                              ].amountOfSets += 1;
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
                            className="w-16 text-center mx-2"
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
                    {/* Ghost "Add Exercise" Button */}
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
          </div>
        );
      case 3:
        return (
    <div className="p-4">
      <Typography variant="h5" className="font-bold mb-4">
        Revisão e Finalização do Plano
      </Typography>

      {/* Dados do Perfil do Utilizador */}
      <section className="mb-4">
        <Typography variant="h6" className="font-semibold mb-2">
          Perfil do Utilizador
        </Typography>
        <ul>
          <li><strong>Nome:</strong> {userProfile.name}</li>
          <li><strong>E-mail:</strong> {userProfile.email}</li>
          <li><strong>Género:</strong> {userProfile.gender}</li>
          <li><strong>Idade:</strong> {userProfile.age}</li>
          <li><strong>Peso:</strong> {userProfile.weight} kg</li>
          <li><strong>Altura:</strong> {userProfile.height} cm</li>
          <li><strong>Nível de Atividade:</strong> {ActivityLevel[userProfile.activityLevel]}</li>
          <li><strong>Objetivos de Saúde:</strong> {HealthGoals[userProfile.healthGoals]}</li>
        </ul>
      </section>

      {/* Medições Físicas */}
      <section className="mb-4">
        <Typography variant="h6" className="font-semibold mb-2">
          Medições Físicas
        </Typography>
        <ul>
          {userProfile.measurements.map((measurement, index) => (
            <li key={index}>
              <strong>{measurement.name}:</strong> {measurement.value}
            </li>
          ))}
        </ul>
      </section>

      {/* Imagens Carregadas */}
      <section className="mb-4">
        <Typography variant="h6" className="font-semibold mb-2">
          Imagens Carregadas
        </Typography>
        <div className="grid grid-cols-3 gap-4">
          {previewImgUrls.map((url, index) => (
            <img key={index} src={url} alt={`Preview ${index}`} className="w-full h-auto rounded-lg" />
          ))}
        </div>
      </section>

      {/* Plano de Exercícios */}
      <section className="mb-4">
        <Typography variant="h6" className="font-semibold mb-2">
          Plano de Exercícios
        </Typography>
        {userProfile.exercises.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-4">
            <Typography variant="body1" className="font-medium">
              Dia {group.day}
            </Typography>
            <ul>
              {group.exercises.map((exercise, exerciseIndex) => (
                <li key={exerciseIndex}>
                  {exercise.name} - 
                  <strong> Séries:</strong> {exercise.sets} -  
                  <strong> Repetições:</strong> {exercise.repetitions}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
      default:
        return null;
    }
  };

  return (
    <DefaultLayout isModalOpen={false}>
      <Breadcrumb pageName="Criar novo Plano de Exercício" />
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
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                variant="filled"
                severity="error"
                onClose={handleCloseSnackbar}
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
            <div className="mb-10 mt-10">{renderStepContent(activeStep)}</div>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleBack}
                disabled={activeStep === 0}
                className="transition duration-600 transform hover:scale-105 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full"
                style={{ textTransform: "none" }}
                startIcon={<GrPrevious />}
              >
                Passo Anterior
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className="transition duration-600 transform hover:scale-105 bg-green-600 text-white hover:bg-green-700 rounded-full"
                style={{ textTransform: "none" }}
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

export default NewExercisePlan;
