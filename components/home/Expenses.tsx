"use client";

import axios from "axios";
import { Fragment, useEffect, useState } from "react";

// Define the type for expenses
interface ExpenseType {
  name: string;
  cost: number;
  consumers: string[];
}

interface Expense {
  _id: string;
  userName: string;
  date: string;
  modeOfPayment: string;
  items: ExpenseType[]; // items is an array of ExpenseType
}

const Expenses = () => {
  // Use the defined type when declaring your state
  const [expenses, setExpenses] = useState<Expense[]>([]); // Change this to Expense[]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/expense");
        // set expenses to state
        setExpenses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Group expenses by date
  const expensesByDate = expenses.reduce((acc: any, expense: Expense) => {
    const date = new Date(expense.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(expense);

    return acc;
  }, {});

  return (
    <section>
      <p className="text-3xl text-center font-bold text-primary">Expenses</p>
      <div className="overflow-auto">
        <table className="text-center w-full">
          <thead className="border">
            <tr>
              <th className="border-2 md:text-2xl">Date</th>
              <th className="border-2 md:text-2xl">Payer</th>
              <th className="border-2 md:text-2xl">Mode Of Payment</th>
              <th className="border-2 md:text-2xl">Item Name</th>
              <th className="border-2 md:text-2xl">Cost</th>
              <th className="border-2 md:text-2xl">Consumers</th>
            </tr>
          </thead>
          <tbody>
  {Object.entries(expensesByDate).sort((a, b) => {
    const dateA = a[0].split("/").reverse().join("");
    const dateB = b[0].split("/").reverse().join("");
    return dateA.localeCompare(dateB);
  })
  .map(([date, expenses]) => (
    <Fragment key={date}>
      <tr className="border">
        <td rowSpan={(expenses as Expense[]).length} className="border-r border-l ">{date}</td>
        {(expenses as Expense[])[0] && (
          <Fragment>
            <td className="border-r ">{(expenses as Expense[])[0].userName.split(" ")[0]}</td>
            <td className="border-r ">{(expenses as Expense[])[0].modeOfPayment}</td>
            {(expenses as Expense[])[0].items.map((item: ExpenseType, index: number) => (
              <Fragment key={index}>
                <td className="border-r ">{item.name}</td>
                <td className="border-r ">{item.cost}</td>
                <td className="border-r  max-w-sm">
                  {item.consumers.join(", ")}
                </td>
              </Fragment>
            ))}
          </Fragment>
        )}
      </tr>
      {(expenses as Expense[]).slice(1).map((expense: Expense) => (
        <tr key={expense._id} className="border-t ">
          <td className="border-r ">{expense.userName.split(" ")[0]}</td>
          <td className="border-r ">{expense.modeOfPayment}</td>
          {expense.items.map((item: ExpenseType, index: number) => (
            <Fragment key={index}>
              <td className="border-r ">{item.name}</td>
              <td className="border-r ">{item.cost}</td>
              <td className="border-r  max-w-sm">
                {item.consumers.join(", ")}
              </td>
            </Fragment>
          ))}
        </tr>
      ))}
    </Fragment>
  ))}
</tbody>

        </table>
      </div>
    </section>
  );
};

export default Expenses;