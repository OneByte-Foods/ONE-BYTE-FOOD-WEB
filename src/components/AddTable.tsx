"use client";
import { db } from "@/firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

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

function AddTable() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tableName: "",
      tableDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { tableName, tableDescription } = values;
    try {
      await addDoc(collection(db, "tasks"), {
        tableName,
        tableDescription,
        created: Timestamp.now(),
      });
      //   onClose()
    } catch (err) {
      alert(err);
    }
  }

  return (
    <Dialog>
      <DialogTrigger>Add Table</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Table</DialogTitle>
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

export default AddTable;
