import Image from "next/image";
import SingupBg from "../../../public/signup.jpg";
import Link from "next/link";
import Logo from "../../../public/mobile_table.png";

import { UserAuthForm } from "@/components/user-auth-form";

function page() {
  return (
    <div className="flex min-h-screen w-full gap-5 items-center justify-center bg-[#f7f6f6]">
      {/* <Image src={SingupBg} alt="food on background" fill={ true} /> */}

      <div className="w-[500px] flex flex-col gap-4 z-20 items-center">
        <h1 className="text-[#F17228] font-bold text-[50px]">
          One Byte <span className="text-[#FFB30E]">Food</span>
        </h1>
        <UserAuthForm />
      </div>
    
        {/* <Image src={Logo} alt="One Bytes Food" height={700} width={500} /> */}
    </div>
  );
}

export default page;
