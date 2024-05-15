"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

const formSchema = z.object({
  restaurantName: z.string().min(2).max(50),
  restaurantDescription: z.string().min(20),
  restaurantLocation: z.string().min(1),
  restaurantImage: z.string().url(),
});

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
import { useState } from "react";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";
import { useRouter } from "next/navigation";
function Page() {
    const [error, setError] = useState<string>("");
    const route = useRouter();
  const { uid } = useSelector((state: RootState) => state.auth);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: "",
      restaurantDescription: "",
      restaurantLocation: "",
      restaurantImage: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      restaurantName,
      restaurantDescription,
      restaurantLocation,
      restaurantImage,
    } = values;
    try {
      const restaurantRef = doc(db, "restaurants", restaurantName);
      await setDoc(restaurantRef, {
        restaurantName: restaurantName,
        restaurantDescription: restaurantDescription,
        restaurantLocation: restaurantLocation,
        restaurantImage: restaurantImage,
        adminId: uid,
        isVerified: false,
        staffId: [],
      });
      // Update the user's role to "admin"
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        roles: arrayUnion("admin"),
        restaurantId: restaurantName,
      });

      route.push("/"); // Redirect to home page after successful restaurant registration
    } catch (error) {
      setError("Error registering restaurant");
    }
  }

  return (
    <section className="min-h-screen w-full py-10 px-[100px]">
      <h1 className="text-2xl font-bold"> Register Restaurant</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 border border-black rounded-md px-5 py-3"
        >
          <FormField
            control={form.control}
            name="restaurantName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant Name</FormLabel>
                <FormControl>
                  <Input placeholder="restaurant name" {...field} />
                </FormControl>
                <FormDescription>name of the restaurant</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="restaurantDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="restaurant description" {...field} />
                </FormControl>
                <FormDescription>description of the restaurant</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="restaurantLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant Location</FormLabel>
                <FormControl>
                  <Input placeholder="restaurant location" {...field} />
                </FormControl>
                <FormDescription>location of the restaurant</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="restaurantImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo Url</FormLabel>
                <FormControl>
                  <Input placeholder="photo url" {...field} />
                </FormControl>
                <FormDescription>photo of the restaurant</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
}

export default Page;
