import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className='flex w-full h-[10vh] items-center'>
            <Link href={'/'}>
                <img src="/images/icon.svg" alt="Picture of the author" className='h-[7vh] w-[7vh] ml-[2vw] mr-[3vw]'></img>
            </Link>
            <p className='h-[7vh] text-nowrap mr-auto text-center items-center font-extrabold text-2xl'>This Week’s theme is ~~~~~~~~~~~~~~</p>
            <Link href={'/profile'}>
                <img src="/images/profile.svg" alt="Picture of the author" className='h-[7vh] w-[7vh] ml-[2vw] mr-[3vw]'></img>
            </Link>
            <Link href={'/send'}>
                <img src="/images/send.svg" alt="Picture of the author" className='h-[7vh] w-[7vh] ml-[2vw] mr-[3vw]'></img>
            </Link>
        </div>
    )
}

export default Header
