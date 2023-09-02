import { Button } from "@/containers";
import Link from "next/link";

const MidSection = () => {
  return (
    <div className="w-full flex justify-center my-20">
      <Link href="/add-expense">
        <Button>Add Expense</Button>
      </Link>
    </div>
  );
};

export default MidSection;
