"use client";

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
      <button
        className="border-primary border-2 px-5 py-1.5 text-primary font-bold rounded-lg"
        onClick={logout}
      >
        Log Out
      </button>

      <div className="absolute">
        <ToastContainer />
      </div>
    </nav>
  );
};

export default Navbar;
