import React from 'react'
import { MdQrCodeScanner } from "react-icons/md";
import './Home.css'

const Home = () => {
  return (
    <div  className="background-image: url('./pizza.jpg') box flex flex-col items-center min-h-screen">
    <nav className="w-full h-20 flex items-center justify-between  shadow-md">
      <h2 className='rounded-3xl font-semibold text-4xl text-white pl-3'>Resturant</h2>
      <button className="cursor-pointer px-8 py-2 mx-4 bg-orange-500 text-white rounded-3xl font-semibold text-lg ">Login</button>
    </nav>

    <div className=" flex flex-col justify-center items-center w-full h-full ">
      <div className="h-96  flex flex-col items-center justify-center gap-10">
        <h2 className="flex flex-col items-center gap-3 text-3xl font-bold  mb-4"><p className='text-orange-600 text-6xl'>Create Your</p> <span className='text-gray-100 text-5xl'>Own Shop</span> </h2>
         
        <button className="cursor-pointer px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold text-[25px]">Click here to Create</button>
      </div>
         <h2 className='text-black flex flex-col font-semibold text-4xl'>Watch the video to  <span className='text-black-600 font-semibold text-3xl'>continue...</span> </h2>
        
        <div className="w-[90%] h-60 bg-transparent mb-48 rounded-3xl overflow-hidden relative">
         <video className="absolute inset-0 w-full h-full object-cover" controls>
           <source src="./video.mp4" type="video/mp4" />
          </video>
        </div>


      <footer className='flex flex-row w-4/5 h-16 fixed bottom-3 items-center justify-around cur  border-gray-200 bg-orange-600 m-3 rounded-xl'>
           <MdQrCodeScanner fontSize="1.95rem" />
            <button className='text-[35px] font-medium pb-1 pr-0'>scan now</button>
       </footer>
    </div>
  </div>

  )
}

export default Home;