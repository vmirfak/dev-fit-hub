import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLoayout";
import { useUser } from "../../context/useUsers";

const DevOverview = () => {
  const [isModalOpen] = useState(false);
  const { users, fetchAllUsers } = useUser();

  return (
    <DefaultLayout isModalOpen={isModalOpen}>
      <Breadcrumb pageName="Plano de Treino" />
      <div className="p-6 rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <h2 className="text-xl font-semibold mb-6">Lista de Utilizadores</h2>

        <div className="flex justify-center mb-6">
          <button
            className="w-full sm:w-auto bg-primary hover:bg-blue-900 text-white font-bold py-2 px-6 rounded-md shadow-sm transition duration-300"
            onClick={fetchAllUsers}
          >
            Fetch Users
          </button>
        </div>

        {users && users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-primary  text-white text-sm">
                <tr>
                  <th className="py-2 px-4 text-left">Nome</th>
                  <th className="py-2 px-4 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.username} className="text-sm">
                    <td className="py-2 px-4">{user.username}</td>
                    <td className="py-2 px-4">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 text-center text-sm">Nenhum usuário encontrado.</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default DevOverview;
