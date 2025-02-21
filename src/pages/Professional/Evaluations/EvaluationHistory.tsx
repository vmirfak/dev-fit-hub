import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../layout/DefaultLoayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { FaPlus, FaMinus, FaChartBar } from "react-icons/fa";
import { FaClockRotateLeft, FaCodeCompare } from "react-icons/fa6";
import { Link } from "react-router-dom";

type Evaluation = {
  date: string;
  evaluator: string;
  details: string;
  weight: number;
  height: number;
  bodyFatPercentage: number;
  bmi: number;
  bmiCategory: string;
  notes: string;
};

const EvaluationHistory: React.FC = () => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const evaluations: Evaluation[] = [
    {
      date: "2023-12-05",
      evaluator: "Sofia Andrade",
      details:
        "Avaliação 10 Detalhes: Pontuação - 87%, Observações - Boa evolução.",
      weight: 82,
      height: 175,
      bodyFatPercentage: 21.2,
      bmi: 26.8,
      bmiCategory: "Excesso de peso",
      notes: "Manter a rotina atual para continuar a evolução positiva.",
    },
    {
      date: "2023-11-10",
      evaluator: "Rui Mendes",
      details:
        "Avaliação 0 Detalhes: Pontuação - 80%, Observações - Bom desempenho.",
      weight: 84,
      height: 175,
      bodyFatPercentage: 21.5,
      bmi: 27.4,
      bmiCategory: "Excesso de peso",
      notes: "Manter a consistência nos treinos e alimentação equilibrada.",
    },
    {
      date: "2023-10-01",
      evaluator: "João Silva",
      details:
        "Avaliação 1 Detalhes: Pontuação - 85%, Observações - Satisfatório.",
      weight: 83,
      height: 175,
      bodyFatPercentage: 22,
      bmi: 27.1,
      bmiCategory: "Excesso de peso",
      notes: "Continuar com exercícios regulares e ajustes na dieta.",
    },
    {
      date: "2023-09-15",
      evaluator: "Maria Santos",
      details:
        "Avaliação 2 Detalhes: Pontuação - 90%, Observações - Excelente.",
      weight: 82,
      height: 175,
      bodyFatPercentage: 20,
      bmi: 26.8,
      bmiCategory: "Excesso de peso",
      notes: "Progresso excelente, continuar com o bom trabalho!",
    },
    {
      date: "2023-08-30",
      evaluator: "Alexandre Costa",
      details:
        "Avaliação 3 Detalhes: Pontuação - 72%, Observações - Necessita Melhorar.",
      weight: 85,
      height: 175,
      bodyFatPercentage: 24,
      bmi: 27.8,
      bmiCategory: "Excesso de peso",
      notes:
        "Focar-se em melhorar a atividade física e reduzir gordura corporal.",
    },
    {
      date: "2023-07-20",
      evaluator: "Inês Almeida",
      details:
        "Avaliação 4 Detalhes: Pontuação - 88%, Observações - Bom desempenho.",
      weight: 80,
      height: 175,
      bodyFatPercentage: 21,
      bmi: 26.1,
      bmiCategory: "Excesso de peso",
      notes: "Bom progresso, continuar com a rotina atual.",
    },
    {
      date: "2023-06-05",
      evaluator: "Pedro Ferreira",
      details:
        "Avaliação 5 Detalhes: Pontuação - 95%, Observações - Excecional.",
      weight: 79,
      height: 175,
      bodyFatPercentage: 19,
      bmi: 25.8,
      bmiCategory: "Excesso de peso",
      notes:
        "Desempenho excecional, continuar a monitorizar a nutrição de perto.",
    },
    {
      date: "2023-05-10",
      evaluator: "Ana Lopes",
      details:
        "Avaliação 6 Detalhes: Pontuação - 67%, Observações - Abaixo do esperado.",
      weight: 87,
      height: 175,
      bodyFatPercentage: 26,
      bmi: 28.4,
      bmiCategory: "Obesidade",
      notes:
        "Necessita focar-se na dieta e no exercício para uma melhoria significativa.",
    },
    {
      date: "2023-04-02",
      evaluator: "Carla Nogueira",
      details: "Avaliação 7 Detalhes: Pontuação - 78%, Observações - Regular.",
      weight: 86,
      height: 175,
      bodyFatPercentage: 25,
      bmi: 28.1,
      bmiCategory: "Obesidade",
      notes:
        "Melhorar a consistência nos treinos e manter uma alimentação equilibrada.",
    },
    {
      date: "2023-03-15",
      evaluator: "Miguel Carvalho",
      details:
        "Avaliação 8 Detalhes: Pontuação - 92%, Observações - Muito bom.",
      weight: 81,
      height: 175,
      bodyFatPercentage: 20.5,
      bmi: 26.5,
      bmiCategory: "Excesso de peso",
      notes: "Ótimos resultados! Continuar a manter hábitos saudáveis.",
    },
    {
      date: "2023-02-10",
      evaluator: "Beatriz Moreira",
      details:
        "Avaliação 9 Detalhes: Pontuação - 70%, Observações - Precisa de melhorias.",
      weight: 88,
      height: 175,
      bodyFatPercentage: 27,
      bmi: 28.7,
      bmiCategory: "Obesidade",
      notes: "Atenção à alimentação e ao aumento da atividade física.",
    },
    {
      date: "2023-01-05",
      evaluator: "Fernando Pinto",
      details:
        "Avaliação 11 Detalhes: Pontuação - 75%, Observações - Progresso aceitável.",
      weight: 85,
      height: 175,
      bodyFatPercentage: 23.5,
      bmi: 27.8,
      bmiCategory: "Excesso de peso",
      notes:
        "Progresso constante, mas precisa de ajustes na intensidade dos treinos.",
    },
    {
      date: "2022-12-10",
      evaluator: "Helena Costa",
      details:
        "Avaliação 12 Detalhes: Pontuação - 60%, Observações - Baixo rendimento.",
      weight: 89,
      height: 175,
      bodyFatPercentage: 28,
      bmi: 29,
      bmiCategory: "Obesidade",
      notes:
        "Priorizar a reeducação alimentar e um plano de treino mais eficaz.",
    },
    {
      date: "2022-11-03",
      evaluator: "Ricardo Lopes",
      details:
        "Avaliação 13 Detalhes: Pontuação - 85%, Observações - Boa recuperação.",
      weight: 82,
      height: 175,
      bodyFatPercentage: 21,
      bmi: 26.8,
      bmiCategory: "Excesso de peso",
      notes:
        "Boa recuperação após período de menor atividade. Continuar focado.",
    },
    {
      date: "2022-10-20",
      evaluator: "Joana Martins",
      details:
        "Avaliação 14 Detalhes: Pontuação - 90%, Observações - Excelente estado físico.",
      weight: 80,
      height: 175,
      bodyFatPercentage: 19.5,
      bmi: 26.1,
      bmiCategory: "Excesso de peso",
      notes: "Ótimos resultados! Manter o equilíbrio entre treino e descanso.",
    },
  ];

  const [selectedEvaluations, setSelectedEvaluations] = useState<number[]>([]);
  const toggleRow = (index: number) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(index)
        ? prevExpandedRows.filter((rowIndex) => rowIndex !== index)
        : [...prevExpandedRows, index]
    );
  };
  const handleSelectEvaluation = (index: number) => {
    setSelectedEvaluations((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((id) => id !== index);
      }
      if (prevSelected.length < 2) {
        return [...prevSelected, index];
      }
      return prevSelected;
    });
  };
  const renderComparison = () => {
    if (selectedEvaluations.length === 2) {
      const evaluation1 = evaluations[selectedEvaluations[0]];
      const evaluation2 = evaluations[selectedEvaluations[1]];

      return (
        <div className="mt-6 p-6 overflow-hidden rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex justify-center">
          <div className="w-full max-w-4xl">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              Comparação de Avaliações
            </h3>
            <div className="flex space-x-6 justify-center">
              <div className="w-1/2">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                  {evaluation1.date} - {evaluation1.evaluator}
                </h4>
                <p>{evaluation1.details}</p>
                <p>
                  BMI: {evaluation1.bmi} ({evaluation1.bmiCategory})
                </p>
                <p>Body Fat: {evaluation1.bodyFatPercentage}%</p>
                <p>{evaluation1.notes}</p>
              </div>
              <div className="w-1/2">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                  {evaluation2.date} - {evaluation2.evaluator}
                </h4>
                <p>{evaluation2.details}</p>
                <p>
                  BMI: {evaluation2.bmi} ({evaluation2.bmiCategory})
                </p>
                <p>Percentagem de Gordura: {evaluation2.bodyFatPercentage}%</p>
                <p>{evaluation2.notes}</p>
              </div>
            </div>
            {renderComparisonChart()}
          </div>
        </div>
      );
    }
    return (
      <p className="text-gray-600 dark:text-gray-300">
        Selecione duas avaliações para comparar.
      </p>
    );
  };

  const renderComparisonChart = () => {
    if (selectedEvaluations.length === 2) {
      const evaluation1 = evaluations[selectedEvaluations[0]];
      const evaluation2 = evaluations[selectedEvaluations[1]];

      // Dados para gráfico com Peso e BodyFat
      const chartData = [
        {
          date: evaluation1.date,
          Peso: evaluation1.weight,
          BodyFat: evaluation1.bodyFatPercentage,
        },
        {
          date: evaluation2.date,
          Peso: evaluation2.weight,
          BodyFat: evaluation2.bodyFatPercentage,
        },
      ];

      return (
        <div className="comparison-chart mt-6 p-6 bg-gray-50 dark:bg-boxdark rounded-xl flex justify-center">
          <div className="w-full max-w-4xl">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
              >
                <defs>
                  <linearGradient
                    id="weightGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="bodyFatGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="100%" stopColor="#f9220c" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>

                {/* Eixo X - Data */}
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#4b5563" }}
                  tickLine={true}
                  label={{
                    value: "Data",
                    position: "insideBottom",
                    dy: 12,
                    fill: "#6b7280",
                  }}
                />

                {/* Eixo Y (Peso) */}
                <YAxis
                  tick={{ fill: "#4b5563" }}
                  tickLine={false}
                  domain={["auto", "auto"]}
                  label={{
                    value: "Peso [kg]",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#6b7280",
                  }}
                />

                {/* Eixo Y Secundário (BodyFat) */}
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: "#4b5563" }}
                  tickLine={false}
                  domain={["auto", "auto"]}
                  label={{
                    value: "Gordura [%]",
                    angle: -90,
                    position: "insideRight",
                    fill: "#6b7280",
                  }}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    color: "#fff",
                    borderRadius: "8px",
                  }}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Legend verticalAlign="top" height={36} />

                {/* Linha para Peso */}
                <Line
                  type="monotone"
                  dataKey="Peso"
                  stroke="url(#weightGradient)"
                  strokeWidth={2}
                  dot={{
                    r: 3,
                    fill: "#3b82f6",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  name="Peso"
                />

                {/* Linha para BodyFat Percentage */}
                <Line
                  type="monotone"
                  dataKey="BodyFat"
                  stroke="url(#bodyFatGradient)"
                  strokeWidth={2}
                  dot={{
                    r: 3,
                    fill: "#f59e0b",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  name="Gordura Corporal"
                  yAxisId="right" // Usando o eixo Y secundário
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    }
    return null;
  };
  const weightEvolutionData = [
    { date: "Jan 2023", Peso: 85 },
    { date: "Fev 2023", Peso: 84.5 },
    { date: "Mar 2023", Peso: 83 },
    { date: "Abr 2023", Peso: 82.2 },
    { date: "Mai 2023", Peso: 81.8 },
    { date: "Jun 2023", Peso: 81 },
    { date: "Jul 2023", Peso: 80.5 },
    { date: "Ago 2023", Peso: 79.7 },
    { date: "Set 2023", Peso: 80.2 },
    { date: "Out 2023", Peso: 79.5 },
    { date: "Nov 2023", Peso: 78.9 },
    { date: "Dez 2023", Peso: 78.2 },
    { date: "Jan 2024", Peso: 77.5 },
    { date: "Fev 2024", Peso: 78 },
    { date: "Mar 2024", Peso: 76.8 },
    { date: "Abr 2024", Peso: 76.2 },
    { date: "Mai 2024", Peso: 75.7 },
    { date: "Jun 2024", Peso: 75.5 },
    { date: "Jul 2024", Peso: 74.8 },
    { date: "Ago 2024", Peso: 74.2 },
    { date: "Set 2024", Peso: 74.9 },
    { date: "Out 2024", Peso: 73.5 },
    { date: "Nov 2024", Peso: 73 },
    { date: "Dez 2024", Peso: 72.3 },
  ];

  return (
    <DefaultLayout isModalOpen={false}>
      <Breadcrumb pageName="Histórico de Avaliações" />
      <div className="mb-6 bg-white dark:bg-boxdark p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            <div className="flex items-center">
              <FaChartBar className="mr-2" /> Evolução do Peso
            </div>
          </h2>
          <Link
          to = "/newevaluation">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaPlus></FaPlus>Nova avaliação
          </button>
          </Link>
          
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={weightEvolutionData}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fill: "#4b5563" }}
              tickLine={true}
              label={{
                value: "Data [mês/ano]",
                position: "insideBottom",
                dy: 12,
                fill: "#6b7280",
              }}
            />
            <YAxis
              tick={{ fill: "#4b5563" }}
              tickLine={false}
              domain={["auto", "auto"]}
              label={{
                value: "Peso [kg]",
                angle: -90,
                position: "insideLeft",
                fill: "#6b7280",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                color: "#fff",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="Peso"
              stroke="url(#weightGradient)"
              strokeWidth={2}
              dot={{ r: 3, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Evaluation History Table */}
      <div className="overflow-hidden rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            <div className="flex items-center">
              <FaClockRotateLeft className="mr-2" /> Avaliações passadas
            </div>
          </h2>
          <table className="w-full border-collapse bg-white shadow-sm dark:bg-boxdark">
            <thead>
              <tr className="bg-gray-100 dark:bg-strokedark text-center">
                <th className="py-3 px-4 text-sm font-medium text-center">
                  Data
                </th>
                <th className="py-3 px-4 text-sm font-medium text-center">
                  Avaliador
                </th>
                <th className="py-3 px-4 text-sm font-medium text-center">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((evaluation, index) => (
                <React.Fragment key={index}>
                  <tr className="border-t border-stroke dark:border-strokedark text-center">
                    <td className="py-3 px-4">{evaluation.date}</td>
                    <td className="py-3 px-4">{evaluation.evaluator}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center items-center space-x-4">
                        {/* Botão de Expandir/Reduzir */}
                        <button
                          className="flex items-center text-sm text-primary hover:text-primary-focus px-4 py-2 border rounded-md transition duration-200"
                          onClick={() => toggleRow(index)}
                          title="Mostrar detalhes da Avaliação"
                        >
                          {expandedRows.includes(index) ? (
                            <>
                              <FaMinus />
                            </>
                          ) : (
                            <>
                              <FaPlus />
                            </>
                          )}
                        </button>

                        <button
                          className={`flex items-center text-sm text-primary hover:text-primary-focus px-4 py-2 border rounded-md transition duration-200 ${
                            selectedEvaluations.includes(index)
                              ? "bg-primary border text-white"
                              : "bg-gray-200"
                          }`}
                          title="Comparar Avaliação"
                          onClick={() => handleSelectEvaluation(index)}
                        >
                          <FaCodeCompare />
                          {selectedEvaluations.includes(index) ? "" : ""}
                        </button>
                      </div>
                    </td>
                  </tr>

                  {expandedRows.includes(index) && (
                    <tr className="border-t border-stroke dark:border-strokedark">
                      <td colSpan={3} className="py-3 px-4">
                        <div className="text-left">
                          <p>{evaluation.details}</p>
                          <p>
                            BMI: {evaluation.bmi} ({evaluation.bmiCategory})
                          </p>
                          <p>
                            Percentagem de Gordura:{" "}
                            {evaluation.bodyFatPercentage}%
                          </p>
                          <p>Notas: {evaluation.notes}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>{renderComparison()}</div>
    </DefaultLayout>
  );
};

export default EvaluationHistory;
