import React from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  exerciseName: string; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, videoUrl, exerciseName }) => {
  if (!isOpen) return null;

  const videoId = videoUrl.split("v=")[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-lg overflow-hidden shadow-lg">
        <div className="flex items-center p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex-grow text-center"> {/* Centering the title */}
            <h2 className="text-lg">{exerciseName}</h2> {/* Displaying the exercise name */}
          </div>
          <button
            onClick={onClose}
            className="focus:outline-none"
            style={{ fontSize: '24px' }}
          >
            <FaTimes className="text-red-500 hover:text-red-700" />
          </button>
        </div>
        <div className="p-4">
          <iframe
            width="90%"
            height="90%"
            src={embedUrl}
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
  
};

export default Modal;
