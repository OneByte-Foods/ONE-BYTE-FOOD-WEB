"use client";
import AddTable from "@/components/AddTable";
import { MdOutlineTableBar } from "react-icons/md";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, realDb } from "@/firebase/config";
import UpdateTable from "@/components/UpdateTable";
import DeleteTable from "@/components/DeleteTable";
import { onValue, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";
import AddRow from "@/components/AddRow";
import RemoveRow from "@/components/RemoveRow";
function Page() {
  const [tableData, setTableData] = useState<any[]>([]);
  const [table, setTable] = useState<any[]>([]);
  const { restaurantId } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    const q = query(collection(db, "table"), orderBy("created", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setTableData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  console.log(restaurantId);

  useEffect(() => {
    const fetchData = () => {
      const projectsRef = ref(realDb, "chairs/" + restaurantId);
      onValue(projectsRef, (snapshot) => {
        setTable([]);
        const data = snapshot.val();
        if (data !== null) {
          const dataArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setTable(dataArray);
        }
      });
    };

    fetchData();
  }, []);

  console.log(tableData);

  return (
    <>
      <section className="px-6 py-4 flex flex-col gap-4">
        <div className="flex justify-center gap-10">
          <AddRow restaurantId={restaurantId} />
          <RemoveRow restaurantId={restaurantId} />
        </div>
        <div className="grid grid-cols-5 gap-[100px]">
          {table.map((tab, ind) => (
            <SeatRow
              key={tab.id}
              id={tab.id}
              seats={tab.seats}
              freeSeats={tab.freeSeats}
              restaurantId={restaurantId}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Page;

const SeatRow = ({
  id,
  seats,
  freeSeats,
  restaurantId,
}: {
  id: string;
  seats: number;
  freeSeats: number[];
  restaurantId: string;
}) => {
  const handleSeatClick = (seatNumber: number) => {
    // Decrease the total number of seats by 1
    const updatedSeats = seats - 1;
    // Update the seats value in the state
    // Update the seats value in the Firebase Realtime Database
    const tableRef = ref(realDb, `chairs/${restaurantId}/${id}`);
    set(tableRef, { seats: updatedSeats, freeSeats });
  };

  const renderSeats = () => {
    const seatArray = Array.from({ length: seats }, (_, index) => index + 1); // Create an array of seat numbers
    return seatArray.map((seatNumber) => {
      const isSeatFree = freeSeats.includes(seatNumber);
      const seatColor = isSeatFree ? "green" : "red";
      return (
        <div
          key={seatNumber}
          onClick={() => handleSeatClick(seatNumber)}
          className="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer"
          style={{ backgroundColor: seatColor }}
        >
          {seatNumber}
        </div>
      );
    });
  };

  const handleAddSeatAdd = () => {
    // Increment the total number of seats
    const updatedSeats = seats + 1;

    // Add the new seat to the freeSeats array
    const updatedFreeSeats = [...freeSeats, updatedSeats];

    // Update the seats value in the state
    // Update the seats value in the Firebase Realtime Database
    const tableRef = ref(realDb, `chairs/${restaurantId}/${id}`);
    set(tableRef, { seats: updatedSeats, freeSeats: updatedFreeSeats });
  };

  return (
    <div className="border border-black flex flex-col items-center gap-4 px-6 py-3">
      <h2 className="text-2xl font-bold">{id}</h2>
      <div className="grid grid-cols-3 gap-4">{renderSeats()}</div>
      <button
        onClick={handleAddSeatAdd}
        className="bg-[#34cf31] text-white px-5 py-2"
      >
        Add Seat
      </button>
    </div>
  );
};
