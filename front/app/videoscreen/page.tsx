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

const page = () => {
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
        <div className='flex'>
            <div className='w-full h-full mx-auto flex justify-center items-center mt-20'>
                <ul className='overflow-x-scroll border-separate flex mx-auto snap-y h-[400px] flex-col w-[80%] items-center'>
                    {videoUrls.map((url, index) => {
                        return (
                            <li className=' w-[50%] flex justify-center rounded-3xl mx-auto snap-center mt-10 mb-10 border-4' key={index}>
                                <video style={{ "width": "16rem" }} src={url} controls></video>
                                <Sidebar userId={videoData !== null ? videoData[index].userId : ""} id={videoData !== null ? videoData[index].id : ""} />
                            </li>
                        )
                    }
                    )}
                </ul>
            </div>

        </div>

    );
}

export default page
