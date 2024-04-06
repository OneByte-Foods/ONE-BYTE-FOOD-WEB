"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { realDb } from "@/firebase/config";
import { onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import gsap from "gsap";
import AddMenu from "@/components/menu/AddMenu";
import UpdateMenu from "@/components/menu/UpdateMenu";

function Page() {
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
  console.log(menu);
  useEffect(() => {
    // Aniemate the added project
    const addedProject = menu[menu.length - 1];
    if (addedProject) {
      gsap.from(
        `#project-${addedProject.id}`,

        { y: 30, opacity: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, [menu]);
 
  function handleDelete(id:string) {
    remove(ref(realDb, `menu/${id}`));
  }

  return (
    <>
      <div className=" space-y-4 p-6 pt-6">
      <AddMenu />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-7">
          {menu.map((item) => (
            <Card className="col-span-3 w-[350px]" key={item.id}>
              <CardHeader className="">
                <div className="h-[150px] w-full flex items-center justify-center">
                  <img
                    src={item.photo}
                    alt="food item photo"
                    className="object-cover object-center h-[150px]"
                  />
                </div>
                <CardTitle>{item.food_name}</CardTitle>
                <CardDescription className="transition-all duration-200">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <span className="text-gray-700">Price:</span>
                    <span className="ml-2 font-semibold">Rs.{item.price}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-700">Category:</span>
                    <span className="ml-2 font-semibold">{item.category}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                <UpdateMenu {...item} menuId={item.id} />
                <Button variant="destructive" onClick={()=> handleDelete(item.id)}>Delete</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
    </>
  );
}

export default Page;
