"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { realDb } from "@/firebase/config";
import { Piedata, Pieoptions, data, dataBar, dataCombo, options, optionsBar, optionsCombo } from "@/utils/utils";
import { onValue, push, ref, set } from "firebase/database";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";


function Page() {
  const [bookings, setBookings] = useState<any[]>([]);
  const { restaurantId } = useSelector((state: RootState) => state.users);

  const addDummyBooking = () => {
    set(push(ref(realDb, "bookings")), {
      id: 2,
      name: "SMith",
      email: "alex@gmail.com",
    });
  };

  useEffect(() => {
    const fetchData = () => {
      const projectsRef = ref(realDb, "Bookings/" + restaurantId);
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
          <Card className="col-span-4 h-[70vh]">
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="pl-2 grid grid-cols-2 items-center gap-6">
              <Link
                href="/tables"
                className="bg-[#17BEBE] rounded-md text-[#e5e5e5] flex items-center justify-center h[200px]"
              >
                Tables
              </Link>
              <Link
                href="/bookings"
                className="bg-[#9117be] rounded-md text-[#e5e5e5] flex items-center justify-center h[200px]"
              >
                Bookings
              </Link>
              <Link
                href="/menu"
                className="bg-[#17be30] rounded-md text-[#e5e5e5] flex items-center justify-center h[200px]"
              >
                Menu
              </Link>
              <Link
                href="/settings"
                className="bg-[#be4617] rounded-md text-[#e5e5e5] flex items-center justify-center h[200px]"
              >
                Settings
              </Link>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Tables Booking</CardTitle>
              <CardDescription className="transition-all duration-200 flex flex-col gap-4 divide-y-2">
                {bookings
                  .filter((_, index) => index > bookings.length - 7)
                  .map((booking) => (
                    <div
                      key={booking.id}
                      className="opacity-100"
                      id={`project-${booking.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 items-center">
                          <img
                            src={booking.userProfilePic}
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

        <div className="flex flex-col items-start p-4 bg-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-10 mt-7">
            Restaurant Votes and Cost Analysis
          </h2>
          <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6 relative overflow-hidden">
            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="flex flex-col items-center ">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Votes vs Cost
                </h3>
                <Chart
                  chartType="ColumnChart"
                  data={data}
                  options={options}
                  width="100%"
                  height="400px"
                  legendToggle
                />
              </div>
              
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Daily Activities
                </h3>
                <Chart
                  chartType="PieChart"
                  data={Piedata}
                  options={Pieoptions}
                  width="100%"
                  height="400px"
                  legendToggle
                />
              </div>
              <div className="flex flex-col items-center ">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Votes vs Cost
                </h3>
                <Chart
                  chartType="ComboChart"
                  data={dataCombo}
                  options={optionsCombo}
                  width="100%"
                  height="400px"
                  legendToggle
                />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Daily Activities
                </h3>
                <Chart
                  chartType="BarChart"
                  data={dataBar}
                  options={optionsBar}
                  width="100%"
                  height="400px"
                  legendToggle
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
