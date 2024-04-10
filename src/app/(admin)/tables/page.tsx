"use client";
import AddTable from "@/components/AddTable";
import { MdOutlineTableBar } from "react-icons/md";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, realDb } from "@/firebase/config";
import UpdateTable from "@/components/UpdateTable";
import DeleteTable from "@/components/DeleteTable";
import { onValue, ref, set } from "firebase/database";
function Page() {
  const [tableData, setTableData] = useState<any[]>([]);
  const [table, setTable] = useState<any[]>([]);

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

  useEffect(() => {
    const fetchData = () => {
      const projectsRef = ref(realDb, "chairs");
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
        <div className="grid grid-cols-5 gap-[100px]">
          {table.map((tab, ind) => (
            <SeatRow
              key={tab.id}
              id={tab.id}
              seats={tab.seats}
              freeSeats={tab.freeSeats}
            />
          ))}
        </div>
        <AddTable />
      </section>
    </>
  );
}

export default Page;

const SeatRow = ({
  id,
  seats,
  freeSeats,
}: {
  id: string;
  seats: number;
  freeSeats: number[];
}) => {
  const handleSeatClick = (seatNumber: number) => {
    // Decrease the total number of seats by 1
    const updatedSeats = seats - 1;
    // Update the seats value in the state
    // Update the seats value in the Firebase Realtime Database
    const tableRef = ref(realDb, `chairs/${id}`);
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
    const updatedSeats = seats + 1;
    const tableRef = ref(realDb, `chairs/${id}`);
    set(tableRef, { seats: updatedSeats, freeSeats });
  };

  return (
    <div>
      <h2>Row {id}</h2>
      <div className="grid grid-cols-2 gap-10">{renderSeats()}</div>
      <button onClick={handleAddSeatAdd}>Add Seat</button>
    </div>
  );
};
