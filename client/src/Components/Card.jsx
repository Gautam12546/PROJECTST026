import React from 'react'
import { FaCartPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Card = () => {
  return (
    <div className='flex justify-between h-16 w-full items-center border-b-2 border-slate-200 bg-orange-400'>
        <h1 className='text-3xl italic mx-3 font-bold'>Dewsis</h1>
        <Link to='/cart' className='flex items-center justify-center h-full w-16 text-3xl m-1 text-black'>
        <FaCartPlus />
      </Link>
    </div>
  )
}

export default Card;
