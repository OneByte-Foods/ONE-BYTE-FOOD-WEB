"use client";

import { realDb } from "@/firebase/config";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

function Menu() {
  const [menu, setMenu] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = () => {
      const projectsRef = ref(realDb, "menu");
      onValue(projectsRef, (snapshot) => {
        setMenu([]);
        const data = snapshot.val();
        if (data !== null) {
          // const projectsData = Object.values(data);
          const dataArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setMenu(dataArray);
        }
      });
    };

    fetchData();
  }, []);
  return (
    <>
      <span id="services"></span>
      <div className="py-10">
        <div className="container">
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <p className="text-sm text-orange-500 to-secondary ">
              Our Services
            </p>
            <h1 className="text-3xl font-bold">Services</h1>
            <p className="text-xs text-gray-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perspiciatis delectus architecto error nesciunt,
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-5 place-items-center">
            {menu.map((service) => (
              <div className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-yellow-500 hover:text-white relative shadow-xl duration-high group min-w-[400px]">
                <div className="h-[100px]">
                  <img
                    src={service.photo}
                    alt=""
                    className="max-h-[150px] block mx-auto transform -translate-y-14
                  group-hover:scale-105 group-hover:rotate-6 duration-300 rounded-2xl"
                  />
                </div>
                <div className="p-4 text-center">
                  <h1 className="text-xl font-bold">{service.food_name}</h1>
                  <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                    {service.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
