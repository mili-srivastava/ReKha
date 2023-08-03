import { NextRequest, NextResponse } from "next/server";

// import utils
import connectDB from "@/utils/mongoose";

// import models
import Expense from "@/models/Expense";

// connect to DB
connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { date, modeOfPayment, items, user } = reqBody;

    // create expense object
    const newExpense = new Expense({
      date: date,
      modeOfPayment: modeOfPayment,
      items: items,
      user: user,
    });

    // save expense
    const savedExpense = await newExpense.save();

    return NextResponse.json(savedExpense, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const expenses = await Expense.find();
    return NextResponse.json(expenses, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Expenses not found" }, { status: 404 });
  }
};
