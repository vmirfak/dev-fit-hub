import { NavLink } from "react-router-dom";
import Logo from "../../../images/logo/b-blue-stroke.png";
import { useAuth } from "../../../context/useAuth";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type Props = {};

type RegisterFormsInputs = {
  email: string;
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("É necessário um endereço de e-mail"),
  userName: Yup.string().required(
    "É necessário introduzir o Nome de utilizador."
  ),
  password: Yup.string().required("É necessário introduzir uma palavra-passe."),
});

const Registration = (_props: Props) => {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });

  const handleRegistration = (form: RegisterFormsInputs) => {
    registerUser(form.email, form.userName, form.password);
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
        <form className="space-y-6" onSubmit={handleSubmit(handleRegistration)}>
          {errors.email || errors.userName || errors.password ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mb-4"
              role="alert"
            >
              {errors.email?.message ||
                errors.userName?.message ||
                errors.password?.message}
            </div>
          ) : null}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Nome de Utilizador
            </label>
            <input
              type="text"
              id="userName"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
              placeholder="Nome de utilizador desejado"
              {...register("userName")}
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
              placeholder="Introduza o seu e-mail"
              {...register("email")}
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Palavra-Passe
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
              placeholder="Palavra-pass desejada"
              {...register("password")}
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Confirmar Palavra-Passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
              placeholder="Confirme palavra-pass desejada"
            />
          </div>
          <button
            type="submit"
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
