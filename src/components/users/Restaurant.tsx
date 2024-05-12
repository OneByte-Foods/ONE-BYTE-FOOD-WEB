"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import Navbar from "./Navbar";
import Link from "next/link";

function Restaurant() {
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

  return (

      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mt-8 mb-4">Restaurants</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Link href={`/restaurants/${restaurant.restaurantName}`}
              key={restaurant.restaurantName}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
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
              </div>
            </Link>
          ))}
        </ul>
      </div>
    
  );
}

export default Restaurant;
