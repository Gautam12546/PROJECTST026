import React from 'react'
import { useState } from 'react';

function FoodCard({button}) {
    const [num,setnum]=useState(0);
  return (
    <div>
        <div className='flex flex-col my-3 justify-center items-center'>
        <img className='w-[90%] rounded-lg' src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />

        <div className='flex justify-between w-full'>
                <div className='w-[90%] mx-5'>
                    <p className='text-xl mx-2 my-1'>Name</p>
                    <p className='text-xl mx-2 my-1'>₹ 200</p>
                </div>
                <div className='flex items-center mx-5'>
                    <button className='bg-red-600 text-2xl font-bold px-3 py-1 rounded-s-lg' onClick={()=>{
                        {num<=0 ? setnum(0):setnum(num-1)};
                    }}>-</button>
                    <input className='w-10 h-10 border-2 border-gray-500 text-center text-2xl font-semibold' type="number" value={num}/>
                    <button className='bg-red-600 text-2xl font-bold px-3 py-1 rounded-e-lg' onClick={()=>{
                        setnum(num+1);
                    }}>+</button>
                </div>
                </div>
                {button}
        </div>
        <hr />
    </div>
  )
}

export default FoodCard