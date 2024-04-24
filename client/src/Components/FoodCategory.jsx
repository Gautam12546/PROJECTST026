import React from 'react'

const FoodCategory = ({pic,name}) => {
  return (
    <div className='flex flex-col items-center p-1'>
      <img className='h-16 w-16 rounded-full object-cover' src={pic} alt="" />
       <p className='text-xl text-black'>{name}</p>
    </div>

  )
}

export default FoodCategory;
