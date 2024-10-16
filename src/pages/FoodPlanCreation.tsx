import { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaPencilAlt, FaTrashAlt, FaPlus } from "react-icons/fa";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLoayout";
import NewDietPlanModal from "../components/Modal/NewDietPlanModal";
import { NavLink } from "react-router-dom";

interface DietPlan {
  id: number;
  name: string;
  email: string;
  createdOn: string;
  startDate: string;
  endDate: string;
}

const DietPlansTable = () => {
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-10-01",
      endDate: "2024-12-01",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-09-15",
      endDate: "2024-11-15",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie.brown@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-08-10",
      endDate: "2024-10-10",
    },
    {
      id: 4,
      name: "Diana Prince",
      email: "diana.prince@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-10-05",
      endDate: "2024-12-05",
    },
    {
      id: 5,
      name: "Ethan Hunt",
      email: "ethan.hunt@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-09-20",
      endDate: "2024-11-20",
    },
    {
      id: 6,
      name: "Fiona Apple",
      email: "fiona.apple@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-07-25",
      endDate: "2024-09-25",
    },
    {
      id: 7,
      name: "George Clooney",
      email: "george.clooney@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-08-15",
      endDate: "2024-10-15",
    },
    {
      id: 8,
      name: "Hannah Baker",
      email: "hannah.baker@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-10-12",
      endDate: "2024-12-12",
    },
    {
      id: 9,
      name: "Ian Malcolm",
      email: "ian.malcolm@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-09-01",
      endDate: "2024-11-01",
    },
    {
      id: 10,
      name: "Jessica Jones",
      email: "jessica.jones@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-08-20",
      endDate: "2024-10-20",
    },
    {
      id: 11,
      name: "Kevin Hart",
      email: "kevin.hart@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-07-30",
      endDate: "2024-09-30",
    },
    {
      id: 12,
      name: "Laura Croft",
      email: "laura.croft@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-10-10",
      endDate: "2024-12-10",
    },
    {
      id: 13,
      name: "Michael Scott",
      email: "michael.scott@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-09-05",
      endDate: "2024-11-05",
    },
    {
      id: 14,
      name: "Nina Simone",
      email: "nina.simone@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-08-30",
      endDate: "2024-10-30",
    },
    {
      id: 15,
      name: "Oscar Isaac",
      email: "oscar.isaac@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-10-15",
      endDate: "2024-12-15",
    },
    {
      id: 16,
      name: "Paula Patton",
      email: "paula.patton@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-07-15",
      endDate: "2024-09-15",
    },
    {
      id: 17,
      name: "Quentin Tarantino",
      email: "quentin.tarantino@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-08-05",
      endDate: "2024-10-05",
    },
    {
      id: 18,
      name: "Rachel Green",
      email: "rachel.green@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-09-10",
      endDate: "2024-11-10",
    },
    {
      id: 19,
      name: "Steve Rogers",
      email: "steve.rogers@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-10-20",
      endDate: "2024-12-20",
    },
    {
      id: 20,
      name: "Tina Fey",
      email: "tina.fey@email.com",
      createdOn: "2024-10-10",
      startDate: "2024-09-25",
      endDate: "2024-11-25",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 8;

  const handleEdit = (id: number) => {
    console.log(`Edit diet plan with id: ${id}`);
  };

  const handleRemove = (id: number) => {
    setDietPlans(dietPlans.filter((plan) => plan.id !== id));
  };

  const handleCreateNew = () => {
    setIsModalOpen(true);
  };

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const addDietPlan = (newDietPlan: {
    name: string;
    email: string;
    startDate: string;
    endDate: string;
  }) => {
    const newPlan = {
      id: dietPlans.length + 1,
      createdOn: new Date().toISOString().split("T")[0],
      ...newDietPlan,
    };
    setDietPlans([...dietPlans, newPlan]);
  };

  const displayPlans = dietPlans.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <DefaultLayout isModalOpen={isModalOpen}>
      <Breadcrumb pageName="As minhas Perscrições" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-end items-center mb-4">
          <NavLink to="/testplan">
            <button
              onClick={handleCreateNew}
              className="flex items-center bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-200 hover:shadow-lg hover:scale-105"
            >
              <FaPlus className="mr-2 " />
              Criar Novo
            </button>
          </NavLink>
        </div>

        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Nome
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  E-mail
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Criação
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Início
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Fim
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {displayPlans.map((plan) => (
                <tr
                  key={plan.id}
                  className="border-b border-[#eee] hover:bg-gray-50 transition duration-200 dark:border-strokedark"
                >
                  <td className="py-2 px-4 border-b border-[#eee] dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      {plan.name}
                    </h5>
                  </td>
                  <td className="py-2 px-4 border-b border-[#eee] dark:border-strokedark">
                    <p className="text-black dark:text-white">{plan.email}</p>
                  </td>
                  <td className="py-2 px-4 border-b border-[#eee] dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {plan.createdOn}
                    </p>
                  </td>
                  <td className="py-2 px-4 border-b border-[#eee] dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {plan.startDate}
                    </p>
                  </td>
                  <td className="py-2 px-4 border-b border-[#eee] dark:border-strokedark">
                    <p className="text-black dark:text-white">{plan.endDate}</p>
                  </td>
                  <td className="py-2 px-4 border-b border-[#eee] dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Próximo"}
          pageCount={Math.ceil(dietPlans.length / itemsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-center space-x-2 mt-4"}
          activeClassName={"bg-blue-500 text-white px-3 py-1 rounded-md"}
          pageClassName={"bg-gray-200 px-3 py-1 rounded-md"}
          previousClassName={"bg-gray-200 px-3 py-1 rounded-md"}
          nextClassName={"bg-gray-200 px-3 py-1 rounded-md"}
        />
        {/* Include the Modal */}
        <NewDietPlanModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={addDietPlan}
        />
      </div>
    </DefaultLayout>
  );
};

export default DietPlansTable;
