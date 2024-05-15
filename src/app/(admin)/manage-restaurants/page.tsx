"use client";
import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

import Link from "next/link";
import { Button } from "flowbite-react";

function Page() {
  const [restaurants, setRestaurants] = useState<any[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "restaurants"));
        const restaurants = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRestaurants(restaurants);
      } catch (error) {
        console.error("Error fetching restaurants: ", error);
        return [];
      }
    };

    fetchRestaurants();
  }, []);

  const verifyRestro = async (restaurantName: string) => {
    try {
      const restaurantRef = doc(db, "restaurants", restaurantName);
      await updateDoc(restaurantRef, {
        isVerified: true,
      });
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((restaurant) =>
          restaurant.restaurantName === restaurantName
            ? { ...restaurant, isVerified: true }
            : restaurant
        )
      );
    } catch (error) {
      console.error("Error verifying restaurant: ", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mt-8 mb-4">Restaurants</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.restaurantName}
            className={`bg-white shadow-md rounded-lg overflow-hidden ${
              !restaurant.isVerified && "opacity-50 relative"
            }`}
          >
            {!restaurant.isVerified && (
              <span className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">
                Comming Soon
              </span>
            )}
            <img
              src={restaurant.restaurantImage}
              alt={restaurant.restaurantName}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">
                {restaurant.restaurantName}
              </h2>
              <p className="text-gray-600 mb-2">
                {restaurant.restaurantDescription}
              </p>
              <p className="text-gray-600">{restaurant.restaurantLocation}</p>
              {restaurant.isVerified ? (
                <Link href={`/restaurants/${restaurant.restaurantName}`}>
                  <Button className="bg-black text-white">View</Button>
                </Link>
              ) : (
                <Button
                  className="bg-black text-white"
                  onClick={() => verifyRestro(restaurant.restaurantName)}
                >
                  Verify
                </Button>
              )}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Page;
