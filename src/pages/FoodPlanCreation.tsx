import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'; // Import icons from react-icons
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLoayout';

interface DietPlan {
  id: number;
  name: string;
  email: string;
  startDate: string;
  endDate: string;
}

const DietPlansTable = () => {
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([
    { id: 1, name: 'Plan 1', email: 'example1@email.com', startDate: '2024-10-01', endDate: '2024-12-01' },
    { id: 2, name: 'Plan 2', email: 'example2@email.com', startDate: '2024-09-01', endDate: '2024-11-01' },
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const handleEdit = (id: number) => {
    console.log(`Edit diet plan with id: ${id}`);
    // Add logic for editing
  };

  const handleRemove = (id: number) => {
    setDietPlans(dietPlans.filter(plan => plan.id !== id));
  };

  const handleCreateNew = () => {
    console.log('Create new diet plan');
    // Add logic for creating new diet plan
  };

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const displayPlans = dietPlans.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <DefaultLayout isModalOpen={false}>
      <Breadcrumb pageName="Food Plan Creation" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My Diet Plans</h1>
          <button
            onClick={handleCreateNew}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Create New Diet Plan
          </button>
        </div>

        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">E-mail</th>
              <th className="py-2 px-4">Start Date</th>
              <th className="py-2 px-4">End Date</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayPlans.map(plan => (
              <tr key={plan.id} className="border-b hover:bg-gray-50 transition duration-200">
                <td className="py-2 px-4">{plan.name}</td>
                <td className="py-2 px-4">{plan.email}</td>
                <td className="py-2 px-4">{plan.startDate}</td>
                <td className="py-2 px-4">{plan.endDate}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(plan.id)}
                    className="text-green-500 hover:bg-green-100 p-2 rounded-md transition duration-150"
                    aria-label="Edit"
                  >
                    <FaPencilAlt className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleRemove(plan.id)}
                    className="text-red-500 hover:bg-red-100 p-2 rounded-md transition duration-150"
                    aria-label="Remove"
                  >
                    <FaTrashAlt className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={Math.ceil(dietPlans.length / itemsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={'flex justify-center space-x-2 mt-4'}
          activeClassName={'bg-blue-500 text-white px-3 py-1 rounded-md'}
          pageClassName={'bg-gray-200 px-3 py-1 rounded-md'}
          previousClassName={'bg-gray-200 px-3 py-1 rounded-md'}
          nextClassName={'bg-gray-200 px-3 py-1 rounded-md'}
        />
      </div>
    </DefaultLayout>
  );
};

export default DietPlansTable;
