import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../types/User";
import { registerAPI, loginAPI, logoutAPI } from "../services/AuthService";
import { Slide, toast } from "react-toastify";
import axios from "axios";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

const AuthContext = createContext<UserContextType>({} as UserContextType);
type Props = { children: React.ReactNode };

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer  " + token;
    }
    setIsReady(true);
    navigate("/dashboard");
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const res = await registerAPI(email, username, password);
      if (res) {
        toast.success("Registo feito com sucesso!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Slide,
        });
        navigate("/");
      } else {
        toast.warning("Erro no registo.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Slide,
        });
      }
    } catch (e) {
      toast.warning("Server error occurred", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Slide,
      });
    }
  };

  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.user.token);
          const userObj = {
            username: res?.data.user.username,
            email: res?.data.user.email,
            roleDesc: res?.data.user.roleDesc,
            name: res?.data.user.name,
            token: res?.data.user.token,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setUser(userObj!);
          setToken(res.data.user.token!);
          toast.success("Login efetuado com sucesso!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Slide,
          });
          navigate("/dashboard");
        }else{
          toast.error("Erro de login. Credenciais erradas.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Slide,
          });
        }
      })
      .catch((_e) => toast.warning("Ocorreu um erro no servidor"));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = async () => {
    await logoutAPI()
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
        toast.success("Logout efetuado com sucesso!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Slide,
        });
      })
      .catch((_e) => toast.warning("Ocorreu um erro no servidor"));
  };

  return (
    <AuthContext.Provider
      value={{ user, token, logout, isLoggedIn, registerUser, loginUser }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
