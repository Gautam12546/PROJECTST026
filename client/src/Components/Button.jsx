import React from 'react'

function Button({msg}) {
  return (
        <button className='px-3 w-[90%] py-2 rounded-md text-2xl font-semibold bg-orange-500 cursor-pointer mb-3'>{msg}</button>
  )
}

export default Button