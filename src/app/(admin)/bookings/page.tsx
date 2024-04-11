"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";
import gsap from "gsap";
import { onValue, push, ref, set } from "firebase/database";
import { realDb } from "@/firebase/config";
import HomeBurger from "@/components/users/HomeBurger";
interface user {
  id: string;
  seatNumber: number;
  userEmail: string;
  useProfilePic: string;
  status: string;
  tableType: string;
  userName: string;
}
interface TimelineItem {
  users: user[];
}

function Page() {
  const [bookings, setBookings] = useState<user[]>([]);
  const timelineRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchData = () => {
      const projectsRef = ref(realDb, "Bookings");
      onValue(projectsRef, (snapshot) => {
        // setBookings([]);
        const data = snapshot.val();
       
          if (data !== null) {
            const dataArray:any = Object.keys(data.floorLevel1.users).map((key) => ({
              id: key,
              ...data.floorLevel1.users[key],
            }));
          // console.log(dataArray);
          setBookings(dataArray);
        }
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if(bookings.length === 0) return;
    const scrollableDiv: any = document.getElementById("timeline");
    const bottomElement = scrollableDiv.lastElementChild;
    bottomElement.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [bookings]);

  return (
    <div className="flex w-screen h-screen items-center">
      <HomeBurger />
      <div className="h-screen py-5 w-[60%] border no-scrollbar px-10 overflow-y-auto">
        <Timeline id="timeline" className=" h-fit border-l-2">
          {bookings.map((item) => (
            <Timeline.Item key={item.id}>
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time className="flex gap-3 items-center">
                  <img
                    src={item.useProfilePic}
                    alt="profile user"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col gap-2">
                    <span>{item.userName}</span>
                    <span>{item.userEmail}</span>
                  </div>
                </Timeline.Time>
                {/* <Timeline.Title>{item.email}</Timeline.Title> */}
                <Timeline.Body>
                  TableType: {item.tableType} <br />
                  SeatNumber: {item.seatNumber} <br />
                </Timeline.Body>
                status: {item.status}
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </div>
  );
}

export default Page;
