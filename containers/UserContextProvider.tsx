"use client";

import { ReactNode } from "react";
import { UserProvider } from "@/context/user";

const UserContextProvider = ({ children }: { children?: ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default UserContextProvider;
