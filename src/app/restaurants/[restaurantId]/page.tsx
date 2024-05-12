"use client";

import Navbar from "@/components/users/Navbar";
import RestaurantMenu from "@/components/users/RestaurantMenu";
import React from "react";

// function page({ params }: { params: { restaurantId: string } }) {
//   return <></>;
// }

// export default page;

import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, doc, getDoc } from "firebase/firestore";

function Page({ params }: { params: { restaurantId: string } }) {
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const restaurantRef = doc(
          db,
          "restaurants",
          decodeURIComponent(params.restaurantId)
        );
        const restaurantDoc = await getDoc(restaurantRef);

        if (restaurantDoc.exists()) {
          setRestaurant({ id: restaurantDoc.id, ...restaurantDoc.data() });
        } else {
          setError("Restaurant not found");
        }
      } catch (error) {
        console.error("Error fetching restaurant: ", error);
        setError(error);
      }
      setLoading(false);
    };

    fetchRestaurant();
  }, [params.restaurantId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="px-[100px] py-5">
        <h1 className="text-3xl font-bold mb-4">{restaurant.restaurantName}</h1>
        <p className="text-sm">{restaurant.restaurantDescription}</p>
        <p className="text-[10x] text-[#ea673b]">
          {restaurant.restaurantLocation}
        </p>
        <img
          src={restaurant.restaurantImage}
          alt={restaurant.restaurantName}
          className="w-full h-64 object-fit"
        />
        {/* Render menu items here */}
      </div>
      <RestaurantMenu id={decodeURIComponent(params.restaurantId)} />
    </>
  );
}

export default Page;
