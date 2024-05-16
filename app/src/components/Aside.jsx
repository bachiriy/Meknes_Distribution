import React from 'react';

import Cookies from "js-cookie";
import Spinner from './Spinner';
import { useState } from "react";

const Aside = ({ inPage, setIsConnected }) => {

    const [loading, setLoading] = useState(false)

    const handleLogOut = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cookies.get('token'),
            }
        });
        if (response.ok) {
            Cookies.remove('token');
            Cookies.remove('user');
            console.log('token removed');
            setIsConnected(false);
        } else {
            const errors = await response.json();
            console.log('error loging out : ' + errors);
        }
        setLoading(false);
    }

    return (
        <>
            {loading ? (<Spinner />) : (
                <aside className="h-full w-12 py-4 flex flex-col space-y-8 items-center justify-center fixed bg-[#0a0a0a] text-white">
                    <div className={"h-6 w-6 flex items-center justify-center rounded-lg cursor-pointer hover:text-white hover:duration-300 hover:ease-linear focus:bg-white " + (inPage === 1 ? "text-white" : "text-neutral-600")}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
                    </div>

                    <div className={"h-6 w-6 flex items-center justify-center rounded-lg cursor-pointer hover:text-white hover:duration-300 hover:ease-linear focus:bg-white " + (inPage === 2 ? "text-white" : "text-neutral-600")}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>

                    <div className={"h-6 w-6 flex items-center justify-center rounded-lg cursor-pointer hover:text-white hover:duration-300 hover:ease-linear focus:bg-white " + (inPage === 3 ? "text-white" : "text-neutral-600")}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>

                    <div className={"h-6 w-6 flex items-center justify-center rounded-lg cursor-pointer hover:text-white hover:duration-300 hover:ease-linear focus:bg-white " + (inPage === 4 ? "text-white" : "text-neutral-600")}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>

                    <div className="flex flex-col items-center justify-end h-full">
                        <form
                            onSubmit={handleLogOut}
                        >
                            <button>
                                <svg className="h-6 w-6 text-gray-600 hover:text-red-500 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
                            </button>
                        </form>
                    </div>
                </aside>
            )}
        </>
    )
}

export default Aside;