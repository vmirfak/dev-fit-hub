import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLoayout';
import { FaPlus, FaMinus } from 'react-icons/fa';

type Evaluation = {
  date: string;
  evaluator: string;
  details: string;
};

const EvaluationHistory: React.FC = () => {
  // State to track which rows are expanded
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  // Dummy data for table rows
  const evaluations: Evaluation[] = [
    { date: '2023-10-01', evaluator: 'João Silva', details: 'Avaliação 1 Detalhes: Pontuação - 85%, Observações - Satisfatório.' },
  { date: '2023-09-15', evaluator: 'Maria Santos', details: 'Avaliação 2 Detalhes: Pontuação - 90%, Observações - Excelente.' },
  { date: '2023-08-30', evaluator: 'Alexandre Costa', details: 'Avaliação 3 Detalhes: Pontuação - 72%, Observações - Necessita Melhorar.' },
  { date: '2023-07-20', evaluator: 'Inês Almeida', details: 'Avaliação 4 Detalhes: Pontuação - 88%, Observações - Bom desempenho.' },
  { date: '2023-06-05', evaluator: 'Pedro Ferreira', details: 'Avaliação 5 Detalhes: Pontuação - 95%, Observações - Excecional.' },
  { date: '2023-05-10', evaluator: 'Ana Lopes', details: 'Avaliação 6 Detalhes: Pontuação - 67%, Observações - Abaixo do esperado.' },
];

  // Toggle row expansion for multiple rows
  const toggleRow = (index: number) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(index)
        ? prevExpandedRows.filter((rowIndex) => rowIndex !== index) // Remove if already expanded
        : [...prevExpandedRows, index] // Add if not expanded
    );
  };

  const [isOpen] = useState(false);
  
  return (
    <DefaultLayout isModalOpen={isOpen}>
      <Breadcrumb pageName="Histórico de Avaliações" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-6">
          <table className="w-full border-collapse bg-white shadow-sm dark:bg-boxdark">
            <thead>
              <tr className="bg-gray-100 dark:bg-strokedark text-center">
                <th className="py-3 px-4 text-sm font-medium text-center">Data</th>
                <th className="py-3 px-4 text-sm font-medium text-center">Avaliador</th>
                <th className="py-3 px-4 text-sm font-medium text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((evaluation, index) => (
                <React.Fragment key={index}>
                  {/* Main Row */}
                  <tr className="border-t border-stroke dark:border-strokedark">
                    <td className="py-2 px-4 text-center">{evaluation.date}</td>
                    <td className="py-2 px-4 text-center">{evaluation.evaluator}</td>
                    <td className="py-2 px-4 text-center">
                      <button
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
                        onClick={() => toggleRow(index)}
                      >
                        {expandedRows.includes(index) ? <FaMinus /> : <FaPlus />}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Row */}
                  {expandedRows.includes(index) && (
                    <tr className="bg-gray-50 dark:bg-strokedark">
                      <td colSpan={3} className="py-3 px-4">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          {evaluation.details}
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
    </DefaultLayout>
  );
};

export default EvaluationHistory;
