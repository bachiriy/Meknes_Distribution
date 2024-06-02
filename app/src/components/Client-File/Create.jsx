import { Input } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Create() {
    return (
        <div className="p-6 bg-gray-100 min-h-screen ml-12">
            <div className="flex items-center mb-6">
                <Link to="/" className="text-gray-600 hover:text-gray-800">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </Link>
                <h1 className="text-2xl font-bold ml-4">Dossier Client / <span className='text-xl'>Créer</span></h1>
            </div>

            <form action="">
                <Input value='hey' /> {/* example of input */}
            </form>
        </div>
    )
}

export default Create