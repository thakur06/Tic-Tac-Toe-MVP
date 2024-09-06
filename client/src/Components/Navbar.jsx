import React from 'react';
import { Link } from 'react-router-dom';
export const Navbar = () => {
  return (
    <div className='w-full h-10 flex flex-row p-4 justify-between '>
      <div className='font-display text-6xl'>Navbar</div>
      <div className=''>
        <button>btn </button>
      <button>btn</button>
      </div>
    </div>
  );
};