import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../images/logo/b-blue-stroke.png"

const RecoverPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRecoverEmail = async () => {
    // Clear previous messages
    setError("");
    setSuccessMessage("");

    // Input validation
    if (!email) {
      setError("E-mail é necessário!");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Introduz um e-mail válido!");
      return;
    }

    // Prepare data for recovery
    const recoveryData = {
      email,
    };

    try {
      const response = await fetch("http://localhost:3000/recover-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recoveryData),
      });

      const result = await response.json();

      if (response.ok) {
        // Email recovery successful
        setSuccessMessage("Instruções de recuperação foram enviadas para o teu e-mail.");
      } else {
        // Handle server errors
        setError(result.message || "A recuperação falhou. Tenta novamente.");
      }
    } catch (error) {
      setError("Ocorreu um erro ao tentar recuperar o e-mail. Tenta novamente mais tarde.");
      console.error("Recovery error:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500 p-6">

      <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-xl transition-transform transform hover:scale-105 duration-300">
        <div className="flex justify-center mb-6">
          <img
            src={Logo}
            alt="Company Logo"
            className="w-12 md:w-16 lg:w-20 xl:w-24"
          />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Recuperar E-mail
        </h2>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {successMessage && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{successMessage}</span>
              <br />
              <a
                href="/"
                className="mt-2 inline-block text-teal-600 hover:underline font-medium"
              >
                Ir para Login
              </a>
            </div>
          )}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="button"
            onClick={handleRecoverEmail}
            className="w-full bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 text-white font-bold py-3 rounded-xl shadow-md transition duration-300 transform hover:scale-105"
          >
            Recuperar E-mail
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Lembraste da tua senha?{" "}
          <NavLink
            to="/"
            className="text-indigo-600 hover:underline font-medium"
          >
            Voltar ao Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default RecoverPassword;
