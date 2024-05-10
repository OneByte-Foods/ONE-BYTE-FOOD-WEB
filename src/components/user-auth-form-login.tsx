"use client";

import { useState } from "react";
import { logInWithEmailAndPassword, signInWithGoogle } from "@/firebase/config";
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
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/features/auth-slice";
import { setUser } from "../../redux/features/users-slice";

export function UserAuthFormLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();

  const route = useRouter();

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

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setErrorMessage("");

    const res = await logInWithEmailAndPassword(email, password);
    console.log(res);

    if (typeof res == "string") {
      setErrorMessage(res);
      return;
    }

    dispatch(
      loginSuccess({
        uid: res.uid,
      })
    );
    dispatch(
      setUser({
        email: res.email,
        imageUrl: `https://ui-avatars.com/api/?name=${res.username}`,
        username: res.username,
        roles: res.role,
      })
    );
    localStorage.setItem("uid", JSON.stringify(res.uid));
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
