import React, { useState } from 'react'
import Card from './Card';
import FoodCard from './FoodCard';
import Button from './Button';
import { Link } from 'react-router-dom';

function Cart() {
    const [num, setnum] = useState(0);
    return (
        <div>
            <Card />

            <div className='w-full'>
                <FoodCard button={null}/>
                <FoodCard button={null}/>
            </div>


            <div className='mt-3 mb-20 rounded-lg w-full flex justify-center items-center'>
                <div className='w-[85%] rounded-lg'>
                    <div className='flex justify-between'>
                        <p className='text-xl font-semibold my-2'>Quantity</p>
                        <p className='text-xl font-semibold my-2'>5</p>
                    </div>

                    <div className='flex justify-between'>
                        <p className='text-xl font-semibold my-2'>GST</p>
                        <p className='text-xl font-semibold my-2'>18%</p>
                    </div>

                    <div className='flex justify-between'>
                        <p className='text-xl font-semibold my-2'>Total Amount</p>
                        <p className='text-xl font-semibold my-2'>180</p>
                    </div>
                </div>
            </div>

            
                
                <footer className='flex w-full fixed bottom-0 h-14 items-center justify-evenly border-t-2 border-gray-200'>
                    <Button msg='Click To Pay' />
                    </footer>
            
        </div>
    )
}

export default Cart