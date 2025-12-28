import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const NavBtns = () => {
  return (
    <div className="flex gap-4">
      <Link href="/login">
        <Button className={"bg-blue-500 text-blue-50"}>Log in</Button>
      </Link>
      <Link href="/register">
        <Button
          className={"border border-blue-500 bg-transparent text-blue-800"}
        >
          Create a free account
        </Button>
      </Link>
    </div>
  );
};

export default NavBtns;
