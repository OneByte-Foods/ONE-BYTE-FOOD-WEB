"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { db, logedout } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { useSelector } from "react-redux";
import { setUser } from "../../../redux/features/users-slice";
import { RootState } from "redux/reducer";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../../../redux/features/auth-slice";
import { removeUser } from "../../../redux/features/users-slice";

function Navbar() {
  // const [user, setUser] = useState<any>(null);
  const { uid, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const { username, roles, imageUrl } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch();

  async function handleLogout() {
    logedout();
    localStorage.removeItem("uid");
    dispatch(logout());
    dispatch(removeUser())
    
    
  }

  useEffect(() => {
    const fetchUserData = async () => {
      if (uid) {
        try {
          dispatch(loginSuccess({ uid }));
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log("Document data:", userData);
            dispatch(setUser(userData)); // Assuming you have a setUser action in your auth slice
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error getting document:", error);
        }
      }
    };

    fetchUserData();
  }, [uid, dispatch]);
  console.log(roles);

  return (
    <header className="flex h-[10vh] px-[5%] md:px-[10%] items-center justify-between">
      <div className="flex items-center flex-col">
        <h1 className="text-[#F17228] font-bold text-[30px]">
          One Byte <span className="text-[#FFB30E]">Food</span>
        </h1>
        <span className="text-[10px] flex items-center gap-2">
          managaing restaurnat
        </span>
      </div>
      <nav className="flex flex-col gap-1">
        <ul className="flex gap-4 font-bold items-center">
          <li>
            {roles.includes("admin") || roles.includes("super_admin") ? (
              <Link href="/dashboard">Manage Restaurant</Link>
            ) : (
              <Link href="/register">Register Restaurant</Link>
            )}
          </li>
        </ul>
      </nav>
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger className=" h-10 w-10 border rounded-full overflow-hidden">
            <img src={imageUrl} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/restaurants">Restaurants</Link>
            </DropdownMenuItem>
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
