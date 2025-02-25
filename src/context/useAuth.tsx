import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../types/User";
import { registerAPI, loginAPI } from "../services/AuthService";
import { toast } from "react-toastify";

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
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const res = await registerAPI(email, username, password);
      if (res) {
        localStorage.setItem("token", res?.data.token);
        setToken(res?.data.token!);
        toast.success("Registo feito com sucesso!");
        navigate("/");
      } else {
        toast.warning("Erro no registo.");
      }
    } catch (e) {
      toast.warning("Server error occurred");
    }
  };

  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.data.token);
          const userObj = {
            username: res?.data.user.username,
            email: res?.data.user.email,
            roleDesc: res?.data.user.roleDesc,
            name: res?.data.user.name,
          };

          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res.data.token);
          setUser(userObj);
          toast.success("Login efetuado com sucesso!");
          navigate("/dashboard");
        }
      })
      .catch((_e) => toast.warning("Ocorreu um erro no servidor"));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/");
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
