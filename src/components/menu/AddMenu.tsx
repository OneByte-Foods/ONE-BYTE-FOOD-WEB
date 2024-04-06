"use client";
import { db, realDb } from "@/firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

const formSchema = z.object({
  foodName: z.string().min(2).max(50),
  foodDescription: z.string().min(20),
  price: z.string().min(1),
  category: z.string().min(1),
  photo: z.string().url(),
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
import { push, ref, set } from "firebase/database";
import { useState } from "react";

function AddMenu() {
    const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: "",
      foodDescription: "",
      price: "",
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { foodName, foodDescription, category, price, photo } = values;
    set(push(ref(realDb, "menu")), {
        food_name: foodName,
        description: foodDescription,
        price: price,
        is_available: true,
        photo: photo,
        category: category,
    });
      setOpen(false);
      form.reset();
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
                  name="foodDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Food Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="food description" {...field} />
                      </FormControl>
                      <FormDescription>description of the food</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="photo"
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
                  name="price"
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
                  name="category"
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
