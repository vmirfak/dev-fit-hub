import { useState } from "react";
import ReactPaginate from "react-paginate";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLoayout";
import { BiDumbbell } from "react-icons/bi";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaComments, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const ClientsOverview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const clients = [
    {
      id: 1,
      name: "João Silva",
      email: "joao.silva@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: false,
    },
    {
      id: 2,
      name: "Maria Oliveira",
      email: "maria.oliveira@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 3,
      name: "Carlos Santos",
      email: "carlos.santos@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 4,
      name: "Ana Souza",
      email: "ana.souza@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 5,
      name: "Pedro Ferreira",
      email: "pedro.ferreira@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: false,
    },
    {
      id: 6,
      name: "Beatriz Lima",
      email: "beatriz.lima@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 7,
      name: "Gabriel Rocha",
      email: "gabriel.rocha@example.com",
      hasExercisePlan: false,
      hasNutritionPlan: true,
    },
    {
      id: 8,
      name: "Camila Almeida",
      email: "camila.almeida@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 9,
      name: "Rafael Mendes",
      email: "rafael.mendes@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 10,
      name: "Larissa Barbosa",
      email: "larissa.barbosa@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: false,
    },
    {
      id: 11,
      name: "Lucas Azevedo",
      email: "lucas.azevedo@example.com",
      hasExercisePlan: false,
      hasNutritionPlan: false,
    },
    {
      id: 12,
      name: "Fernanda Costa",
      email: "fernanda.costa@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: false,
    },
    {
      id: 13,
      name: "Mateus Nunes",
      email: "mateus.nunes@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 14,
      name: "Juliana Teixeira",
      email: "juliana.teixeira@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 15,
      name: "Ricardo Moreira",
      email: "ricardo.moreira@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: false,
    },
    {
      id: 16,
      name: "Mariana Ribeiro",
      email: "mariana.ribeiro@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 17,
      name: "Diego Martins",
      email: "diego.martins@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 18,
      name: "Tatiane Monteiro",
      email: "tatiane.monteiro@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 19,
      name: "Vinícius Carvalho",
      email: "vinicius.carvalho@example.com",
      hasExercisePlan: false,
      hasNutritionPlan: true,
    },
    {
      id: 20,
      name: "Aline Batista",
      email: "aline.batista@example.com",
      hasExercisePlan: false,
      hasNutritionPlan: false,
    },
    {
      id: 21,
      name: "André Xavier",
      email: "andre.xavier@example.com",
      hasExercisePlan: false,
      hasNutritionPlan: false,
    },
    {
      id: 22,
      name: "Carolina Duarte",
      email: "carolina.duarte@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 23,
      name: "Eduardo Figueiredo",
      email: "eduardo.figueiredo@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 24,
      name: "Sabrina Correia",
      email: "sabrina.correia@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 25,
      name: "Rodrigo Campos",
      email: "rodrigo.campos@example.com",
      hasExercisePlan: false,
      hasNutritionPlan: true,
    },
    {
      id: 26,
      name: "Isabela Freitas",
      email: "isabela.freitas@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 27,
      name: "Felipe Lopes",
      email: "felipe.lopes@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 28,
      name: "Vanessa Guimarães",
      email: "vanessa.guimaraes@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 29,
      name: "Gustavo Braga",
      email: "gustavo.braga@example.com",
      hasExercisePlan: false,
      hasNutritionPlan: true,
    },
    {
      id: 30,
      name: "Natália Pires",
      email: "natalia.pires@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 31,
      name: "Henrique Macedo",
      email: "henrique.macedo@example.com",
      hasExercisePlan: false,
      hasNutritionPlan: true,
    },
    {
      id: 32,
      name: "Roberta Cardoso",
      email: "roberta.cardoso@example.com",
      hasExercisePlan: false,
      hasNutritionPlan: false,
    },
    {
      id: 33,
      name: "Fernando Rezende",
      email: "fernando.rezende@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 34,
      name: "Letícia Santana",
      email: "leticia.santana@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 35,
      name: "Daniel Fernandes",
      email: "daniel.fernandes@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: true,
    },
    {
      id: 36,
      name: "Priscila Araújo",
      email: "priscila.araujo@example.com",
      hasExercisePlan: false,
      hasNutritionPlan: true,
    },
    {
      id: 37,
      name: "Thiago Barbosa",
      email: "thiago.barbosa@example.com",
      hasExercisePlan: false,
      hasNutritionPlan: false,
    },
    {
      id: 38,
      name: "Amanda Vieira",
      email: "amanda.vieira@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: false,
    },
    {
      id: 39,
      name: "Leonardo Meireles",
      email: "leonardo.meireles@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: false,
    },
    {
      id: 40,
      name: "Patrícia Tavares",
      email: "patricia.tavares@example.com",
      hasExercisePlan: true,
      hasNutritionPlan: false,
    },
  ];
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const offset = currentPage * itemsPerPage;
  const currentClients = filteredClients.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const [isOpen] = useState(false);

  return (
    <DefaultLayout isModalOpen={isOpen}>
      <Breadcrumb pageName="Clients" />
      <div className="p-4 bg-white shadow-md rounded-md dark:bg-boxdark">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Procurar Clientes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded-md dark:border-strokedark dark:bg-gray-700 dark:text-stone-600"
          />
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
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {currentClients.length > 0 ? (
                currentClients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-b border-[#eee] hover:bg-gray-50 transition dark:border-strokedark"
                  >
                    <td className="py-2 px-4 border-b border-[#eee] dark:border-strokedark">
                      <h5 className="font-medium text-black py-1 dark:text-white flex items-center space-x-2">
                        {client.name}
                        <Link 
                          to={`/clientoverview/${client.id}`}
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          <FaEye 
                          title="Detalhes do Cliente"
                          className="h-5 w-5" />
                        </Link>
                      </h5>
                    </td>
                    <td className="py-2 px-4 border-b border-[#eee] dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {client.email}
                      </p>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex justify-baseline space-x-2 min-w-[50px]">
                        <span
                          className="w-6 flex justify-baseline"
                          title="Detalhes do Plano de Treino"
                        >
                          {client.hasExercisePlan && (
                            <Link to={`/exerciseplanoverview/${client.id}`}>
                              <BiDumbbell
                                className="text-blue-500 cursor-pointer"
                                size={20}
                              />
                            </Link>
                          )}
                        </span>
                        <span
                          className="w-6 flex justify-center"
                          title="Detalhes do Plano de Nutrição"
                        >
                          {client.hasNutritionPlan && (
                            <Link
                              to={`/foodplanoverview/${client.id}`}
                              className="w-6 flex justify-center"
                            >
                              <IoFastFoodSharp
                                className="text-green-500"
                                size={20}
                              />
                            </Link>
                          )}
                        </span>
                        <span
                          className="w-6 flex justify-center"
                          title="Abrir Conversa"
                        >
                          <FaComments className="text-yellow-400" size={20} />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center p-4">
                    No clients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Próximo"}
          pageCount={Math.ceil(filteredClients.length / itemsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-center space-x-2 mt-4"}
          activeClassName={"bg-blue-500 text-white px-3 py-1 rounded-md"}
          pageClassName={"bg-gray-200 px-3 py-1 rounded-md"}
          previousClassName={"bg-gray-200 px-3 py-1 rounded-md"}
          nextClassName={"bg-gray-200 px-3 py-1 rounded-md"}
        />
      </div>
    </DefaultLayout>
  );
};

export default ClientsOverview;
