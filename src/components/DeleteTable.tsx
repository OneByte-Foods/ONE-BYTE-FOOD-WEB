import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { Button } from "./ui/button";
import { doc, deleteDoc} from "firebase/firestore";
import { db } from "@/firebase/config";

function DeleteTable({ tableId }: { tableId: string }) {
    const handleDelete = async () => {
        const taskDocRef = doc(db, 'tasks', tableId)
        try{
          await deleteDoc(taskDocRef)
        } catch (err) {
          alert(err)
        }
      }
  return (
    <Dialog>
      <DialogTrigger className="bg-red-400 px-4 py-2 text-white">
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteTable;
