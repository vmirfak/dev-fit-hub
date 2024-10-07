import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLoayout';

const NewEvaluation: React.FC = () => {
  // State variables for form inputs
  const [date, setDate] = useState("");
  const [evaluator, setEvaluator] = useState("");
  const [score, setScore] = useState<number | "">("");
  const [remarks, setRemarks] = useState("");

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Create a new evaluation object
    const newEvaluation = {
      date,
      evaluator,
      score,
      remarks,
    };

    // Log the evaluation details for now
    console.log("New Evaluation Submitted:", newEvaluation);

    // Reset form fields
    setDate("");
    setEvaluator("");
    setScore("");
    setRemarks("");
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="New Evaluation" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
        <h2 className="text-xl font-semibold mb-4">Create New Evaluation</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Input */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              required
            />
          </div>

          {/* Evaluator Name Input */}
          <div>
            <label
              htmlFor="evaluator"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Evaluator Name
            </label>
            <input
              type="text"
              id="evaluator"
              value={evaluator}
              onChange={(e) => setEvaluator(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              placeholder="Enter evaluator's name"
              required
            />
          </div>

          {/* Evaluation Score Input */}
          <div>
            <label
              htmlFor="score"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Evaluation Score
            </label>
            <input
              type="number"
              id="score"
              value={score}
              onChange={(e) =>
                setScore(e.target.value ? parseInt(e.target.value) : "")
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              placeholder="Enter score (0-100)"
              required
              min={0}
              max={100}
            />
          </div>

          {/* Remarks Textarea */}
          <div>
            <label
              htmlFor="remarks"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Remarks
            </label>
            <textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              placeholder="Add any additional comments"
              rows={4}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-auto px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Evaluation
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default NewEvaluation;
