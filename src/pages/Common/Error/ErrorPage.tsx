// src/components/ErrorPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import exerciseFailImage from '../../../assets/exercise-fail-404.png'; 

const ErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <img
        src={exerciseFailImage}
        alt="Desenho animado de uma pessoa a falhar ao levantar pesos"
        className="w-1/2 md:w-1/3 mb-4" // Ajusta a largura conforme o tamanho do ecrã
      />
      <h1 className="text-4xl md:text-5xl font-bold text-red-600 text-center">
        Oops! Algo correu mal.
      </h1>
      <p className="mt-4 text-lg md:text-xl text-center">
        A página que procuras não existe ou ocorreu um erro.
      </p>
      <Link
        to="/"
        className="mt-6 text-blue-500 hover:underline text-lg md:text-xl"
      >
        Voltar à página inicial
      </Link>
    </div>
  );
};

export default ErrorPage;
