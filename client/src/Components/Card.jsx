import React from 'react'
import { FaCartPlus } from "react-icons/fa6";
const Card = () => {
  return (
    <div className='flex items-center justify-between  w-full  bg-purple-500 fixed'>
      <div className= 'flex items-center gap-4 h-full w-64 p-4'>
          <p className='font-serif text-3xl text-black font-bold'>Kridomania</p> 
      </div>
      <div className='flex items-center justify-center h-full w-16 text-3xl m-1 text-black'><FaCartPlus /></div>
    </div>
  )
}

export default Card;
