import Movie from "@/conponents/Movie";
import Sidebar from "@/conponents/Sidebar";
import Viewer from "@/conponents/Viewer";
import Image from "next/image";


// async function getData() {
//   //TODO:環境変数に変える
//   const res = await fetch('http://127.0.0.1:8000/')
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }

//   return res.json()
// }

export default async function Home() {
  // const data = await getData()
  // console.log(data)
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="flex w-[0vh] h-[70vh]">
          <Viewer />
          <Sidebar />
      </div>
    </main>
  );
}
