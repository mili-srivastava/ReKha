"use client";

import { Button } from "@/containers";
import Select from "react-select";

const options = [
  { value: "avinash", label: "Avinash" },
  { value: "himanshu", label: "Himanshu" },
  { value: "jv", label: "JV" },
  { value: "rachit", label: "Rachit" },
  { value: "sahgal", label: "Sahgal" },
  { value: "shivam", label: "Shivam" },
  { value: "shreye", label: "Shreye" },
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
  return (
    <form className="border max-w-md mx-auto rounded p-5 text-secondary flex flex-col gap-5 my-5">
      <div className="flex justify-between">
        <div className="shadow rounded py-1 px-3">
          <label htmlFor="date">Date:&nbsp;</label>
          <input type="date" name="date" id="date" />
        </div>

        <div className="shadow rounded py-1 px-3">
          <label htmlFor="time">Time:&nbsp;</label>
          <input type="time" name="time" id="time" />
        </div>
      </div>

      <input
        type="text"
        name="modeOfPayment"
        id="modeOfPayment"
        placeholder="Mode of Payment (eg: GPay, Paytm, PhonePe, Cash)"
        className="shadow rounded py-1 px-3"
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
          />
          <input
            type="number"
            name="cost"
            id="cost"
            className="shadow rounded py-1 px-3"
            placeholder="Cost"
          />
          <input
            type="number"
            name="count"
            id="count"
            className="shadow rounded py-1 px-3"
            placeholder="Count"
          />

          <div className="flex items-center">
            <label htmlFor="consumers">Consumers:&nbsp;</label>
            <Select isMulti options={options} styles={customStyles} />
          </div>
        </div>
      </div>

      <Button customClass="mt-5 border-2 border-primary w-fit mx-auto py-1 px-5 text-lg hover:bg-primary hover:text-white">
        Submit
      </Button>
    </form>
  );
};

export default Form;
