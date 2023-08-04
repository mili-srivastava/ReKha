import { NextRequest, NextResponse } from "next/server";

// import models
import User from "@/models/User";

// import utils
import connectDB from "@/utils/mongoose";

// import bcrypt
import * as bcrypt from "bcryptjs";

// import jsonwebtoken
import * as jwt from "jsonwebtoken";

// connect to DB
connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // find user from DB
    const user = await User.findOne({ email });

    // if user not found
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    //   create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      userName: user.userName,
    };

    //   create token
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: true,
    });

    return response;
  } catch (error: any) {
    if (error.message === "Bad request") {
      return NextResponse.json(
        { message: "Action not allowed" },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 500 }
      );
    }
  }
};
