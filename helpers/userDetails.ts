// getting user details from JWT token stored in cookies
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function userDetails(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) return null;

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

    return decodedToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
