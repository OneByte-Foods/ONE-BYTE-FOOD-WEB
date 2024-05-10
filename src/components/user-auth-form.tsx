"use client";
import { useState } from "react";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "@/firebase/config"; // Firebase configuration
import { useRouter } from "next/navigation"; // Next.js router
import Link from "next/link"; // Next.js Link component

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/features/auth-slice";
import { setUser } from "../../redux/features/users-slice";

// User authentication form component
export function UserAuthForm() {
  const route = useRouter(); // Next.js router
  const [email, setEmail] = useState<string>(""); // Email state
  const [password, setPassword] = useState<string>(""); // Password state
  const [username, setUsername] = useState<string>(""); // Username state
  const [errorMessage, setErrorMessage] = useState<string>(""); // Error message state
  const dispatch = useDispatch();

  // Regular expressions for input validation
  const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const nameValidation = /^[a-zA-Z0-9._-]{3,20}$/;

  // Handle form submission
  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault(); // Prevent default form submission behavior
    setErrorMessage(""); // Clear previous error message
    if (!email || !password || !username) {
      setErrorMessage("Please fill all the fields"); // Show error message if fields are empty
      return;
    } else if (!emailValidation.test(email)) {
      setErrorMessage("Please enter a valid email"); // Show error message for invalid email format
      return;
    } else if (!passwordValidation.test(password)) {
      setErrorMessage(
        "Password must be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
      ); // Show error message for invalid password format
      return;
    } else if (!nameValidation.test(username)) {
      setErrorMessage("Username must be 3 to 20 characters"); // Show error message for invalid username format
      return;
    }

    // Register user with email and password using Firebase
    const res: any = await registerWithEmailAndPassword(
      username,
      email,
      password
    );

    if (typeof res === "string") {
      setErrorMessage(res);
    } else {
      route.push("/login");
    }
  }

  // Handle Google sign-in
  const logGoogleUser = async () => {
    const res = await signInWithGoogle();
    console.log(res);
    if (typeof res == "string") {
      setErrorMessage(res); // Set error message if Google sign-in fails
      return;
    }
    dispatch(
      loginSuccess({
        uid: res.uid,
      })
    );
    localStorage.setItem("uid", JSON.stringify(res.uid));
    route.push("/"); // Redirect to home page after successful Google sign-in
  };

  return (
    <Card className="mx-auto max-w-sm border-[#ff8c00] shadow-sm shadow-[#ff8c00]">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">username</Label>
            <Input
              id="username"
              placeholder="Bikalpa"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Display error message if any */}
          <div className="flex items-center justify-between mt-5">
            <p className="text-[#F17228] text-[16px]">{errorMessage}</p>
          </div>
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Create an account
          </Button>
          <Button variant="outline" className="w-full" onClick={logGoogleUser}>
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="#" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
