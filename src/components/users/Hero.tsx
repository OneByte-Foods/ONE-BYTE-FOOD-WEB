"use client";
import Image from "next/image";
import Banner from "../../../public/HomeBanner.png";
import Plate from "../../../public/home-dish.png";
import HomeBurger from "./HomeBurger";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function Hero() {
  const imgRef = useRef(null);
  const imgRef1 = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(imgRef.current, {
      duration: 60,
      rotation: 360,
      ease: "linear",
    });

    const tl1 = gsap.timeline({ repeat: -1 });
    tl1.to(imgRef1.current, {
      duration: 60,
      rotation: -360, // Rotate in the opposite direction
      ease: "linear",
    });
  }, []);

  return (
    <div className="min-h-[90vh] bg-transparent flex justify-center items-center duration-200 relative overflow-hidden ">
      <div className="absolute z-30 min-h-[80vh] w-[50%] left-[50%] ">
        <HomeBurger />
        <Image
          ref={imgRef}
          src={Plate}
          height={270}
          width={270}
          alt="plate"
          className=" absolute top-0 -z-10"
        />
        <Image
          ref={imgRef1}
          src={Plate}
          height={270}
          width={270}
          alt="plate"
          className=" absolute bottom-0 -z-10"
        />
      </div>

      <Image src={Banner} alt="banner" fill={true} className="-z-40" />
      <div className="container pb-8 sm:pb-0 z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* text content section */}
          <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
              Welcome <span className="">To</span> <br />
              <p className="text-[#F17228] text-5xl sm:text-6xl lg:text-7xl font-bold">
                One Byte <span className="text-[#FFB30E]">Food</span>
              </p>
            </h1>
            <p className="text-sm ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
              reiciendis inventore iste ratione ex alias quis magni at optio
            </p>
            <div>
              <button className="bg-[#f17228] px-6 py-2 rounded-lg  text-[#fff]">
                Explore
              </button>
            </div>
          </div>

          {/* <HomeBurger /> */}
        </div>
      </div>
    </div>
  );
}

export default Hero;
