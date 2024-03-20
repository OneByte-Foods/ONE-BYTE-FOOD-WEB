import { MdOutlineTableBar } from "react-icons/md";

function page() {
  const dummyTable = [
    {
      id: 1,
      tableNo: 1,
      tabeName: "Sagarmattha",
      avilable: false,
    },
    {
      id: 2,
      tableNo: 1,
      tabeName: "Sagarmattha",
      avilable: true,
    },
    {
      id: 3,
      tableNo: 1,
      tabeName: "Sagarmattha",
      avilable: false,
    },
    {
      id: 4,
      tableNo: 1,
      tabeName: "Sagarmattha",
      avilable: true,
    },
  ];
  return (
    <section className="grid items-0center grid-cols-4">
      {dummyTable.map((table) => (
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
              fill={`${table.avilable ? "green" : "red"}`}
              stroke="black"
            />
            <path
              d="M42.6434 54.6959L54.4224 42.0263L13.2698 3.76654L1.49079 16.4361L42.6434 54.6959Z"
              fill={`${table.avilable ? "green" : "red"}`}
              stroke="black"
            />
            <path
              d="M25.9212 47.17C35.8234 48.6844 45.0785 41.8848 46.5929 31.9825C48.1074 22.0803 41.3077 12.8252 31.4055 11.3108C21.5032 9.7963 12.2481 16.596 10.7337 26.4982C9.21924 36.4005 16.0189 45.6555 25.9212 47.17Z"
              fill={`${table.avilable ? "green" : "red"}`}
              stroke="black"
            />
          </svg>
          <h1>{table.tableNo}</h1>
          <h1>{table.tabeName}</h1>
          <h1>{table.avilable}</h1>
        </div>
      ))}
    </section>
  );
}

export default page;
