import React from 'react';


const Spinner = () => {
    return (
        <div className='flex w-screen overflow-hidden space-x-2 justify-center items-center bg-white h-screen dark:invert'>
            <span className='sr-only'>Loading...</span>
            <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
        </div>
    );
};

export default Spinner;