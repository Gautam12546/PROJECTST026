import React, { useEffect } from 'react';
import { FaRegStar, FaTrash } from "react-icons/fa";
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useState } from 'react';
import { MdOutlineModeEditOutline } from "react-icons/md";
import Model from './Model';
import Editmenu from './Editmenu';
import { toast } from 'react-toastify';

function AdminFoodCard({ change, category,setChange }) {
  const [cookies] = useCookies(['token']);
  const [menuitem, setMenuItem] = useState([]);
  const [showModel2, setShowModel2] = useState(false);
  const [itemId , setItemId] = useState('');

  useEffect(() => {
    const decodedToken = jwtDecode(cookies.token);

    axios.get('http://localhost:3000/menu', {
      params: {
        value: decodedToken.data
      }
    })
    .then((response) => {
      setMenuItem(response.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [cookies.token, change]);
  
  const filteredItems = category === 'All' ? menuitem : menuitem.filter(item => item.productCategory === category);


  const handleDelete = (itemId) => {
    const decodedToken = jwtDecode(cookies.token);
    axios.delete(`http://localhost:3000/menu/${itemId}`, {
      params: {
        value: decodedToken.data
      }
    })
      .then((response) => {
        toast.success(response.data.message);
        setMenuItem(menuitem.filter(item => item._id !== itemId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hanldeClick2 = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowModel2(true);
  }
  const handleClose2 = () => {
    setShowModel2(false);
  }

  const model2 = <Model onClose={handleClose2}>

<Editmenu setShowModel2={setShowModel2} itemId={itemId} setChange={setChange} />

</Model>

  return (
    <div>
      {filteredItems.slice().reverse().map((item, index) => (
        <div key={index} className='flex flex-col my-3 justify-center items-center'>
          <img className='w-[90%] rounded-lg' src={`http://localhost:3000/uploads/${item.productImage}` || "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt={item.productName} />
          <div className='flex flex-col justify-between w-full'>
            <div className='w-[90%] mx-5'>
              <div className='flex items-center justify-between'>
                <p className='text-xl mx-2 my-1'>{item.productName}</p>
                <div className='flex items-center'>
                  <MdOutlineModeEditOutline className='text-black cursor-pointer mx-2 text-xl font-semibold' onClick={() => {
                    setItemId(item._id);
                    hanldeClick2();
                  }
                  } />
                  <FaTrash className='text-black cursor-pointer mx-2 text-xl font-semibold' onClick={() => handleDelete(item._id)} />
                </div>
              </div>
            </div>
            <div className='flex items-center justify-between mx-5'>
              <div>
                <p className='text-xl mx-2 my-1'>₹ {item.productPrice}</p>
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className='text-2xl mx-2 '>
                  <FaRegStar />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      {showModel2 && model2}
    </div>
    
  );
}

export default AdminFoodCard;
