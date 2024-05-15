"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Timeline } from "flowbite-react";
import { HiCalendar } from "react-icons/hi";
import { onValue, push, ref, set } from "firebase/database";
import { realDb } from "@/firebase/config";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";
interface user {
  id: string;
  seatNumber: number;
  userEmail: string;
  userProfilePic: string;
  status: string;
  tableType: string;
  userName: string;
}
interface TimelineItem {
  users: user[];
}

function Page() {
  const [bookings, setBookings] = useState<user[]>([]);
  const { restaurantId } = useSelector((state: RootState) => state.users);
  const [activeBooking, setActiveBooking] = useState<user | null>(null);
  const timelineRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchData = () => {
      const projectsRef = ref(realDb, `Bookings/${restaurantId}`);
      onValue(projectsRef, (snapshot) => {
        // setBookings([]);
        const data = snapshot.val();

        if (data !== null) {
          const dataArray: any = Object.keys(data.floorLevel1.users).map(
            (key) => ({
              id: key,
              ...data.floorLevel1.users[key],
            })
          );
          // console.log(dataArray);
          setBookings(dataArray);
        }
      });
    };

    fetchData();
  }, []);
  console.log(restaurantId);
  console.log(bookings);

  useEffect(() => {
    if (bookings.length === 0) return;
    const scrollableDiv: any = document.getElementById("timeline");
    const bottomElement = scrollableDiv.lastElementChild;
    bottomElement.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [bookings]);

  const handleActiveBooking = (id: string) => {
    setActiveBooking(bookings.find((booking) => booking.id === id) || null);
  };

  return (
    <div className="flex w-screen h-screen items-center">
      {/* <HomeBurger /> */}
      <div className="h-screen py-5 border no-scrollbar w-[30%] px-10 overflow-y-auto">
        <Timeline id="timeline" className={` h-fit border-l- `}>
          {bookings.map((item) => (
            <Timeline.Item
              key={item.id}
              onClick={() => handleActiveBooking(item.id)}
              className={`cursor-pointer ${
                activeBooking?.id === item.id ? "border-b border-[#17BEBB]" : ""
              }`}
            >
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time className="flex gap-3 items-center">
                  <img
                    src={item.userProfilePic}
                    alt="profile user"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col gap-2 text-sm">
                    <span>{item.userName}</span>
                    <span>{item.userEmail}</span>
                  </div>
                </Timeline.Time>
                {/* <Timeline.Title>{item.email}</Timeline.Title> */}
                <Timeline.Body>status: {item.status}</Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>

      {activeBooking ? (
        <div className="h-screen w-[70%] bg-[#17BEBB] p-10 flex flex-col items-center justify-center gap-[100px]">
          <h1 className="text-2xl font-bold text-white">Booking Details</h1>
          <div className="flex gap-5 items-center">
            <img
              src={activeBooking.userProfilePic}
              alt="profile user"
              className="w-[400px] h-[400px] rounded-full"
            />
            <div className="flex flex-col gap-5 text-white">
              <span className="text-2xl font-bold">
                {activeBooking.userName}
              </span>
              <span>{activeBooking.userEmail}</span>
              <span>{activeBooking.tableType}</span>
              <span>{activeBooking.seatNumber}</span>
              <span>{activeBooking.status}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-full bg-[#17BEBB] text-[#fff] p-10 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Booking Details</h1>
          <p className="text-[#cbcbcb]">Select a booking to view details</p>
        </div>
      )}
    </div>
  );
}

export default Page;
