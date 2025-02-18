import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLoayout";
import { Link } from "react-router-dom";

const IndividualClientOverview = () => {
  const [isModalOpen] = useState(false);

  const clientData = {
    id: 1,
    name: "João Silva",
    email: "joao.silva@example.com",
    phone: "+351 912 345 678",
    dateOfBirth: "1990-05-15",
    address: "Rua Exemplo, 123, Lisboa, Portugal",
  };
  const clientEvaluations = [
    {
      type: "Avaliação Física",
      date: "2025-01-15",
      results: "Peso: 75kg, Percentagem de Gordura: 20%, IMC: 24.5",
    },
    {
      type: "Avaliação Nutricional",
      date: "2025-01-10",
      results:
        "Consumo diário recomendado: 2200 calorias, Dieta balanceada com foco em proteína",
    },
  ];

  return (
    <DefaultLayout isModalOpen={isModalOpen}>
      <Breadcrumb pageName="Overview Cliente" />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Informações do Cliente</h1>

        {/* Grid para Dados Pessoais e Avaliações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Informações Pessoais */}
          <div className="bg-red-100 dark:bg-red-800 shadow-sm rounded-lg p-6 text-gray-900 dark:text-white">
            <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>
            <p>
              <strong>Nome:</strong> {clientData.name}
            </p>
            <p>
              <strong>Email:</strong> {clientData.email}
            </p>
            <p>
              <strong>Telefone:</strong> {clientData.phone}
            </p>
            <p>
              <strong>Data de Nascimento:</strong> {clientData.dateOfBirth}
            </p>
            <p>
              <strong>Morada:</strong> {clientData.address}
            </p>
          </div>

          {/* Secção de Avaliações */}
          <div className="bg-yellow-100 dark:bg-yellow-600 shadow-sm rounded-lg p-6 text-gray-800 dark:text-white">
            <h2 className="text-xl font-semibold mb-4">Avaliações</h2>
            {clientEvaluations.length > 0 ? (
              <ul>
                {clientEvaluations.map((evaluation, index) => (
                  <li key={index} className="mb-4">
                    <div className="font-semibold">{evaluation.type}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Data: {evaluation.date}
                    </div>
                    <div className="mt-2">{evaluation.results}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-300">
                Ainda não há avaliações para este cliente.
              </p>
            )}
          </div>
        </div>

        {/* Grid para Plano Nutricional e Plano de Treino */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plano Nutricional */}
          <div className="bg-blue-100 dark:bg-blue-700 shadow-sm rounded-lg p-6 text-center text-gray-800 dark:text-white">
            <h3 className="text-xl font-semibold mb-4">Plano Nutricional</h3>
            <Link
              to={`/foodplanoverview/${clientData.id}`}
              className="text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400"
            >
              Ver Plano Nutricional
            </Link>
          </div>

          {/* Plano de Treino */}
          <div className="bg-green-100 dark:bg-green-700 shadow-sm rounded-lg p-6 text-center text-gray-800 dark:text-white">
            <h3 className="text-xl font-semibold mb-4">Plano de Treino</h3>
            <Link
              to={`/exerciseplanoverview/${clientData.id}`}
              className="text-green-500 dark:text-green-300 hover:text-green-700 dark:hover:text-green-400"
            >
              Ver Plano de Treino
            </Link>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default IndividualClientOverview;
