"use client"

import { useContext } from "react";
import { UserContext } from "@/context/user";

export default function Home() {
  const userContext = useContext(UserContext);

  const { user } = userContext;

  return (
    <main>
      <p>
        Hello&nbsp;
        {user?.name}
      </p>
    </main>
  );
}
