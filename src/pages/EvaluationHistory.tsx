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
    { date: '2023-10-01', evaluator: 'John Doe', details: 'Evaluation 1 Details: Score - 85%, Remarks - Satisfactory.' },
    { date: '2023-09-15', evaluator: 'Jane Smith', details: 'Evaluation 2 Details: Score - 90%, Remarks - Excellent.' },
    { date: '2023-08-30', evaluator: 'Alex Johnson', details: 'Evaluation 3 Details: Score - 72%, Remarks - Needs Improvement.' },
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
      <Breadcrumb pageName="Evaluation History" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Evaluation History</h2>
          <table className="w-full border-collapse bg-white shadow-sm dark:bg-boxdark">
            <thead>
              <tr className="bg-gray-100 dark:bg-strokedark text-center">
                <th className="py-3 px-4 text-sm font-medium text-center">Date</th>
                <th className="py-3 px-4 text-sm font-medium text-center">Evaluator</th>
                <th className="py-3 px-4 text-sm font-medium text-center">Actions</th>
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
