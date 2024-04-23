import React from 'react'
import { FaRegStar } from "react-icons/fa";

function AdminFoodCard() {
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
                  <div className='text-2xl mx-2 '>
                  <FaRegStar />
                  </div>
                  <div className='text-2xl mx-2 '>
                  <FaRegStar />
                  </div>
                  <div className='text-2xl mx-2 '>
                  <FaRegStar />
                  </div>
                  <div className='text-2xl mx-2 '>
                  <FaRegStar />
                  </div>
                  <div className='text-2xl mx-2 '>
                  <FaRegStar />
                  </div>
                </div>
                </div>
        </div>
        <hr />
    </div>
  )
}

export default AdminFoodCard