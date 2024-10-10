import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";

interface LoginProps {
  setLoading: (loading: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setLoading }) => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    const { username, password } = values;

    // Mocked user data for demonstration
    const users = [
      {
        id: 1,
        username: "111",
        name: "Rúben Silva [Admin]",
        email: "rubenSilva@example.com",
        phone: "+351999999999",
        address: "Rua de Flg 123, 4610-99 FLG",
        birthday: "27 Set 1992",
        role: "admin" as "administrator",
      },
      {
        id: 2,
        username: "222",
        name: "Pedro Moreira [User]",
        email: "pedromoreira@example.com",
        phone: "+351111111111",
        address: "Rua de Flg 999, 4610-555 FLG",
        birthday: "26 Nov 1994",
        role: "user" as "user",
      },
    ];

    // Dummy authentication logic based on hardcoded credentials.
    const user = users.find(
      (u) => u.username === username && password === username
    );
    if (user) {
      setUser(user); // Set the logged-in user in context
      navigate("/dashboard");
    } else {
      setLoginError("Invalid username or password");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
      <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-xl transition-transform transform hover:scale-105 duration-300">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Welcome Back
        </h2>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  placeholder="Enter your username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              {loginError && (
                <div className="text-red-600 text-sm">{loginError}</div>
              )}
              <div className="flex items-center justify-between mt-4">
                <label className="flex items-center">
                  <Field
                    type="checkbox"
                    className="form-checkbox text-indigo-600"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <a href="#" className="text-sm text-indigo-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-md transition duration-300 transform hover:scale-105"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <NavLink
            to="/registration"
            className="text-indigo-600 hover:underline font-medium"
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
