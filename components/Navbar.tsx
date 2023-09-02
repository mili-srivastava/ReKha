"use client";

import { Button } from "@/containers";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/user/logout");
      router.push("/login");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <nav className="flex justify-between items-center p-5 shadow">
      <Image
        src="/images/logo.png"
        alt="logo"
        width="100"
        height="100"
        className="h-7 w-fit"
      />
      <Button onClick={logout}>Log Out</Button>

      <div className="absolute">
        <ToastContainer />
      </div>
    </nav>
  );
};

export default Navbar;
