import React from "react";
import { Modal } from "@mui/material";
import { FaTimes } from "react-icons/fa";

interface Ingredient {
  name: string;
  quantity: string | number;
}

interface ShoppingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  shoppingList: Ingredient[];
  generatePDF: () => void;
}

const ShoppingListModal: React.FC<ShoppingListModalProps> = ({
  isOpen,
  onClose,
  shoppingList,
  generatePDF,
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 flex flex-col items-center text-center bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center justify-between w-full">
            <h2
              className="text-lg font-bold dark:text-slate-200 flex-grow text-center"
              id="modal-title"
            >
              Your Shopping List
            </h2>
            <button
              onClick={onClose}
              className="text-red-600 hover:text-red-800"
              aria-label="Close"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          {/* Display the shopping list */}
          <div className="my-4 overflow-y-auto max-h-100 w-full">
            <ul className="list-none p-0 dark:text-slate-400">
              {shoppingList.map((item, index) => (
                <li key={index} className="py-1">
                  {item.name} - {item.quantity}
                </li>
              ))}
            </ul>
          </div>
          {/* PDF Download Button */}
          <button
            onClick={generatePDF}
            className="bg-blue-600 text-white rounded-md px-4 py-2 flex items-center hover:bg-blue-700 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#aeb7b1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-3" // Increased margin to the right for spacing
            >
              <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8M12 19.8V12M16 17l-4 4-4-4" />
            </svg>
            Download as PDF
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ShoppingListModal;
