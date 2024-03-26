"use client";
import AddTable from "@/components/AddTable";
import { MdOutlineTableBar } from "react-icons/md";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import UpdateTable from "@/components/UpdateTable";
import DeleteTable from "@/components/DeleteTable";
function Page() {
  
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setTableData(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])
  
  console.log(tableData)
  return (
  
    <section className="grid gap-5 items-center grid-cols-4">
      {tableData.map((table) => (
        <div key={table.id}>
          <svg
            width="56"
            height="57"
            viewBox="0 0 56 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M52.6289 12.6949L39.3101 1.65533L3.6409 44.6889L16.9597 55.7284L52.6289 12.6949Z"
              fill={`red`}
              stroke="black"
            />
            <path
              d="M42.6434 54.6959L54.4224 42.0263L13.2698 3.76654L1.49079 16.4361L42.6434 54.6959Z"
              fill={`red`}
              stroke="black"
            />
            <path
              d="M25.9212 47.17C35.8234 48.6844 45.0785 41.8848 46.5929 31.9825C48.1074 22.0803 41.3077 12.8252 31.4055 11.3108C21.5032 9.7963 12.2481 16.596 10.7337 26.4982C9.21924 36.4005 16.0189 45.6555 25.9212 47.17Z"
              fill={`red`}
              stroke="black"
            />
          </svg>
          <h1>{table.data.tableName}</h1>
          <h1>{table.data.tableDescription}</h1>
          <UpdateTable tableData={table.data} tableId={table.id} />
          <DeleteTable tableId={ table.id} />
        </div>
      ))}
      <AddTable />
    </section>
  );
}

export default Page;
