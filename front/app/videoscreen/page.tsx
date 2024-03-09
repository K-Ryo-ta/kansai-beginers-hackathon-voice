import Sidebar from '@/conponents/Sidebar';
import Viewer from '@/conponents/Viewer';
import React from 'react'

const page = () => {
    const videoUrls = [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    ]

    return (
        <div className='flex'>
            <div className='w-full h-full mx-auto flex justify-center items-center mt-20'>
                <ul className='overflow-x-scroll border-separate flex mx-auto snap-y h-[400px] flex-col w-[80%] items-center'>
                    {videoUrls.map((url, index) => {
                        return (
                            <li className=' w-[50%] flex justify-center rounded-3xl mx-auto snap-center mt-10 mb-10 border-4' key={index}>
                                <Viewer />
                            </li>
                        )
                    }
                    )}
                </ul>
            </div>
            <Sidebar />
        </div>

    );
}

export default page
