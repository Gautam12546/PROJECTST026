import React from 'react'
import { useState } from 'react';
import Card from './Card';
import FoodCategory from './FoodCategory';
import FoodCard from './FoodCard';
import Button from './Button';

function Belowbx() {
  
    
  return (
    <>
    {/* <div className='flex justify-between h-16 w-full items-center border-b-2 border-slate-200'>
        <h1 className='text-3xl italic mx-3 font-bold'>Dewsis</h1>
        <i class="fa-solid fa-cart-plus text-3xl mx-3"></i>
    </div> */}
    <Card />


    <div className='flex w-full justify-center items-center'>
        <input className='border-black border-2 w-[90%] px-4 py-3 rounded-full my-5 bg-gray-100' type="text" placeholder='What are you Looking for ...'/>
    </div>

    
    <div className='w-full h-60 flex flex-col items-center'>
        <div className='flex justify-start w-[90%]'>
            <h1 className='text-xl my-1'>Special Offers</h1>
        </div>
        <div className='w-[90%] h-[80%] bg-green-400 rounded-[45px]'></div>
    </div>

    <div className="grid grid-cols-4 gap-4 flex-wrap">
    <FoodCategory />
    <FoodCategory />
    <FoodCategory />
    <FoodCategory />
    <FoodCategory />
    <FoodCategory />
    </div>
    {/* <div className='w-auto flex flex-wrap'>
        <div className='flex flex-col justify-evenly items-center w-[25%] h-28'>
            <img className='h-16 w-16 bg-white rounded-full' src="https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Pizza" />
            <p className='text-xl'>Pizza</p>
        </div>

        <div className='flex flex-col justify-evenly items-center w-[25%] h-28'>
            <img className='h-16 w-16 bg-white rounded-full' src="https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Noodles" />
            <p className='text-xl'>Noodle</p>
        </div>

        <div className='flex flex-col justify-evenly items-center w-[25%] h-28'>
            <img className='h-16 w-16 bg-white rounded-full' src="https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Noodles" />
            <p className='text-xl'>Noodle</p>
        </div>

        <div className='flex flex-col justify-evenly items-center w-[25%] h-28'>
            <img className='h-16 w-16 bg-white rounded-full' src="https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Noodles" />
            <p className='text-xl'>Noodle</p>
        </div>

        <div className='flex flex-col justify-evenly items-center w-[25%] h-28'>
            <img className='h-16 w-16 bg-white rounded-full' src="https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Noodles" />
            <p className='text-xl'>Noodle</p>
        </div>

        
    </div> */}
    <hr />

    <div className='w-full h-auto flex flex-col my-4'>
        <FoodCard button={<Button msg='Add To Cart'/>} />
        <FoodCard button={<Button msg='Add To Cart'/>} />
        

        

    </div>

    
    </>
  )
}

export default Belowbx;