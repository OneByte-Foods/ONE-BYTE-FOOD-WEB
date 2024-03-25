"use client";
import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

const formSchema = z.object({
  tableName: z.string().min(2).max(50),
  tableDescription: z.string().min(20),
  // tableAvailibility: z
});

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";

function UpdateTable({
  tableData,
  tableId,
}: {
  tableData: any;
  tableId: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tableName: tableData.tableName,
      tableDescription: tableData.tableDescription,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { tableName, tableDescription } = values;
    const taskDocRef = doc(db, "tasks", tableId);
    try {
      await updateDoc(taskDocRef, {
        tableName,
        tableDescription,
      });
    } catch (err) {
      alert(err);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-black px-4 py-2 text-white">Update</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Table</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="tableName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Table Name</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>give your table a name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tableDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Table Name</FormLabel>
                      <FormControl>
                        <Textarea placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        a sweet description for your table
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateTable;
