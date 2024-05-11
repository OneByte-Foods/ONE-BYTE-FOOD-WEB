"use client";
import { db, realDb } from "@/firebase/config";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

const formSchema = z.object({
  foodName: z.string().min(2).max(50),
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
import { ref, update } from "firebase/database";
import { Dispatch, SetStateAction, useState } from "react";

function UpdateMenu({
  foodName,
  price,
  category,
  photo,
  id,
  menuId,
  setMenuItems,
}: {
  foodName: string;
  price: string;
  category: string;
  photo: string;
  id: string;
    menuId: string;
    setMenuItems: Dispatch<SetStateAction<any[]>>;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: foodName,
      price: price,
      category: category,
      photo: photo,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { foodName, category, price, photo } = values;

    try {
      const menuRef = doc(db, "restaurants", id, "menu", menuId);
      await updateDoc(menuRef, {
        foodName: foodName,

        foodPrice: parseInt(price),

        foodPhoto: photo,
        foodCategory: category,
      });

      setMenuItems((prev) =>
        prev.map((item) => {
          if (item.id === menuId) {
            return {
              ...item,
              foodName,
              foodPrice: parseInt(price),
              foodPhoto: photo,
              foodCategory: category,
            };
          }
          return item;
        })
      );
      
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error updating menu item: ", error);
      // Handle error
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-black text-white px-4 py-2">
        Update Item
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
                      <FormLabel>food category</FormLabel>
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

export default UpdateMenu;
