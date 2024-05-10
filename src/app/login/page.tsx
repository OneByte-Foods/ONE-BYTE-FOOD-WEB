import { Metadata } from "next";
import Link from "next/link";
import SingupBg from "../../../public/signup.jpg";

import { UserAuthFormLogin } from "@/components/user-auth-form-login";
import Image from "next/image";

export const metadata: Metadata = {
  title: "signin - One Byte Food",
  description: "Authentication for One Byte Food.",
};

export default function AuthenticationPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f7f6f6]">
      <div className="w-[400px] items-center flex flex-col gap-4 z-20">
        <h1 className="text-[#F17228] font-bold text-[50px]">
          One Byte <span className="text-[#FFB30E]">Food</span>
        </h1>
        <UserAuthFormLogin />
      </div>
    </div>
  );
}
