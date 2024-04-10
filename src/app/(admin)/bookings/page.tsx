"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";
import gsap from "gsap";
import { onValue, push, ref, set } from "firebase/database";
import { realDb } from "@/firebase/config";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei"

import * as THREE from "three";
import Bird from "../../../components/Bird";
interface TimelineItem {
  id: string | number;
  img: string;
  email: string;
  time: string;
  table: number;
  tableName: string;
}

function Page() {
  const [bookings, setBookings] = useState<TimelineItem[]>([
    {
      id: 1,
      img: "https://lh3.googleusercontent.com/a/ACg8ocLr0k4w3YxeRneAjbx3ygTqvGzajHQA-a0ehuw9lU2AuL5I=s96-c",
      email: "bikalpa@gmail.com",
      time: "12:00 PM",
      table: 1,
      tableName: "Table 1",
    },
  ]);
  const timelineRef = useRef<HTMLUListElement>(null);
  // useThree(({ camera }) => {
  //   camera.rotation.set(THREE.MathUtils.degToRad(30), 0, 0);
  // });


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
          console.log(dataArray);
          setBookings(dataArray);
        }
      });
    };

    fetchData();
  }, []);

  console.log(bookings);
  useEffect(() => {
    const scrollableDiv: any = document.getElementById("timeline");

    const bottomElement = scrollableDiv.lastElementChild;
    bottomElement.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [bookings]);

  const addItem = () => {
    set(push(ref(realDb, "Bookings")), {
      id: 2,
      img: "https://lh3.googleusercontent.com/a/ACg8ocLr0k4w3YxeRneAjbx3ygTqvGzajHQA-a0ehuw9lU2AuL5I=s96-c",
      email: "bikalpa@gmail.com",
      time: "1:00 PM",
      table: 1,
      tableName: "Table 1",
    });
  };

  return (
    <div className="flex w-screen h-screen items-center">
    
      <Canvas className="">
        <Thing />
      </Canvas>

      <div className="h-screen w-[60%] border no-scrollbar px-10 overflow-y-auto">
        <Timeline id="timeline" className=" h-fit border-l-2">
          {bookings.map((item) => (
            <Timeline.Item key={item.id}>
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time>{Object.keys(item)}</Timeline.Time>
                <Timeline.Title>{item.email}</Timeline.Title>
                <Timeline.Body>{item.table}</Timeline.Body>
                <Button color="gray">
                  Learn More
                  <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </div>
  );
}

export default Page;

function Thing() {
  const ref = useRef<any>(null);
  const config = { fov: 35, position: [0, 0, 10] }
  // useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.02));
  return (
    <>
     <ambientLight />
      <OrbitControls minDistance={800} maxDistance={800}/>
      <Bird />
    {/* <mesh
      ref={ref}
      onClick={(e) => console.log("click")}
      onPointerOver={(e) => console.log("hover")}
      onPointerOut={(e) => console.log("unhover")}
      >
      <primitive object={new THREE.BoxGeometry(1, 1, 1)} />
     
      <meshNormalMaterial attach="material" />
    </mesh> */}
    
      </>
  );
}
