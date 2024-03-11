'use client'
import React, { useEffect, useState } from 'react'

interface Theme {
    id: string
    title: string
    description: string
    startDate: Date
    endDate: Date
}


const Header = () => {
    const [theme, setTheme] = useState<Theme[]>([]);
    async function getData() {
        const res = await fetch('http://127.0.0.1:8000/theme', {
            method: 'GET',
        })

        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        return res.json()
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await getData();
                console.log(fetchedData)
                setTheme(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])

    return (
        <div className="navbar bg-base-100 w-[80vw] mx-auto border-2 rounded-full mt-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a href='/'>Homepage</a></li>
                        <li><a href='/profile'>Profile</a></li>
                        <li><a href='/send'>Send</a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl text-center" href='/'>{theme.length > 0 ? `This Week's theme is ${theme[0].title}` : 'Loading...'}</a>
            </div>
            <div className="navbar-end">
                <a href="/profile" className="btn btn-ghost btn-circle">
                    <img src="/images/profile.svg" alt="icon" className="h-5 w-5" />
                </a>
                <button className="btn btn-ghost btn-circle">
                    <a href="/send" className="btn btn-ghost btn-circle">
                        <img src="/images/send.svg" alt="icon" className="h-5 w-5" />
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Header
