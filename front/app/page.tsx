// import Movie from "@/conponents/Movie";
// import Sidebar from "@/conponents/Sidebar";
// import Viewer from "@/conponents/Viewer";
// import Image from "next/image";


// // async function getData() {
// //   //TODO:環境変数に変える
// //   const res = await fetch('http://127.0.0.1:8000/')
// //   // The return value is *not* serialized
// //   // You can return Date, Map, Set, etc.

// //   if (!res.ok) {
// //     // This will activate the closest `error.js` Error Boundary
// //     throw new Error('Failed to fetch data')
// //   }
// //   return res.json()
// // }

// export default async function Home() {
//   // const data = await getData()
//   // console.log(data)
//   return (
//     <main className="flex flex-col h-[80vh] border-t">
//       <div className="flex mx-auto h-[80vh]  ">
//         <div className="w-1/6 "></div>
//         <div className="w-4/6 text-center">
//           <Viewer />
//         </div>
//         <div className="w-1/6 text-right">
//           <Sidebar userId="" videoId="" />
//         </div>
//       </div>
//     </main>
//   );
// }
'use client'
import Sidebar from '@/conponents/Sidebar';
import React, { useEffect, useState } from 'react'

interface Video {
  id: string
  title: string
  description: string
  url: string
  thumbnail: string
  theme_id: string
  userId: string
}

async function getData() {
  const res = await fetch('http://127.0.0.1:8000/video', {
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default function Home() {
  const [videoData, setVideoData] = useState<Video[] | null>([]); // 動画リストの状態


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getData();
        setVideoData(fetchedData);
        console.log(fetchedData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    if (videoData) {
      videoData.map((video) => {

      })
    }
  }, [])

  const videoUrls: string[] = []

  if (videoData) {
    console.log(videoData)
    videoData.map((video) => {
      videoUrls.push("http://localhost:8000/video/" + video.url)
      console.log("video/" + video.url)
    })
  }

  return (
    // <div className='flex'>
    //   <div className='w-full h-full mx-auto flex justify-center items-center mt-20'>
    //     <ul className='overflow-x-scroll border-separate flex mx-auto snap-y h-[400px] flex-col w-[80%] items-center'>
    //       {videoUrls.map((url, index) => {
    //         return (
    //           <li className=' w-[50%] flex justify-center rounded-3xl mx-auto snap-center mt-10 mb-10 border-4' key={index}>
    //             <video style={{ "width": "16rem" }} src={url} controls></video>
    //             <Sidebar userId={videoData !== null ? videoData[index].userId : ""} id={videoData !== null ? videoData[index].id : ""} />
    //           </li>
    //         )
    //       }
    //       )}
    //     </ul>
    //   </div>

    // </div>

    <div className="flex flex-col items-center justify-center min-h-[75vh]">
      <div className="w-full max-w-3xl">
        <div className="overflow-y-scroll snap-y snap-mandatory  h-[calc(100vh-6rem)]">
          {videoUrls.map((url, index) => (
            <div key={index} className="snap-start flex items-center justify-center h-full mt-10">
              <div className="flex w-full items-center justify-center">
                <div className="relative w-2/3 h-0 pb-[56.25%] rounded-lg shadow-lg overflow-hidden">
                  <video className="absolute top-0 left-0 w-full h-full object-cover" src={url} controls />
                </div>
                <div className=" ml-4">
                  <Sidebar userId={videoData !== null ? videoData[index].userId : ""} id={videoData !== null ? videoData[index].id : ""} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}

// // page.tsx
// 'use client';
// import Sidebar from '@/conponents/Sidebar';
// import React, { useEffect, useState } from 'react';
// import { Card } from '@/components/ui/card';
// import { AspectRatio } from '@/components/ui/aspect-ratio';

// interface Video {
//   id: string;
//   title: string;
//   description: string;
//   url: string;
//   thumbnail: string;
//   theme_id: string;
//   userId: string;
// }

// async function getData() {
//   const res = await fetch('http://127.0.0.1:8000/video', {
//     method: 'GET',
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }
//   return res.json();
// }

// export default function Home() {
//   const [videoData, setVideoData] = useState<Video[] | null>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedData = await getData();
//         setVideoData(fetchedData);
//         console.log(fetchedData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const videoUrls: string[] = [];

//   if (videoData) {
//     console.log(videoData);
//     videoData.map((video) => {
//       videoUrls.push('http://localhost:8000/video/' + video.url);
//       console.log('video/' + video.url);
//     });
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-7xl">
//         <div className="overflow-y-scroll snap-y snap-mandatory h-[calc(100vh-6rem)]">
//           {videoUrls.map((url, index) => (
//             <div key={index} className="snap-start flex items-center justify-center h-[calc(100vh-6rem)]">
//               <Card className="flex w-full max-w-7xl shadow-lg">
//                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
//                   <AspectRatio ratio={16 / 9} className="col-span-3">
//                     <video className="rounded-lg" src={url} controls />
//                   </AspectRatio>
//                   <div className="col-span-2">
//                     <Sidebar userId={videoData !== null ? videoData[index].userId : ''} id={videoData !== null ? videoData[index].id : ''} />
//                   </div>
//                 </div>
//               </Card>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
