import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLoayout";

const NewEvaluation: React.FC = () => {
  // State variables for form inputs
  const [date, setDate] = useState("");
  const [evaluator, setEvaluator] = useState("");
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [bmi, setBmi] = useState<number | "">("");
  const [waist, setWaist] = useState<number | "">("");
  const [hip, setHip] = useState<number | "">("");
  const [arm, setArm] = useState<number | "">("");
  const [thigh, setThigh] = useState<number | "">("");
  const [calf, setCalf] = useState<number | "">("");
  const [abdomen, setAbdomen] = useState<number | "">("");
  const [triceps, setTriceps] = useState<number | "">("");
  const [biceps, setBiceps] = useState<number | "">("");
  const [subscapular, setSubscapular] = useState<number | "">("");
  const [suprailiac, setSuprailiac] = useState<number | "">("");
  const [abdominal, setAbdominal] = useState<number | "">("");
  const [chest, setChest] = useState<number | "">("");
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | "">("");
  const [leanMass, setLeanMass] = useState<number | "">("");
  const [fatMass, setFatMass] = useState<number | "">("");
  const [bmr, setBmr] = useState<number | "">("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [dietaryHabits, setDietaryHabits] = useState("");
  const [remarks, setRemarks] = useState("");

  // Effect to calculate BMI when weight or height changes
  useEffect(() => {
    if (weight && height) {
      const heightInMeters = height / 100; // Convert cm to meters
      const calculatedBMI = weight / (heightInMeters * heightInMeters);
      setBmi(Number(calculatedBMI.toFixed(1))); // Round to 1 decimal place and convert to number
    } else {
      setBmi(""); // This keeps the type consistent as a string
    }
  }, [weight, height]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newEvaluation = {
      date,
      evaluator,
      weight,
      height,
      bmi,
      waist,
      hip,
      arm,
      thigh,
      calf,
      abdomen,
      triceps,
      biceps,
      subscapular,
      suprailiac,
      abdominal,
      chest,
      bodyFatPercentage,
      leanMass,
      fatMass,
      bmr,
      bloodPressure,
      dietaryHabits,
      remarks,
    };
    console.log("New Evaluation Submitted:", newEvaluation);

    // Resetting form fields
    setDate("");
    setEvaluator("");
    setWeight("");
    setHeight("");
    setBmi("");
    setWaist("");
    setHip("");
    setArm("");
    setThigh("");
    setCalf("");
    setAbdomen("");
    setTriceps("");
    setBiceps("");
    setSubscapular("");
    setSuprailiac("");
    setAbdominal("");
    setChest("");
    setBodyFatPercentage("");
    setLeanMass("");
    setFatMass("");
    setBmr("");
    setBloodPressure("");
    setDietaryHabits("");
    setRemarks("");
  };

  const [isOpen] = useState(false);

  return (
    <DefaultLayout isModalOpen={isOpen}>
      <Breadcrumb pageName="New Physical Evaluation" />
      <div className="w-full grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={handleSubmit}>
              <div className="p-6.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Date and Evaluator */}
                <div className="mb-4.5">
                  <label
                    htmlFor="date"
                    className="mb-2.5 block text-black dark:text-white"
                  >
                    Data
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>
                <div className="mb-4.5">
                  <label
                    htmlFor="evaluator"
                    className="mb-2.5 block text-black dark:text-white"
                  >
                    Nome do Avaliador
                  </label>
                  <input
                    type="text"
                    id="evaluator"
                    value={evaluator}
                    onChange={(e) => setEvaluator(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>

                {/* Body Measurements */}
                <div className="mb-4.5 col-span-full">
                  <h3 className="text-lg font-medium text-black dark:text-white">
                    Medições Corporais
                  </h3>
                </div>
                {[
                  {
                    label: "Peso Corporal (kg)",
                    id: "weight",
                    state: weight,
                    setState: setWeight,
                  },
                  {
                    label: "Altura (cm)",
                    id: "height",
                    state: height,
                    setState: setHeight,
                  },
                  {
                    label: "IMC (kg/m2)",
                    id: "bmi",
                    state: bmi,
                    setState: setBmi,
                    readOnly: true,
                  }, 
                  {
                    label: "Cintura (cm)",
                    id: "waist",
                    state: waist,
                    setState: setWaist,
                  },
                  {
                    label: "Anca (cm)",
                    id: "hip",
                    state: hip,
                    setState: setHip,
                  },
                  {
                    label: "Braço (cm)",
                    id: "arm",
                    state: arm,
                    setState: setArm,
                  },
                  {
                    label: "Coxa (cm)",
                    id: "thigh",
                    state: thigh,
                    setState: setThigh,
                  },
                  {
                    label: "Perna (cm)",
                    id: "calf",
                    state: calf,
                    setState: setCalf,
                  },
                  {
                    label: "Abdómen (cm)",
                    id: "abdomen",
                    state: abdomen,
                    setState: setAbdomen,
                  },
                ].map(({ label, id, state, setState, readOnly }) => (
                  <div key={id} className="mb-4.5">
                    <label
                      htmlFor={id}
                      className="mb-2.5 block text-black dark:text-white"
                    >
                      {label}
                    </label>
                    <input
                      type="number"
                      id={id}
                      value={state}
                      onChange={(e) =>
                        setState(
                          e.target.value === ""
                            ? ""
                            : parseFloat(e.target.value)
                        )
                      }
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        readOnly ? "bg-gray-200" : ""
                      }`}
                      readOnly={readOnly}
                    />
                  </div>
                ))}

                {/* Skinfold Measurements */}
                <div className="mb-4.5 col-span-full">
                  <h3 className="text-lg font-medium text-black dark:text-white">
                    Medições da Pele
                  </h3>
                </div>
                {[
                  {
                    label: "Tríceps (mm)",
                    id: "triceps",
                    state: triceps,
                    setState: setTriceps,
                  },
                  {
                    label: "Díceps (mm)",
                    id: "biceps",
                    state: biceps,
                    setState: setBiceps,
                  },
                  {
                    label: "Subescapular (mm)",
                    id: "subscapular",
                    state: subscapular,
                    setState: setSubscapular,
                  },
                  {
                    label: "Suprailiaco (mm)",
                    id: "suprailiac",
                    state: suprailiac,
                    setState: setSuprailiac,
                  },
                  {
                    label: "Abdominal (mm)",
                    id: "abdominal",
                    state: abdominal,
                    setState: setAbdominal,
                  },
                  {
                    label: "Coxa (mm)",
                    id: "thigh",
                    state: thigh,
                    setState: setThigh,
                  },
                  {
                    label: "Peito (mm)",
                    id: "chest",
                    state: chest,
                    setState: setChest,
                  },
                  
                ].map(({ label, id, state, setState }) => (
                  <div key={id} className="mb-4.5">
                    <label
                      htmlFor={id}
                      className="mb-2.5 block text-black dark:text-white"
                    >
                      {label}
                    </label>
                    <input
                      type="number"
                      id={id}
                      value={state}
                      onChange={(e) =>
                        setState(
                          e.target.value === ""
                            ? ""
                            : parseFloat(e.target.value)
                        )
                      }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                ))}

                {/* Other Measurements */}
                <div className="mb-4.5 col-span-full">
                  <h3 className="text-lg font-medium text-black dark:text-white">
                    Outras Medições
                  </h3>
                </div>
                {[
                  {
                    label: "Percentagem de Gordura Corporal (%)",
                    id: "bodyFatPercentage",
                    state: bodyFatPercentage,
                    setState: setBodyFatPercentage,
                  },
                  {
                    label: "Massa Magra (kg)",
                    id: "leanMass",
                    state: leanMass,
                    setState: setLeanMass,
                  },
                  {
                    label: "Massa de Gordura (kg)",
                    id: "fatMass",
                    state: fatMass,
                    setState: setFatMass,
                  },
                  {
                    label: "Taxa Metabólica Basal (kcal)",
                    id: "bmr",
                    state: bmr,
                    setState: setBmr,
                  },
                  
                ].map(({ label, id, state, setState }) => (
                  <div key={id} className="mb-4.5">
                    <label
                      htmlFor={id}
                      className="mb-2.5 block text-black dark:text-white"
                    >
                      {label}
                    </label>
                    <input
                      type="number"
                      id={id}
                      value={state}
                      onChange={(e) =>
                        setState(
                          e.target.value === ""
                            ? ""
                            : parseFloat(e.target.value)
                        )
                      }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                ))}

                {/* Blood Pressure and Dietary Habits */}
                <div className="mb-4.5">
                  <label
                    htmlFor="bloodPressure"
                    className="mb-2.5 block text-black dark:text-white"
                  >
                    Pressão Arterial
                  </label>
                  <input
                    type="text"
                    id="bloodPressure"
                    value={bloodPressure}
                    onChange={(e) => setBloodPressure(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                {/* Remarks */}
                <div className="mb-4.5">
                  <label
                    htmlFor="remarks"
                    className="mb-2.5 block text-black dark:text-white"
                  >
                    Observações
                  </label>
                  <textarea
                    id="remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="col-span-full flex justify-center mt-4">
                  <button
                    type="submit"
                    className="rounded bg-primary py-3 px-8 text-base font-medium text-white"
                  >
                    Submeter
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default NewEvaluation;
