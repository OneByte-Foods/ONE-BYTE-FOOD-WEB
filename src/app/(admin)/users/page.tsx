"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";

function Page() {
  const [open, setOpen] = useState(false);

  function addUser() {
    console.log("User added");
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-[#222] px-3 py-2 rounded-[6px] text-[#fff] h-10 mt-3">
        Add User
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              className="p-2 border border-gray-300 rounded-md"
            />
          </DialogDescription>

          <Button onClick={addUser}>Add</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Page;
