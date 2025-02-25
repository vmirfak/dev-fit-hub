import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import Logo from "../../images/logo/b-green-stroke.png";
import { useAuth } from "../../context/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type LoginFormsInputs = {
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginFormsInputs) => {
    loginUser(form.userName, form.password);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
      {/* Card Container */}
      <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-xl transition-transform transform hover:scale-105 max-h-[90vh]duration-300">
        {/* Logo Container (Inside the Card) */}
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="Company Logo" className="w-20 sm:w-18 md:w-28" />
        </div>
        {/* Welcome Back Text */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Bem-vindo!
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Nome de Utilizador
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              placeholder="Enter your username"
              {...register("userName")}
            />
            {errors.userName ? (
              <p className="text-white">{errors.userName.message}</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Palavra-Passe
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              placeholder="Enter your password"
              {...register("password")}
            />
          </div>
          {errors.password ? (
            <p className="text-white">{errors.password.message}</p>
          ) : (
            ""
          )}
          <div className="flex items-center justify-between mt-4">
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              <NavLink
                to="/recover"
                className="text-indigo-600 hover:underline font-medium"
              >
                Esqueceste-te da Palavra-Passe?
              </NavLink>
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-md transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Não tens uma conta?{" "}
          <NavLink
            to="/registration"
            className="text-indigo-600 hover:underline font-medium"
          >
            Registar
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
