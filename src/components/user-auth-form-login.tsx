"use client";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { MdOutlineLockClock } from "react-icons/md";
import Link from "next/link";

export function UserAuthFormLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [signInWithEmailAndPassword, user, error] =
    useSignInWithEmailAndPassword(auth);
  const route = useRouter();

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setErrorMessage("");

    const res = await signInWithEmailAndPassword(email, password);
    
    if (!res?.user) {
      setErrorMessage("Invalid email or password");
      return;
    }

    const userDocRef = doc(db, "Random_SigninUsers", res?.user.uid || "");

    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        if (userDoc.data().isAdmin) {
          route.push("/daseboard");
          return;
        } else {
          route.push("/");
          return;
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting user document:", error);
    }
    route.push("/dashboard");

    setEmail("");
    setPassword("");
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="p-[50px] w-[500px] bg-[#d6d6d600] rounded-2xl border border-[#222]">
      <h2 className="text-2xl font-semibold text-center text-[30px] mb-[50px]">
        <span className="text-[#F17228]">Login</span>
      </h2>

      <div className="flex flex-col mb-[38px]">
        <div className="flex gap-5 py-[10px] items-center border-b-[1px] border-[#222] focus-within:border-[#F17228] text-[#222] focus-within:text-[#F17228]">
          <FiMail className="text-[28px]" />
          <input
            id="email"
            type="email"
            placeholder="Email"
            required={true}
            className="w-full border-none outline-none focus:outline-none focus:border-none bg-transparent text-[22px] p-0 focus:text-[#222] "
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-between py-[10px] items-center border-b-[1px] border-[#222] focus-within:border-[#F17228] text-[#222] focus-within:text-[#F17228]">
          <div className="flex gap-5 items-center">
            <MdOutlineLockClock className="text-[28px]" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border-none outline-none bg-transparent text-[22px] p-0 focus:outline-none focus:border-none focus:text-[#222]"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {password && (
            <div
              onClick={handleShowPassword}
              className="transition-all hover:bg-[#989898] flex items-center justify-center h-10 w-10 rounded-full cursor-pointer"
            >
              {showPassword ? (
                <FaRegEye className="text-[22px] cursor-pointer" />
              ) : (
                <FaRegEyeSlash className="text-[22px] text-[#d1803d]" />
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-5">
          <p className="text-[#F17228] text-[16px]">{errorMessage}</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <button
            type="button"
            className="transition-all bg-[#F17228] w-[190px] px-6 py-3 text-xl rounded-[20px]"
            onClick={handleSubmit}
          >
            Login
          </button>
          <Link
            href="/login"
            className="bg-transparent w-[190px] px-6 py-3 text-xl rounded-[20px] border border-[#F17228] text-center transition-all hover:bg-[#F17228] hover:border-[#F17228]"
          >
            Sign Up
          </Link>
        </div>
        <p className="text-center text-[22px]">Or</p>
        <p className="text-center text-[22px] text-[#222] ">Login Using</p>
        <div className="flex items-center justify-center gap-5">
          <FcGoogle className="text-[28px]" />
        </div>
      </div>
    </div>
  );
}
