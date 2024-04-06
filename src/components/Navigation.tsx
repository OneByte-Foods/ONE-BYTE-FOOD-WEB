"use client";
import Link from "next/link";
import { MdOutlineTableBar } from "react-icons/md";
import { IoRestaurantOutline } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { GoGear } from "react-icons/go";
import { usePathname } from "next/navigation";

function Navigation() {
  const path = usePathname();
  return (
    <nav className="w-[250px] min-screen borderp py-3 px-6 flex flex-col gap-10 border">
      <div className="">
        <h1 className="text-xl">One Byte Food</h1>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-bold ml-5">Activity</h1>
        <div className="flex flex-col gap-6">
          <Link
            href="/dashboard"
            className={`flex items-end gap-2 px-5 py-3 rounded-2xl ${
              path == "/dashboard" ? "bg-[#c1bcbc74]" : ""
            }`}
          >
            <VscGraph size={25} />
            <span className="text-sm">Dashboard</span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-bold ml-5">Manage</h1>
        <div className="flex flex-col gap-6">
          <Link
            href="/tables"
            className={`flex items-end gap-2 px-5 py-3 rounded-2xl ${
              path == "/tables" ? "bg-[#c1bcbc74]" : ""
            }`}
          >
            <MdOutlineTableBar size={25} />
            <span className="text-sm">Tables</span>
          </Link>
          <Link
            href="/bookings"
            className={`flex items-end gap-2 px-5 py-3 rounded-2xl ${
              path == "/bookings" ? "bg-[#c1bcbc74]" : ""
            }`}
          >
            <MdOutlineBookmarkAdded size={25} />
            <span className="text-sm">Bookings</span>
          </Link>
          <Link
            href="/menu"
            className={`flex items-end gap-2 px-5 py-3 rounded-2xl ${
              path == "/menu" ? "bg-[#c1bcbc74]" : ""
            }`}
          >
            <IoRestaurantOutline size={25} />
            <span className="text-sm">Menu</span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-bold ml-5">Profile</h1>
        <div className="flex flex-col gap-6">
          <Link
            href="/settings"
            className={`flex items-end gap-2 px-5 py-3 rounded-2xl ${
              path == "/settings" ? "bg-[#c1bcbc74]" : ""
            }`}
          >
            <GoGear size={25} />
            <span className="text-sm">Settings</span>
          </Link>
          {/* <p>{user.providerData[0].email}</p> */}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
