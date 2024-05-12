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
import { db, realDb } from "@/firebase/config";
import { onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import gsap from "gsap";
import AddMenu from "@/components/menu/AddMenu";
import UpdateMenu from "@/components/menu/UpdateMenu";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

function Page() {
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Fetch menu items for the current restaurant
        const menuSnapshot = await getDocs(
          collection(db, "restaurants", "jimbu thakali 01", "menu")
        );
        const menuItems = menuSnapshot.docs.map((menuDoc) => ({
          id: menuDoc.id,
          ...menuDoc.data(),
        }));
        setMenuItems(menuItems);
      } catch (error) {
        console.error("Error fetching restaurants: ", error);
      }
    };
    fetchRestaurants();
  }, []);
  console.log(menuItems);

  async function handleDelete(id: string) {
    try {
      const menuRef = doc(db, "restaurants", "jimbu thakali 01", "menu", id);
      await deleteDoc(menuRef);
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
      // Handle error
    }
  }

  return (
    <>
      <div className=" space-y-4 p-6 pt-6">
        <AddMenu id="jimbu thakali 01" setMenuItems={setMenuItems} />
        <div className="md:px-[100px] px-5">
          <h1 className="text-3xl font-bold mb-4">Menu</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((menuItem) => (
              <div key={menuItem.id} className="flex flex-col gap-4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                  <img
                    src={menuItem.foodPhoto}
                    alt={menuItem.foodName}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">
                      {menuItem.foodName}
                    </h2>
                    <p className="text-gray-600">
                      Price: ${menuItem.foodPrice}
                    </p>
                  </div>
                </div>
                <UpdateMenu
                  foodName={menuItem.foodName}
                  category={menuItem.foodCategory}
                  photo={menuItem.foodPhoto}
                  price={menuItem.foodPrice}
                  id={"jimbu thakali 01"}
                  menuId={menuItem.id}
                  setMenuItems={setMenuItems}
                />
                <Button onClick={() => handleDelete(menuItem.id)}>
                  Delete
                </Button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Page;
