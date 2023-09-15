"use client";

import { Button } from "@/containers";
import { UserContext } from "@/context/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";

const options = [
  { value: "Avinash", label: "Avinash" },
  { value: "Himanshu", label: "Himanshu" },
  { value: "JV", label: "JV" },
  { value: "Rachit", label: "Rachit" },
  { value: "Sahgal", label: "Sahgal" },
  { value: "Shivam", label: "Shivam" },
  { value: "Shreye", label: "Shreye" },
];

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "white",
    borderRadius: "0.375rem", // borderRadius from Tailwind's 'rounded-md'
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // boxShadow from Tailwind's 'shadow-sm'
    borderColor: "transparent", // borderColor from Tailwind's 'border-transparent'
  }),
};

const Form = () => {
  if (typeof window !== 'undefined') {
    // You can use localStorage here
    localStorage.setItem('key', 'value');
  }

  
  const router = useRouter();

  // const { user } = useContext(UserContext);
  // get user from local storage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    modeOfPayment: "",
    itemName: "",
    cost: 1,
    consumers: [],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConsumersChange = (selectedOptions: any) => {
    const selectedConsumers = selectedOptions.map(
      (option: any) => option.value
    );
    setFormData((prevData) => ({
      ...prevData,
      consumers: selectedConsumers,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const expenseData = {
      ...formData,
      user: user?.id,
      userName: user?.name,
      items: [
        {
          name: formData.itemName,
          cost: formData.cost,
          consumers: formData.consumers,
        },
      ],
    };

    console.log(expenseData);

    try {
      const response = await axios.post("/api/expense", expenseData);
      if (response.status === 201) {
        // set toast
        toast.success("Expense added");

        setFormData({
          date: "",
          time: "",
          modeOfPayment: "",
          itemName: "",
          cost: 0,
          consumers: [],
        });

        router.push("/");
      }
    } catch (error: any) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border max-w-md mx-auto rounded p-5 text-secondary flex flex-col gap-5 my-5"
    >
      <ToastContainer />
      <div className="flex justify-between">
        <div className="shadow rounded py-1 px-3">
          <label htmlFor="date">Date:&nbsp;</label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="shadow rounded py-1 px-3">
          <label htmlFor="time">Time:&nbsp;</label>
          <input
            type="time"
            name="time"
            id="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>
      </div>

      <input
        type="text"
        name="modeOfPayment"
        id="modeOfPayment"
        placeholder="Mode of Payment (eg: GPay, Paytm, PhonePe, Cash)"
        className="shadow rounded py-1 px-3"
        value={formData.modeOfPayment}
        onChange={handleChange}
      />

      <div>
        <p className="mb-2">Item Details</p>

        <div className="flex flex-wrap gap-5">
          <input
            type="text"
            name="itemName"
            id="itemName"
            className="shadow rounded py-1 px-3"
            placeholder="Item Name"
            value={formData.itemName}
            onChange={handleChange}
          />
          <input
            type="number"
            name="cost"
            id="cost"
            className="shadow rounded py-1 px-3"
            placeholder="Cost"
            // value={formData.cost}
            onChange={handleChange}
          />

          <div className="flex items-center">
            <label htmlFor="consumers">Consumers:&nbsp;</label>
            <Select
              isMulti
              options={options}
              styles={customStyles}
              onChange={handleConsumersChange}
            />
          </div>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        customClass="mt-5 border-2 border-primary w-fit mx-auto py-1 px-5 text-lg hover:bg-primary hover:text-white"
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
