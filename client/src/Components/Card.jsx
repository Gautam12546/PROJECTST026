import React from 'react'
import { AiFillHome } from "react-icons/ai";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
const Card = ({id}) => {
  const [userData,setUserData] = useState({});
  useEffect(() => {
    axios.get('https://restro-27c7.onrender.com/getdata', {
        params: { value: id }
    })
    .then((response) => {
        setUserData(response.data.data);
    })
    .catch((err) => {
        console.log(err);
    });
}, [id]);
  return (
    <div className='flex justify-between h-16 w-full items-center border-b-2 border-slate-200 bg-orange-400'>
        <h1 className='text-3xl italic mx-3 font-bold'>{userData.shopName}</h1>
        <Link to='/' className='flex items-center justify-center h-full w-16 text-3xl m-1 text-black'>
        <AiFillHome />
      </Link>
    </div>
  )
}

export default Card;
