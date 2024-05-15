"use client";
import Navbar from "@/components/users/Navbar";
import { logedout } from "@/firebase/config";
import { Diphylleia } from "next/font/google";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/features/auth-slice";
import { RootState } from "redux/reducer";

const Page = () => {
  const { username, email, imageUrl, restaurantId } = useSelector(
    (state: RootState) => state.users
  );

  const dispatch = useDispatch();
  async function handleLogout() {
    logedout();
    localStorage.removeItem("uid");
    dispatch(logout());
    window.location.href = "/";
  }

  return (
    <>
      <Navbar />
      <section className="flex items-center justify-center gap-10 min-h-[70vh]">
        <div className="flex flex-col border border-black px-6 py-4 items-center gap-8">
          <img
            src={imageUrl}
            alt="user photo"
            className="w-[100px] rounded-full"
          />
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-2xl ">{username}</h1>
            <p>{email}</p>
            {restaurantId ? (
              <Link href="/dashboard" className="bg-black py-3 px-5 text-white">
                Manage Restaurant
              </Link>
            ) : (
              <Link href="/register" className="bg-black py-3 px-5 text-white">
                Register Restaurant
              </Link>
            )}
          </div>
          <div
            onClick={handleLogout}
            className="cursor-pointer hover:underline"
          >
            logout
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
