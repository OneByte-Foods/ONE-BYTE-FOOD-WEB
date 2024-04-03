import Image from "next/image";
import SingupBg from "../../../public/signup.jpg"
import Link from "next/link";

import { UserAuthForm } from "@/components/user-auth-form";


function page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Image src={SingupBg} alt="food on background" fill={ true} />
        <div className="w-[400px] flex flex-col gap-4 z-20">
          <UserAuthForm />
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

export default page;
