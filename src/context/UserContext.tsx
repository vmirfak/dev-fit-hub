import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  roleDesc: string;
  birthday: string;
  role: 'admin' | 'user' | '3' | '4';
}

const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void; 
}>({ user: null, setUser: () => {}, logout: () => {} });

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('userDataToken');
    if (token) {
      const decodedUser = JSON.parse(atob(token.split('.')[1])); 
      setUser(decodedUser)
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userDataToken'); 
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};


