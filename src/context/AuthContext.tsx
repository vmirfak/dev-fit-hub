import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  roleDesc: string;
  birthday: string;
  role: "admin" | "user" | "3" | "4";
}

const AuthContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}>({ user: null, setUser: () => {}, logout: () => {} });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userDataToken");
    if (userData) {
      try {
        if (userData.split('.').length === 3) {
          const decoded = atob(userData.split('.')[1]);
          const parsedUser = JSON.parse(decoded);
          setUser(parsedUser);
        } else {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userDataToken");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
