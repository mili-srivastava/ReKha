import Link from "next/link";

// components
import { Form } from "@/components/signup";

const signup = () => {
  return (
    <div className="mt-16 mb-10">
      <h1 className="font-[900] text-4xl text-blackish m-5">Create Account</h1>

      {/* signup form */}
      <Form />

      <p className="text-gray-400 text-lg text-center mt-14">
        Already have an account?&nbsp;
        <Link href="/login">
          <span className="font-bold text-primary hover:underline">
            Login
          </span>
        </Link>
      </p>
    </div>
  );
};

export default signup;
