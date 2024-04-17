// import React, { useState, useEffect } from 'react';

// const images = [
//   'https://www.pexels.com/photo/houses-with-flowers-on-the-balcony-14512028/',
//   'https://www.pexels.com/photo/close-up-of-coffee-cup-14838102/',
//   'https://www.pexels.com/photo/man-wrapped-white-fabric-and-wearing-in-beige-shirt-holding-a-violin-18416867/',
//   'https://plus.unsplash.com/premium_photo-1669324357471-e33e71e3f3d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww',
// ]; // Add your image URLs here

// const Slider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 3000); // Change slide every 3 seconds

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="relative">
//       {images.map((imageUrl, index) => (
//         <img
//           key={index}
//           src={imageUrl}
//           alt={`Slide ${index}`}
//           className={`absolute w-full h-full transition-opacity duration-500 ${
//             index === currentIndex ? 'opacity-100' : 'opacity-0'
//           }`}
//         />
//       ))}
//     </div>
//   );
// };

// export default Slider;

import React from 'react'

const Slider = () => {
  return (
    <div className='flex flex-col h-full w-full'>
      <div className='flex flex-row h-full w-full bg-[green] gap-4 rounded-[35px] p-3'>
         <div className='h-full w-44 bg-red-300 '>
            <div className=' flex items-center justify-center text-7xl font-bold h-24 w-full  '>30%</div>
            <div className='h-24 w-full bg-blue-200'>
              <p className=' flex '>Discount Only</p>
              <p className=' flex '>Valid for Today</p>
            </div>
         </div>
         <div className='h-full w-44 bg-red-100 '><img src="" alt="" /></div>
      </div>
    </div>
  )
}

export default Slider
