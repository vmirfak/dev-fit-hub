import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLoayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

const MyDashboard: React.FC = () => {
  const [isOpen] = useState(false);

  return (
    <DefaultLayout isModalOpen={isOpen}>
      <Breadcrumb pageName="Página Inicial" />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* Planos Ativos */}
        <div className="col-span-12 lg:col-span-6 2xl:col-span-6 flex flex-col justify-between rounded-xl p-4 mb-4 text-center border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
          <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
            💪 Planos Ativos
          </h3>
          <div className="flex-1 flex flex-col justify-center">
            <p className="mb-2 text-black dark:text-white">
              Treino para Hoje:{" "}
              <span className="font-bold">Força - Pernas </span>
            </p>
            <p className="mb-2 text-black dark:text-white">
              <ul className="list-disc list-inside text-center">
                <li>
                  Agachamento com barra - <b>3x12</b>
                </li>
                <li>
                  Leg press - <b>4x10</b>
                </li>
                <li>
                  Extensora - <b>3x15</b>
                </li>
              </ul>
            </p>
            <p className="mb-2 text-black dark:text-white">
              Dica de Treino:{" "}
              <span className="font-bold">
                Mantém o core contraído durante os levantamentos para evitar
                lesões.
              </span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Última atualização: 22/10/2024
            </p>
          </div>
          <button className="mt-4 w-1/2 mx-auto bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
            Ver Planos
          </button>
        </div>

        {/* Acesso Rápido a Receitas / Exercícios */}
        <div className="col-span-12 lg:col-span-6 2xl:col-span-6 flex flex-col justify-between rounded-xl p-4 mb-4 text-center border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
          <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
            🍏 Receitas
          </h3>
          <div className="flex-1 flex flex-col justify-center">
            <p className="mb-2 text-black dark:text-white">
              Receita do dia:{" "}
              <span className="font-bold">Salada de Quinoa 🥗</span>
            </p>
            <p className="mb-2 text-black dark:text-white">
              Sugestão de Snack:{" "}
              <span className="font-bold">Barra de proteína com amêndoas</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sugestões personalizadas só para ti!
            </p>
          </div>
          <button className="mt-4 w-1/2 mx-auto bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
            Ver Receitas
          </button>
        </div>

        {/* Avaliações Rápidas */}
        <div className="col-span-12 lg:col-span-6 2xl:col-span-6 flex flex-col justify-between rounded-xl p-4 mb-4 text-center border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
          <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
            ⭐ Avaliações Rápidas
          </h3>
          <div className="flex-1 flex flex-col justify-center">
            <p className="mb-2 text-black dark:text-white">
              Feedback da última avaliação:{" "}
              <span className="font-bold">
                "Ótimo progresso, continua com esse foco!"
              </span>
            </p>
            <p className="mb-2 text-black dark:text-white">
              Última avaliação do nutricionista:{" "}
              <span className="font-bold">Boa</span>
            </p>
            <p className="mb-2 text-black dark:text-white">
              Última avaliação do personal trainer:{" "}
              <span className="font-bold">Excelente</span>
            </p>
            <p className="mb-2 text-black dark:text-white">
              Sugestões:{" "}
              <span className="font-bold">
                "Tenta incluir mais proteínas nas refeições pré-treino."
              </span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Próxima avaliação: 25/10/2024
            </p>
          </div>
          <button className="mt-4 w-1/2 mx-auto bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Ver Avaliações
          </button>
        </div>

        {/* Resumo de Objetivos */}
        <div className="col-span-12 lg:col-span-6 2xl:col-span-6 flex flex-col justify-between rounded-xl p-4 mb-4 text-center border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
          <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
            🎯 Resumo de Objetivos
          </h3>
          <div className="flex-1 flex flex-col justify-center">
            <p className="mb-2 text-black dark:text-white">
              Objetivo atual: <span className="font-bold">Perder 5kg</span>
            </p>
            <p className="mb-2 text-black dark:text-white">
              Progresso: <span className="font-bold">2kg já foram!</span>
            </p>
            <p className="mb-2 text-black dark:text-white">
              Ações Recomendadas:{" "}
              <span className="font-bold">
                "Aumenta a intensidade dos treinos de cardio para acelerar a
                perda de peso."
              </span>
            </p>
            <div className="mt-4">
              <p className="text-sm font-semibold mb-1">Progresso Total:</p>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-2">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Meta final: 31/12/2024
            </p>
            <p className="text-lg font-semibold text-green-600 dark:text-green-400 mt-2">
              "Estás quase lá, continua assim!"
            </p>
          </div>
          <button className="mt-4 w-1/2 mx-auto bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700">
            Ver Objetivos
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MyDashboard;
