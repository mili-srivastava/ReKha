"use client";

// react
import { useState } from "react";

// next
import Link from "next/link";
import { useRouter } from "next/navigation";

import axios from "axios";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// icons
import { HiOutlineMail } from "react-icons/hi";
import { BiSolidLockAlt } from "react-icons/bi";

const Form = () => {
  const router = useRouter();

  // states for login data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // handle data on change
  const handleDataChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  // handle login
  const handleLogin = async (e: any) => {
    e.preventDefault();

    // set loading to true
    setLoading(true);

    // set data
    const data = {
      email,
      password,
    };

    // check if any field is empty
    if (email === "" || password === "") {
      // set toast
      toast.error("Please fill all the fields");

      // set loading to false
      setLoading(false);

      return;
    }

    // login user using axios
    try {
      const response = await axios.post("/api/user/login", data);

      const token = await response.data.token;

      // set token to local storage
      localStorage.setItem("token", token);

      // set toast
      toast.success("Login successful");

      // set loading to false
      setLoading(false);

      // redirect to dashboard
      router.push("/");
    } catch (error: any) {
      // set toast
      if (error.response.data.message === "Invalid credentials") {
        toast.error("Invalid credentials");
      } else {
        toast.error("Something went wrong");
      }

      // set loading to false
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className={`m-5 flex flex-col gap-10 my-16 ${
        loading && `opacity-50 user-select-none cursor-progress`
      }`}
    >
      <ToastContainer />

      <div className="shadow rounded-lg p-3 flex gap-3">
        <HiOutlineMail className="text-2xl text-gray-400" />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="text-lg outline-none flex-1"
          onChange={handleDataChange}
        />
      </div>

      <div className="flex flex-col gap-5">
        <div className="shadow rounded-lg p-3 flex gap-3">
          <BiSolidLockAlt className="text-2xl text-gray-400" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="text-lg outline-none flex-1"
            onChange={handleDataChange}
          />
        </div>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="w-fit text-primary font-bold text-right text-lg hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-primary text-gray-100 font-bold px-7 py-3 rounded-full text-2xl"
        >
          {loading ? "processing..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default Form;
