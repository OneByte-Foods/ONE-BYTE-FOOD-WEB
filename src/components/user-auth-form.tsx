"use client";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";

export function UserAuthForm() {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [createUserWithEmailAndPassword, user, error] =
    useCreateUserWithEmailAndPassword(auth);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    if (password !== cpassword) {
      alert("Password does not match");
      return;
    }

    const res = await createUserWithEmailAndPassword(email, password);

    await addDoc(collection(db, "Random_Signin_Users"), {
      email: res?.user.email,
      username: username,
      isAdmin: false,
      imageUrl: "",
      uid: res?.user.uid,
    });
    route.push("/dashboard");
  }

  function handleSubmit() {}
  return (
    <div className="grid gap-4">
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-3">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="username"
              value={username}
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              required
              disabled={isLoading}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              value={email}
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              required
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
            />
          </div>
          <Button onClick={handleSubmit}>Sign Up with Email</Button>
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
