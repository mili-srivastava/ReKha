import Link from "next/link";

// components
import { Form } from "@/components/login";

const login = () => {
  return (
    <div className="my-44">
      <div className="flex flex-col gap-3 m-5">
        <h1 className="font-[900] text-5xl text-blackish">Login</h1>
        <p className="text-gray-400 text-xl font-bold">
          Please sign in to continue
        </p>
      </div>

      {/* login form */}
      <Form />

      <p className="text-gray-400 text-lg text-center my-20">
        Don&apos;t have an account?&nbsp;
        <Link href="/signup">
          <span className="font-bold text-primary hover:underline">
            Sign up
          </span>
        </Link>
      </p>
    </div>
  );
};

export default login;
