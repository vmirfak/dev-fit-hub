import { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../layout/DefaultLoayout";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FaEye, FaDirections } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

interface Evaluation {
  id: number;
  name: string;
  date: string;
  status: string;
}

const ProEvaluations = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] =
    useState<Evaluation | null>(null);

  const evaluations: Evaluation[] = [
    { id: 1, name: "João Silva", date: "2024-02-15", status: "Pendente" },
    { id: 2, name: "Maria Oliveira", date: "2024-02-14", status: "Pendente" },
    { id: 3, name: "Carlos Souza", date: "2024-02-13", status: "Concluído" },
  ];

  const openModal = (evaluation: Evaluation) => {
    setSelectedEvaluation(evaluation);
    setIsOpen(true);
  };

  return (
    <DefaultLayout isModalOpen={isOpen}>
      <Breadcrumb pageName="Avaliações Pendentes" />
      <div className="p-4 bg-white shadow-md rounded-lg dark:bg-boxdark">
        <h2 className="text-xl font-bold mb-4">Lista de Avaliações</h2>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto ">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Nome
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Data
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((evaluation) => (
                <tr
                  key={evaluation.id}
                  className="border-b border-[#eee] hover:bg-gray-50 transition dark:border-strokedark"
                >
                  <td className="py-2 px-4 border-b border-[#eee] dark:border-strokedark">
                    <h5 className="font-medium text-black py-1 dark:text-white">
                      {evaluation.name}
                    </h5>
                  </td>
                  <td className="py-2 px-4 border-b border-[#eee] dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {evaluation.date}
                    </p>
                  </td>
                  <td className="py-2 px-4 border-b border-[#eee] dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {evaluation.status}
                    </p>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex justify-baseline space-x-2 min-w-[50px]">
                      <button
                        onClick={() => openModal(evaluation)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                      >
                        <FaEye />
                        Ver Detalhes
                      </button>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 flex items-center gap-2 rounded-lg">
                        <FaDirections></FaDirections>Ir para Avaliação
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedEvaluation && (
          <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <DialogTitle>Detalhes da Avaliação</DialogTitle>
            <DialogContent>
              <p>
                <strong>Nome:</strong> {selectedEvaluation.name}
              </p>
              <p>
                <strong>Data:</strong> {selectedEvaluation.date}
              </p>
              <p>
                <strong>Status:</strong> {selectedEvaluation.status}
              </p>
            </DialogContent>
            <DialogActions>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <IoIosCloseCircle />
                Fechar
              </button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ProEvaluations;
