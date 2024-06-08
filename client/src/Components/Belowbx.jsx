import React, { useEffect, useState } from 'react';
import Card from './Card';
import FoodCategory from './FoodCategory';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaRegStar } from 'react-icons/fa';
import {toast} from 'react-toastify';
import All from '../assets/All.jpg';

function Belowbx() {
    const navigate = useNavigate();
    const [menuitem, setMenuItems] = useState([]);
    const [userData, setUserData] = useState({});
    const [category, setSelectedCategory] = useState('All');
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:3000/usermenu', {
            params: { value: id }
        })
        .then((response) => {
            setUserData(response.data.data);
            setMenuItems(response.data.data.menu);
        })
        .catch((err) => {
            navigate('/');
            toast.error('Invalid Qr-Code');
            console.log(err);
        });
    }, [id]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
      };

      const filteredItems = category === 'All' ? menuitem : menuitem.filter(item => item.productCategory === category);

    return (
        <>
            <Card id={id}/>
           

            <div className="grid grid-cols-4 gap-4 flex-wrap">
            <FoodCategory pic={All} name='All' minus={false} onClick={() => handleCategoryClick('All')} />
            {userData.category && userData.category.slice().reverse().map((category, index) => (
          <FoodCategory key={index} pic={`http://localhost:3000/uploads/${category.categoryImage}`} name={category.categoryName} minus={false} onClick={() => handleCategoryClick(category.categoryName)} />
        ))}
            </div>
            <hr />

            <div className='w-full h-auto flex flex-col my-4'>
                {filteredItems.slice().reverse().map((item, index) => (
                    <div key={index} className='flex flex-col my-3 justify-center items-center'>
                        <img
                            className='w-[90%] rounded-lg'
                            src={`http://localhost:3000/uploads/${item.productImage}`}
                            alt={item.productName}
                        />
                        <div className='flex flex-col justify-between w-full'>
                            <div className='w-[90%] mx-5'>
                                <p className='text-xl mx-2 my-1'>{item.productName}</p>
                            </div>
                            <div className='flex items-center justify-between mx-5'>
                                <div>
                                    <p className='text-xl mx-2 my-1'>₹ {item.productPrice}</p>
                                </div>
                                <div className='flex'>
                                    {[...Array(5)].map((_, i) => (
                                        <FaRegStar key={i} className='text-2xl mx-2' />
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                ))}
            </div>
        </>
    );
}

export default Belowbx;
