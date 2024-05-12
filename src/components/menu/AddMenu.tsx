"use client";
import { db, realDb } from "@/firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

const formSchema = z.object({
  foodName: z.string().min(2).max(50),

  foodPrice: z.string().min(1),
  foodCategory: z.string().min(1),
  foodPhoto: z.string().url(),
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
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction, useState } from "react";

function AddMenu({ id, setMenuItems }: { id: string; setMenuItems:  Dispatch<SetStateAction<any[]>>}) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: "",

      foodPrice: "",
      foodCategory: "",
      foodPhoto: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { foodName, foodCategory, foodPrice, foodPhoto } = values;

    try {
      const menuRef = collection(db, "restaurants", id, "menu");
      await addDoc(menuRef, {
        foodName: foodName,

        foodPrice: foodPrice,

        foodPhoto: foodPhoto,
        foodCategory: foodCategory,
      });

      setMenuItems((prev) => [
        ...prev,
        {
          foodName,
          foodPrice,
          foodPhoto,
          foodCategory,
        },
      ]);
      setOpen(false);
      form.reset();

    } catch (error) {
      console.error("Error adding menu item: ", error);
      // Handle error
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-black text-white px-4 py-2">
        Add Item
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a food item</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="foodName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Food Name</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>name of the food</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="foodPhoto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo Url</FormLabel>
                      <FormControl>
                        <Input placeholder="photo url" {...field} />
                      </FormControl>
                      <FormDescription>photo of the food</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="foodPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="table number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>price of the food</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="foodCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Seats</FormLabel>
                      <FormControl>
                        <Input placeholder="food category" {...field} />
                      </FormControl>
                      <FormDescription>category of the food</FormDescription>
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

export default AddMenu;
