import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLoayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { FaHome, FaUser, FaChartBar, FaCog } from "react-icons/fa";

const AdminDashboard: React.FC = () => {
  const [isOpen] = useState(false);

  return (
    <DefaultLayout isModalOpen={isOpen}>
      <Breadcrumb pageName="Admin - Página Inicial" />
      <nav className="bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-200 border-b border-gray-700 shadow-md">
        <ul className="flex justify-between items-center p-4">
          <li className="flex-1">
            <a
              className="flex flex-col items-center space-y-1 hover:bg-gray-800 dark:hover:bg-gray-700 rounded-md p-2 transition duration-200"
            >
              <FaHome className="text-2xl md:text-base text-black dark:text-white" />
              <span className="text-sm hidden md:inline text-black dark:text-white">
                Home
              </span>
            </a>
          </li>
          <li className="flex-1">
            <a
              className="flex flex-col items-center space-y-1 hover:bg-gray-800 dark:hover:bg-gray-700 rounded-md p-2 transition duration-200"
            >
              <FaUser className="text-2xl md:text-base text-black dark:text-white" />
              <span className="text-sm hidden md:inline text-black dark:text-white">
                Users
              </span>
            </a>
          </li>
          <li className="flex-1">
            <a
              className="flex flex-col items-center space-y-1 hover:bg-gray-800 dark:hover:bg-gray-700 rounded-md p-2 transition duration-200"
            >
              <FaChartBar className="text-2xl md:text-base text-black dark:text-white" />
              <span className="text-sm hidden md:inline text-black dark:text-white">
                Reports
              </span>
            </a>
          </li>
          <li className="flex-1">
            <a
              className="flex flex-col items-center space-y-1 hover:bg-gray-800 dark:hover:bg-gray-700 rounded-md p-2 transition duration-200"
            >
              <FaCog className="text-2xl md:text-base text-black dark:text-white" />
              <span className="text-sm hidden md:inline text-black dark:text-white">
                Settings
              </span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* Conteúdo da dashboard */}
      </div>
    </DefaultLayout>
  );
};

export default AdminDashboard;
