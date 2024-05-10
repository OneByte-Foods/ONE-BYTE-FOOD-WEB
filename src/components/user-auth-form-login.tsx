"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  auth,
  db,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "@/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

export function UserAuthFormLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const route = useRouter();

  const logGoogleUser = async () => {
    const res = await signInWithGoogle();
    if (res) {
      setErrorMessage(res);
      return;
    }
    route.push("/");
  };

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setErrorMessage("");

    const res = await logInWithEmailAndPassword(email, password);

    if (res) {
      setErrorMessage(res);
      return;
    }
    route.push("/");

    setEmail("");
    setPassword("");
  }

  return (
    <Card className="mx-auto max-w-sm border-[#ff8c00] shadow-sm shadow-[#ff8c00]">
      <CardHeader>
        <CardTitle className="text-xl">Login</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
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
