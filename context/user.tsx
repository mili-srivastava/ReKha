import React, { createContext, useState, ReactNode } from "react";

type UserContextType = {
  user: null | { [key: string]: any };
  setUser: React.Dispatch<React.SetStateAction<null | { [key: string]: any }>>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<null | { [key: string]: any }>({
    id: "",
    name: "",
    userName: "",
    email: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};