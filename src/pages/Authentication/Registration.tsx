import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../images/logo/b-blue-stroke.png";

const Registration: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = async () => {
    // Clear previous messages
    setError("");
    setSuccessMessage("");

    // Input validations
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As palavras pass não coincidem!");
      return;
    }

    // Prepare user data for registration
    const userData = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        // Registo bem-sucedido
        setSuccessMessage(
          "Registo realizado com sucesso! Agora pode iniciar sessão."
        );
        setUsername("");
        setPassword("");
        setEmail("");
        setConfirmPassword("");
      } else {
        // Lidar com erros do servidor
        setError(result.message || "Registo falhou. Tente novamente.");
      }
    } catch (error) {
      setError(
        "Ocorreu um erro ao realizar o registo. Por favor, tente novamente mais tarde."
      );
      console.error("Erro no registo:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-teal-500 to-green-600 p-6">
      <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-xl transition-transform transform hover:scale-105 duration-300">
        <div className="flex justify-center mb-6">
          <img
            src={Logo}
            alt="Company Logo"
            className="w-12 md:w-16 lg:w-20 xl:w-24"
          />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Criar uma Conta
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
              Nome de Utilizador
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
              placeholder="Enter your username"
            />
          </div>
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
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Palavra-Passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Confirmar Palavra-Passe
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="button"
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 text-white font-bold py-3 rounded-xl shadow-md transition duration-300 transform hover:scale-105"
          >
            Registar
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Já tens uma conta?{" "}
          <NavLink
            to="/"
            className="text-indigo-600 hover:underline font-medium"
          >
            Anterior
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Registration;
