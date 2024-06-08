import axios from 'axios';
import React from 'react';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { FaMinus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const FoodCategory = ({ pic, name, onClick, minus, id, setChange}) => {
  const [cookies] = useCookies(['token']);
  
  const handleDelete = (itemId) => {
    const decodedToken = jwtDecode(cookies.token);
    axios.delete(`http://localhost:3000/category/${itemId}`, {
      params: {
        value: decodedToken.data
      }
    })
      .then((response) => {
        toast.success(response.data.message);
        setChange(prevState => !prevState);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='relative flex flex-col items-center p-1 cursor-pointer'>
      <div className='relative'>
        <img className='h-16 w-16 rounded-full border-2 border-gray-300 object-cover' src={pic} onClick={onClick} />
      </div>
      {minus ? <FaMinus className='absolute top-0 right-0 text-black bg-gray-300 rounded-full p-1' size={16} onClick={()=>handleDelete(id)} /> : null}
      <p className='text-xl text-black'>{name}</p>
    </div>
  );
}

export default FoodCategory;
