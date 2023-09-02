"use client";

// react
import { useState } from "react";

// next
import { useRouter } from "next/navigation";

import axios from "axios";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// icons
import { HiOutlineMail } from "react-icons/hi";
import { BiSolidLockAlt, BiSolidUserBadge } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { BsFillFileLock2Fill } from "react-icons/bs";

const Form = () => {
  const router = useRouter();

  // states for login data
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const [loading, setLoading] = useState(false);

  // handle data on change
  const handleDataChange = (e: any) => {
    const { name, value } = e.target;

    // set data
    switch (name) {
      case "name":
        setName(value);
        break;

      case "username":
        setUsername(value);
        break;

      case "email":
        setEmail(value);
        break;

      case "password":
        setPassword(value);
        break;

      case "confirmPassword":
        setConfirmpassword(value);
        break;

      default:
        break;
    }
  };

  // handle login
  const handleLogin = async (e: any) => {
    e.preventDefault();

    // set loading to true
    setLoading(true);

    // set data
    const data = {
      name,
      userName: username.toLowerCase(),
      email,
      password,
    };

    // ------------------- validations ---------------------
    // check if any field is empty
    if (!name || !username || !email || !password || !confirmpassword) {
      const notify = () => {
        toast.error("Please fill all the fields", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };
      notify();
      setLoading(false);
      return;
    }

    // check if password and confirm password are same
    if (password !== confirmpassword) {
      const notify = () => {
        toast.error("Passwords do not match", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };
      notify();
      setLoading(false);
      return;
    }

    // check if password has atleast 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      const notify = () => {
        toast.error(
          "Password must have atleast 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      };
      notify();
      setLoading(false);
      return;
    }

    // check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      const notify = () => {
        toast.error("Please enter a valid email address", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };
      notify();
      setLoading(false);
      return;
    }

    // -------------backend call ---------------

    // login user using axios
    try {
      const response = await axios.post("/api/user/signup", data);

      // set token to local storage
      localStorage.setItem("token", response.data.token);

      // set loading to false
      setLoading(false);

      // redirect to dashboard
      router.push("/login");
    } catch (error) {
      // set loading to false
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className={`m-5 flex flex-col gap-7 my-10 ${
        loading && `opacity-50 user-select-none cursor-progress`
      }`}
    >
      <ToastContainer />
      <div className="shadow rounded-lg p-3 flex gap-3">
        <FaUser className="text-2xl text-gray-400" />
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Full Name"
          className="text-lg outline-none"
          onChange={handleDataChange}
        />
      </div>

      <div className="shadow rounded-lg p-3 flex gap-3">
        <BiSolidUserBadge className="text-2xl text-gray-400" />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="text-lg outline-none"
          onChange={handleDataChange}
        />
      </div>

      <div className="shadow rounded-lg p-3 flex gap-3">
        <HiOutlineMail className="text-2xl text-gray-400" />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="text-lg outline-none"
          onChange={handleDataChange}
        />
      </div>

      <div className="shadow rounded-lg p-3 flex gap-3">
        <BiSolidLockAlt className="text-2xl text-gray-400" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="text-lg outline-none"
          onChange={handleDataChange}
        />
      </div>

      <div className="shadow rounded-lg p-3 flex gap-3">
        <BsFillFileLock2Fill className="text-2xl text-gray-400" />
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          className="text-lg outline-none"
          onChange={handleDataChange}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-primary text-gray-100 font-bold px-7 py-3 rounded-full text-2xl"
        >
          {loading ? "processing..." : "Signup"}
        </button>
      </div>
    </form>
  );
};

export default Form;
