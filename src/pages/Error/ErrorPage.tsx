// src/components/ErrorPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import exerciseFailImage from '../../assets/exercise-fail-404.png'; 

const ErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <img
        src={exerciseFailImage}
        alt="Cartoon of a person failing to lift weights"
        className="w-1/2 md:w-1/3 mb-4" // Adjust the width based on screen size
      />
      <h1 className="text-4xl md:text-5xl font-bold text-red-600 text-center">
        Oops! Something went wrong.
      </h1>
      <p className="mt-4 text-lg md:text-xl text-center">
        The page you're looking for doesn't exist or an error occurred.
      </p>
      <Link
        to="/"
        className="mt-6 text-blue-500 hover:underline text-lg md:text-xl"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
