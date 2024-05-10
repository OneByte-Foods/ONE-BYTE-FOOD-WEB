"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout } from "@/firebase/config";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";

function Navbar() {
  const [user, setUser] = useState<any>(null);

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
    <header className="flex h-[10vh] px-[5%] md:px-[10%] items-center justify-between">
      <div className="flex items-center flex-col">
        <h1 className="text-[#F17228] font-bold text-[30px]">
          One Byte <span className="text-[#FFB30E]">Food</span>
        </h1>
        <span className="text-[10px] flex items-center gap-2">
          <MdLocationPin />
          Naxal, 01, Kathmandu
        </span>
      </div>
      <nav className="flex flex-col gap-1">
        <ul className="flex gap-4 font-bold items-center">
          <li>
            <Link href="/menu">Menu</Link>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/users">Users</a>
          </li>
        </ul>
      </nav>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className=" h-10 w-10 border rounded-full overflow-hidden">
            {user && <img src={user.photoURL} />}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href="/signup"
          className="flex gap-[10px] items-center text-[#ffb800] shadow-[2px_2px_5px_rgba(255,_185,_0,_0.7)] px-6 py-[14px] rounded-xl border"
        >
          <FaUser className="" />
          Signup
        </Link>
      )}
    </header>
  );
}

export default Navbar;
