"use client";
import Link from "next/link";
import { MdOutlineTableBar } from "react-icons/md";
import { IoRestaurantOutline } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";

function Navigation() {
  const path = usePathname();
  const { roles } = useSelector((state: RootState) => state.users);
  const { uid } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="w-[250px] min-screen borderp py-3 px-6 flex flex-col gap-10 bg-[#f2f2f2]">
      <div className="">
        <h1 className="text-xl font-bold ml-5 text-[#17BEBB]">
          One Byte <span className="">Food</span>
        </h1>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-bold ml-5 text-[#17BEBB]">Activity</h1>
        <div className="flex flex-col gap-6">
          <Link
            href="/dashboard"
            className={`flex items-end gap-2 px-5 py-3 rounded-2xl ${
              path == "/dashboard" ? "bg-[#17BEBB] text-white" : ""
            }`}
          >
            <VscGraph size={25} />
            <span className="text-sm">Dashboard</span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-bold ml-5 text-[#17BEBB]">Manage</h1>
        <div className="flex flex-col gap-6">
          {roles.includes("super_admin") && (
            <Link
              href="/manage-restaurants"
              className={`flex items-end gap-2 px-5 py-3 rounded-2xl ${
                path == "/manage-restaurants" ? "bg-[#17BEBB] text-white" : ""
              }`}
            >
              <MdOutlineTableBar size={25} />
              <span className="text-sm">Restaurant</span>
            </Link>
          )}
          {roles.includes("admin") && (
            <>
              <Link
                href="/tables"
                className={`flex items-end gap-2 px-5 py-3 rounded-2xl ${
                  path == "/tables" ? "bg-[#17BEBB] text-white" : ""
                }`}
              >
                <MdOutlineTableBar size={25} />
                <span className="text-sm">Tables</span>
              </Link>
              <Link
                href="/bookings"
                className={`flex items-end gap-2 px-5 py-3 rounded-2xl ${
                  path == "/bookings" ? "bg-[#17BEBB] text-white" : ""
                }`}
              >
                <MdOutlineBookmarkAdded size={25} />
                <span className="text-sm">Bookings</span>
              </Link>
              <Link
                href="/menu"
                className={`flex items-end gap-2 px-5 py-3 rounded-2xl ${
                  path == "/menu" ? "bg-[#17BEBB] text-white" : ""
                }`}
              >
                <IoRestaurantOutline size={25} />
                <span className="text-sm">Menu</span>
              </Link>
            </>
          )}
          {/* {roles.includes("admin") && (
            <Link
              href="/users"
              className={`flex items-end gap-2 px-5 py-3 rounded-2xl ${
                path == "/users" ? "bg-[#17BEBB] text-white" : ""
              }`}
            >
              <FaRegUser size={25} />
              <span className="text-sm">Users</span>
            </Link>
          )} */}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-bold ml-5 text-[#17BEBB]">Profile</h1>
        <div className="flex flex-col gap-6">
          <Link
            href="/settings"
            className={`flex items-end gap-2 px-5 py-3 rounded-2xl ${
              path == "/settings" ? "bg-[#17BEBB] text-white" : ""
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
