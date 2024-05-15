import { useState } from "react";
import { ref, set } from "firebase/database";
import { realDb } from "@/firebase/config";

const AddRow = ({ restaurantId }: { restaurantId: string }) => {
  const [rowName, setRowName] = useState("");

    const handleAddRow = () => {
      if(rowName === "") return;
    const newRowRef = ref(realDb, `chairs/${restaurantId}/${rowName}`);
    set(newRowRef, { seats: 0, freeSeats: [1] });
    setRowName(""); // Clear input after adding row
  };

  return (
    <div className="flex flex-col items-center gap-4 px-6 py-3">
      <input
        type="text"
        placeholder="Enter row name"
        value={rowName}
        onChange={(e) => setRowName(e.target.value)}
        className="border border-gray-400 px-3 py-1 rounded"
      />
      <button onClick={handleAddRow} className="bg-blue-500 text-white px-5 py-2">
        Add Row
      </button>
    </div>
  );
};

export default AddRow;