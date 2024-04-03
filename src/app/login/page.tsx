import { Metadata } from "next";
import Link from "next/link";
import SingupBg from "../../../public/signup.jpg"

import { UserAuthFormLogin } from "@/components/user-auth-form-login";
import Image from "next/image";

export const metadata: Metadata = {
  title: "signin - One Byte Food",
  description: "Authentication for One Byte Food.",
};

export default function AuthenticationPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
    <Image src={SingupBg} alt="food on background" fill={ true} />
      <div className="w-[400px] flex flex-col gap-4 z-20">
        <UserAuthFormLogin />
        <p className="px-8 text-center text-sm">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
    
  );
}
