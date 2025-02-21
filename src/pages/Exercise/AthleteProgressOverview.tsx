import { useState } from "react";
import {
  LineChart,
  BarChart,
  AreaChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLoayout";

// More realistic and varied weightlifting data
const progressData = [
  {
    week: "Semana 1",
    benchPress: 80,
    squat: 100,
    deadlift: 120,
    overheadPress: 50,
  },
  {
    week: "Semana 2",
    benchPress: 82,
    squat: 105,
    deadlift: 125,
    overheadPress: 52,
  },
  {
    week: "Semana 3",
    benchPress: 82,
    squat: 108,
    deadlift: 128,
    overheadPress: 52,
  },
  {
    week: "Semana 4",
    benchPress: 83,
    squat: 110,
    deadlift: 130,
    overheadPress: 53,
  },
  {
    week: "Semana 5",
    benchPress: 85,
    squat: 112,
    deadlift: 133,
    overheadPress: 55,
  },
  {
    week: "Semana 6",
    benchPress: 85,
    squat: 115,
    deadlift: 135,
    overheadPress: 55,
  },
  {
    week: "Semana 7",
    benchPress: 86,
    squat: 117,
    deadlift: 138,
    overheadPress: 56,
  },
  {
    week: "Semana 8",
    benchPress: 87,
    squat: 118,
    deadlift: 140,
    overheadPress: 57,
  },
  {
    week: "Semana 9",
    benchPress: 88,
    squat: 120,
    deadlift: 142,
    overheadPress: 57,
  },
  {
    week: "Semana 10",
    benchPress: 88,
    squat: 120,
    deadlift: 142,
    overheadPress: 58,
  },
  {
    week: "Semana 11",
    benchPress: 89,
    squat: 122,
    deadlift: 144,
    overheadPress: 58,
  },
  {
    week: "Semana 12",
    benchPress: 90,
    squat: 125,
    deadlift: 147,
    overheadPress: 60,
  },
];

const AthleteProgress = () => {
  const [chartType, setChartType] = useState("line");

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="benchPress" fill="#8884d8" name="Bench Press" />
            <Bar dataKey="squat" fill="#82ca9d" name="Squat" />
            <Bar dataKey="deadlift" fill="#ffc658" name="Deadlift" />
            <Bar dataKey="overheadPress" fill="#ff8042" name="Overhead Press" />
          </BarChart>
        );
      case "area":
        return (
          <AreaChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="benchPress"
              stroke="#8884d8"
              fill="#8884d8"
              name="Bench Press"
            />
            <Area
              type="monotone"
              dataKey="squat"
              stroke="#82ca9d"
              fill="#82ca9d"
              name="Squat"
            />
            <Area
              type="monotone"
              dataKey="deadlift"
              stroke="#ffc658"
              fill="#ffc658"
              name="Deadlift"
            />
            <Area
              type="monotone"
              dataKey="overheadPress"
              stroke="#ff8042"
              fill="#ff8042"
              name="Overhead Press"
            />
          </AreaChart>
        );
      default:
        return (
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="benchPress"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Bench Press"
            />
            <Line
              type="monotone"
              dataKey="squat"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
              name="Squat"
            />
            <Line
              type="monotone"
              dataKey="deadlift"
              stroke="#ffc658"
              activeDot={{ r: 8 }}
              name="Deadlift"
            />
            <Line
              type="monotone"
              dataKey="overheadPress"
              stroke="#ff8042"
              activeDot={{ r: 8 }}
              name="Overhead Press"
            />
          </LineChart>
        );
    }
  };

  return (
    <DefaultLayout isModalOpen={false}>
      <Breadcrumb pageName="Progresso do Atleta" />
      <div className="p-6 rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
          Progresso de Levantamento de Peso
        </h2>
        <div className="mb-4">
          <button
            onClick={() => setChartType("line")}
            className={`px-4 py-2 rounded-l-lg ${
              chartType === "line"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Linha
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`px-4 py-2 ${
              chartType === "bar"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Barra
          </button>
          <button
            onClick={() => setChartType("area")}
            className={`px-4 py-2 rounded-r-lg ${
              chartType === "area"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Área
          </button>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </DefaultLayout>
  );
};

export default AthleteProgress;
