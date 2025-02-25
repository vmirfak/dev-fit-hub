import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { UserProfile } from "../types/User";
import { getAllUsers } from "../services/UserService";

interface UserContextType {
  users: UserProfile[] | null;
  fetchAllUsers: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserProfile[] | null>(null);

  const fetchAllUsers = async () => {
    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers ?? []);
    } catch (error) {
      console.error("Failed to fetch all users:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, fetchAllUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
