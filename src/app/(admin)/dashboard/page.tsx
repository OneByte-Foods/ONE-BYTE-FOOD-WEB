"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { realDb } from "@/firebase/config";
import { onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import gsap from "gsap";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
function Page() {
  const [bookings, setBookings] = useState<any[]>([]);

  const addDummyBooking = () => {
    set(push(ref(realDb, "bookings")), {
      id: 2,
      name: "SMith",
      email: "alex@gmail.com",
    });
  };

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    const fetchData = () => {
      const projectsRef = ref(realDb, "Bookings");
      onValue(projectsRef, (snapshot) => {
        setBookings([]);
        const data = snapshot.val();
        console.log(data);
        if (data !== null) {
          const dataArray: any = Object.keys(data.floorLevel1.users).map(
            (key) => ({
              id: key,
              ...data.floorLevel1.users[key],
            })
          );
          // console.log(dataArray);
          // const usersArray = Object.keys(dataArray.users).map((userId) => ({
          //   id: Math.random().toString(36).substr(2, 9), // generate random ID
          //   ...dataArray.users[userId], // spread user details
          // }));
          setBookings(dataArray);
        }
      });
    };

    fetchData();
  }, []);
  console.log(bookings);

  useEffect(() => {
    // Animate the added project
    // const addedProject = projects[projects.length - 1];
    // if (addedProject) {
    //   gsap.from(
    //     `#project-${addedProject.id}`,
    //     { y: 30, opacity: 0, duration: 1, ease: "power3.out" }
    //   );
    // }
  }, []);

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* <Card className="bg-[purple]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card> */}
            <Card className="bg-[#17BEBE] text-[#e5e5e5] col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-medium">
                  Total Tables Booking
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{bookings.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-[#9117be] text-[#e5e5e5]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Tables
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">19 / 50</div>
              </CardContent>
            </Card>
            <Card className="bg-[#be4617] text-[#e5e5e5]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <LineChart width={600} height={300} data={data}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Tables Booking</CardTitle>
              <CardDescription className="transition-all duration-200 flex flex-col gap-4 divide-y-2">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="opacity-100"
                    id={`project-${booking.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 items-center">
                        <img
                          src={booking.useProfilePic}
                          alt="profile"
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h1 className="text-xl font-bold">
                            {booking.userName}
                          </h1>
                          <div className="text-sm font-semibold">
                            {booking.userEmail}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h1 className="">Table Type: {booking.tableType}</h1>
                        <div className="text-sm font-semibold">
                          Seat No. {booking.seatNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
        <Button onClick={addDummyBooking}>add book</Button>
      </div>
    </>
  );
}

export default Page;
