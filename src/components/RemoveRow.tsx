import { useState } from "react";
import { ref, remove } from "firebase/database";
import { realDb } from "@/firebase/config";

const RemoveRow = ({ restaurantId }: { restaurantId: string }) => {
  const [rowName, setRowName] = useState("");

  const handleRemoveRow = () => {
    const rowRef = ref(realDb, `chairs/${restaurantId}/${rowName}`);
    remove(rowRef);
    setRowName(""); // Clear input after removing row
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
      <button onClick={handleRemoveRow} className="bg-red-500 text-white px-5 py-2">
        Remove Row
      </button>
    </div>
  );
};


export default RemoveRow;