"use client";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "@/firebase/config";

export function UserAuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");
  const [createUserWithEmailAndPassword, user, error,] = useCreateUserWithEmailAndPassword(auth);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    if (password !== cpassword) {
      alert("Password does not match");
      setIsLoading(false);
      return;
    }

    const res = await createUserWithEmailAndPassword(email, password);
    console.log(res);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  function handleSubmit() {
    
  }
  return (
    <div className="grid gap-4">
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-3">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label className="sr-only" htmlFor="password">
              password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="on"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Label className="sr-only" htmlFor="cpassword">
              confirm password
            </Label>
            <Input
              id="cpassword"
              placeholder="confirm password"
              type="password"
              autoCapitalize="none"
              autoComplete="on"
              autoCorrect="off"
              onChange={(e) => setCPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading} onClick={handleSubmit}>Sign Up with Email</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        className="flex items-center gap-2 text-xl"
      >
        <FcGoogle /> <span>Google</span>
      </Button>
    </div>
  );
}
