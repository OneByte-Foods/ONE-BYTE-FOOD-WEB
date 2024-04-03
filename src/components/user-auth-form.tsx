"use client";

import { FiMail } from "react-icons/fi";
import { useState } from "react";
import { FcGoogle, FcImageFile } from "react-icons/fc";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdOutlineLockClock } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

export function UserAuthForm() {
  const route = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [createUserWithEmailAndPassword, user, error] =
    useCreateUserWithEmailAndPassword(auth);

  const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const nameValidation = /^[a-zA-Z0-9._-]{3,20}$/;

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setErrorMessage("");
    if (!email || !password || !username) {
      setErrorMessage("Please fill all the fields");
      return;
    } else if (!emailValidation.test(email)) {
      setErrorMessage("Please enter a valid email");
      return;
    } else if (!passwordValidation.test(password)) {
      setErrorMessage(
        "Password must be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
      );
      return;
    } else if (!nameValidation.test(username)) {
      setErrorMessage("Username must be 3 to 20 characters");
      return;
    }

    const res = await createUserWithEmailAndPassword(email, password);

    await addDoc(collection(db, "Random_Signin_Users"), {
      email: res?.user.email,
      username: username,
      isAdmin: false,
      imageUrl: `https://ui-avatars.com/api/?name=${username}`,
      uid: res?.user.uid,
    });
    route.push("/login");
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="p-[50px] w-[500px] bg-[#d6d6d600] rounded-2xl border border-[#222]">
      <h2 className="text-2xl font-semibold text-center text-[30px] mb-[50px]">
        <span className="text-[#F17228]">Signup</span>
      </h2>

      <div className="flex flex-col mb-[38px]">
        <div className="flex gap-5 py-[10px] items-center border-b-[1px] border-[#222] focus-within:border-[#F17228] text-[#222] focus-within:text-[#F17228]">
          <FaUser className="text-[28px]" />
          <input
            id="username"
            type="username"
            placeholder="Username"
            className="w-full border-none outline-none focus:outline-none focus:border-none bg-transparent text-[22px] p-0 focus:text-[#222] "
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
            Sign Up
          </button>
          <Link
            href="/login"
            className="bg-transparent w-[190px] px-6 py-3 text-xl rounded-[20px] border border-[#F17228] text-center transition-all hover:bg-[#F17228] hover:border-[#F17228]"
          >
            Login
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
