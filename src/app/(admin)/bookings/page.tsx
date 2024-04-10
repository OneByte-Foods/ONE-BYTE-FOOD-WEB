"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";
import gsap from "gsap";
import { onValue, push, ref, set } from "firebase/database";
import { realDb } from "@/firebase/config";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import * as THREE from "three";
interface user {
  seatNumber: number;
  userEmail: string;
  useProfilePic: string;
  status: string;
  tableType: string;
  userName: string;
}
interface TimelineItem {
  id: string | number;
  users: user;
}

function Page() {
  const [bookings, setBookings] = useState<TimelineItem[]>([]);
  const timelineRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchData = () => {
      const projectsRef = ref(realDb, "Bookings");
      onValue(projectsRef, (snapshot) => {
        // setBookings([]);
        const data = snapshot.val();
        if (data !== null) {
          const dataArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
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
      <div className="h-screen py-5 w-[60%] border no-scrollbar px-10 overflow-y-auto">
        <Timeline id="timeline" className=" h-fit border-l-2">
          {bookings.map((item) => (
            <Timeline.Item key={item.id}>
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time className="flex gap-3 items-center">
                  <img
                    src={item.users.useProfilePic}
                    alt="profile user"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col gap-2">
                    <span>{item.users.userName}</span>
                    <span>{item.users.userEmail}</span>
                  </div>
                </Timeline.Time>
                {/* <Timeline.Title>{item.email}</Timeline.Title> */}
                <Timeline.Body>
                  TableType: {item.users.tableType} <br />
                  SeatNumber: {item.users.seatNumber} <br />
                </Timeline.Body>
                status: {item.users.status}
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </div>
  );
}

export default Page;
