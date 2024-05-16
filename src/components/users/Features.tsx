import React from "react";
import Dashboard from "../../../public/dashboard.png";
import Image from "next/image";

function Features() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-20 max-w-[400px] mx-auto">
        <p className="text-sm text-orange-500 to-secondary ">What we offer?</p>
        <h1 className="text-3xl font-bold">Features</h1>
        <p className="text-xs text-gray-400">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis
          delectus architecto error nesciunt,
        </p>
      </div>

      <div className="flex flex-col gap-[100px] items-center py-5">
        <div className="flex items-center gap-20">
          <div className="flex flex-col gap-2 w-[550px]">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-xl">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint
              incidunt quia perferendis quae est enim! Lorem ipsum, dolor sit
              amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="h-[200px] w-[300px] border-[2px] border-black relative">
                      <Image src={Dashboard} alt="Dashboard" fill={ true } />
          </div>
        </div>
        <div className="flex items-center gap-20">
          <div className="h-[200px] w-[300px] border-[2px] border-black"></div>
          <div className="flex flex-col gap-2 w-[550px]">
            <h1 className="text-2xl font-bold">Table Bookings</h1>
            <p className="text-xl">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint
              incidunt quia perferendis quae est enim! Lorem ipsum, dolor sit
              amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-20">
          <div className="flex flex-col gap-2 w-[550px]">
            <h1 className="text-2xl font-bold">Mobile App</h1>
            <p className="text-xl">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint
              incidunt quia perferendis quae est enim! Lorem ipsum, dolor sit
              amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="h-[200px] w-[300px] border-[2px] border-black"></div>
        </div>
      </div>
    </div>
  );
}

export default Features;
