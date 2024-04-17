import React from 'react'
import FoodCategory from './FoodCategory'
import Slider from './Slider'




const Belowbx = () => {
   
  return (
    <div className=' flex flex-col h-screen w-full mt-20'>

       <div className='flex items-center justify-center h-28 w- full m-2'>
       <input
        type="text"
        placeholder="Search..."
        
        className=" bg-white py-2 px-4 h-full w-full md:w-auto border border-gray-800 rounded-[20px] focus:outline-none focus:border-blue-800 text-black text-2xl"
      />
         </div>

       <div className='flex flex-col items-start h-3/5 w-full gap-2  p-2'>
          <div className='w-full flex flex-row items-center justify-between'>
             <div className='flex items-center justify-center'><h1 className='text-3xl font-bold text-black'> Special offer</h1></div>
          </div>
          <div>
          <Slider/> 
          </div>
         
         </div>
       <div className=' flex flex-row items-center gap-3 h-3/6 overflow-scroll  w-auto'>
         <FoodCategory/> 
         <FoodCategory/>
         <FoodCategory/>
         <FoodCategory/>
         <FoodCategory/>
         <FoodCategory/>
         <FoodCategory/>
        
       </div>
       <div className='flex items-end h-4/5 w-full bg-[green]'> scroll food content </div>
       <div className=' h-28 w -24 bg-zinc-100 '> this is static footer box </div>
    </div>
  )
}

export default Belowbx
