import React, { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";

function RestaurantMenu({ id }: { id: string }) {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Fetch menu items for the current restaurant
        const menuSnapshot = await getDocs(
          collection(db, "restaurants", id, "menu")
        );
        const menuItems = menuSnapshot.docs.map((menuDoc) => ({
          id: menuDoc.id,
          ...menuDoc.data(),
        }));
        setMenuItems(menuItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurants: ", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="md:px-[100px] px-5">
      <h1 className="text-3xl font-bold mb-4">Menu</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((menuItem) => (
          <li
            key={menuItem.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={menuItem.foodPhoto}
              alt={menuItem.foodName}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{menuItem.foodName}</h2>
              <p className="text-gray-600">Price: ${menuItem.foodPrice}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantMenu;
