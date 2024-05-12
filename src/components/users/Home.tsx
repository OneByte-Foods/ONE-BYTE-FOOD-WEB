import React from "react";
import Image from "next/image";
import HomeDish from "../../../public/home-dish.png";

function Home() {
  return (
    <section className="h-[90vh] bg-[#FFCA0D] flex items-center px-[5%] md:px-[10%]">
      <div className="flex flex-col gap-5">
        <h1 className=" font-mono text-[200%]">🙏🏼 Welcome</h1>
        <h1 className="text-[#fff] text-[400%] font-bold">Are You Starving?</h1>
        <p>Book our table and join the party!</p>
        <div className="bg-[#ffffff] w-full h-[20vh] rounded-xl grid grid-cols-3 divide-x-2 overflow-hidden">
          <h1 className="flex items-center cursor-pointer justify-center transition-all duration-500 origin-bottom-right hover:bg-red-500 hover:text-[#fff]">
            Book a Table
          </h1>
          <h1 className="flex items-center justify-center cursor-pointer  transition-all duration-500 origin-bottom-right hover:bg-blue-500 hover:text-[#fff]">
            Preorder Food
          </h1>
          <h1 className="flex items-center justify-center cursor-pointer transition-all duration-500 origin-bottom-right hover:bg-green-500 hover:text-[#fff]">
            Enjoy
          </h1>
        </div>
      </div>
      <div className="h-full">
        <Image src={HomeDish} alt="home-dish" objectFit="cover" />
      </div>
    </section>
  );
}

export default Home;
