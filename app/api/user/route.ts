import { NextRequest, NextResponse } from "next/server";

// import models
import User from "@/models/User";

// import utils
import connectDB from "@/utils/mongoose";

// connect to DB
connectDB();

export const GET = async (request: NextRequest) => {
  try {
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error: any) {
    if (error.message === "Users not found") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    } else if (error.message === "Bad request") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
};
