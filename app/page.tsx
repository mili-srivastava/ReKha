"use client"

import { useContext } from "react";
import { UserContext } from "@/context/user";

export default function Home() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Loading...</div>;
  }

  const { user } = userContext;

  return (
    <main>
      <p>Hello {user?.name} </p>
    </main>
  );
}
