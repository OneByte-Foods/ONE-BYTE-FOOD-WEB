"use client";

import { logout } from "@/firebase/config";
import { useEffect, useState } from "react";

function Page() {
    const [user, setUser] = useState <any>([]);
    async function handleLogout() {
        logout();
        localStorage.removeItem("user");
        setUser(null);
      }
    
      useEffect(() => {
        setUser(
          localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user") || "{}")
            : null
        );
      }, []);
  return (
      <section className="grid grid-cols-2 md:px-24 px-6 py-4">
          {
              user ?
              <>
                  <img src={user.photoURL} alt="user photo" className="w-[400px]"/>
                  <div className="flex flex-col gap-4">
                        <h1 >Name: <span className="text-2xl font-bold">{user.displayName}</span></h1>
                        <p>Email: <span className="text-2xl font-bold">{user.email}</span></p>
                  </div>
                <button onClick={handleLogout} className="bg-black text-white h-10 w-20 flex items-center justify-center">Logout</button>
                  </>
                  :
                  <h1>Not logged in</h1>
              
          
            }
    </section>
  )
}

export default Page