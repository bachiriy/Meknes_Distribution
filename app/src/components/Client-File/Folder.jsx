import React from 'react';
import { Link } from 'react-router-dom';
import ThreePointMenu from './ThreePointMenu';


const Folder = ({ clientFile }) => {
  return (
    <div className="p-3 hover:opacity-80 border border-black hover:shadow-lg transition-all rounded-lg">
      <div className='flex justify-end'>
        <ThreePointMenu id={clientFile.id} />
      </div>
      <Link to={`/client-file/${clientFile.id}`}>
        <div className="w-full text-center">
          <svg
            fill="currentColor"
            className="text-yellow-400 w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              className="cursor-pointer"
              d="M0 4c0-1.1.9-2 2-2h7l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"
            />
          </svg>
          <p>{clientFile.file_name}</p>
        </div>
      </Link>
    </div>
  );
};

export default Folder;
