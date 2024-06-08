import React, { useEffect, useState } from 'react';
import FoodCategory from './FoodCategory';
import AdminFoodCard from './AdminFoodCard';
import { Link, useNavigate } from 'react-router-dom';
import Model from './Model';
import Createmenu from './Createmenu';
import All from '../assets/All.jpg';
import Plus from '../assets/Plus.png';
import Qr_code from './Qr_code';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import CreateCategory from './CreateCategory';


const AdminComponent = () => {
  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showModel1, setShowModel1] = useState(false);
  const [showModel2, setShowModel2] = useState(false);
  const [userData, setUserData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  useEffect(() => {
    const decodedToken = jwtDecode(cookies.token);

    axios.get('http://localhost:3000/getdata', {
      params: {
        value: decodedToken.data
      }
    })
      .then((response) => {
        setUserData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [change]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const hanldeClick = () => {
    setShowModel(true);
  }
  const handleClose = () => {
    setShowModel(false);
  }

  const hanldeClick1 = () => {
    setShowModel1(true);
  }
  const handleClose1 = () => {
    setShowModel1(false);
  }

  const hanldeClick2 = () => {
    setShowModel2(true);
  }
  const handleClose2 = () => {
    setShowModel2(false);
  }

  

  const model = <Model onClose={handleClose}>

    <Createmenu setShowModel={setShowModel} setChange={setChange} />

  </Model>

  const model1 = <Model onClose={handleClose1}>

    <Qr_code setShowModel1={setShowModel1} />

  </Model>


const model2 = <Model onClose={handleClose2}>

<CreateCategory setShowModel2={setShowModel2} setChange={setChange} />

</Model>

  const handleLogout = () => {
    removeCookie('token', { path: '/' });
    navigate('/');
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className="flex items-center justify-between bg-orange-500 text-white p-3 mb-2">
        
       
          <div className="flex items-center">
            <img
              src="https://images.pexels.com/photos/5560518/pexels-photo-5560518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Replace with your logo URL
              alt="Account Logo"
              className="w-12 h-12 mr-2 rounded-full"
            />

          </div>
        

        <span className="font-semibold text-2xl italic text-black">{userData.shopName
        }</span>
        
        <div className="relative">

          <button onClick={toggleMenu} className="focus:outline-none text-black">
            <svg
              className="w-9 h-9"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          
          {isMenuOpen && (
            <div className="absolute right-[-12px] mt-4 w-48 bg-gray-100 border rounded shadow-lg z-10">
              <ul className='flex flex-col items-center'>
                <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black text-lg font-semibold" onClick={() => {
                  hanldeClick()
                  toggleMenu()
                }}>
                  Add Menu
                </li>
                <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black text-lg font-semibold" onClick={() => {
                  hanldeClick1()
                  toggleMenu()
                }}>
                  Get Qr-Code
                </li>
                <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black text-lg font-semibold" onClick={handleLogout}>
                  Logout
                </li>
               
              </ul>
            </div>
          )}

        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 flex-wrap">
        <FoodCategory pic={All} name='All' minus={false} onClick={() => handleCategoryClick('All')} />
        {userData.category && userData.category.slice().reverse().map((category, index) => (
          <FoodCategory key={index} pic={`http://localhost:3000/uploads/${category.categoryImage}`} name={category.categoryName} minus={true} id={category._id} setChange={setChange} onClick={() => handleCategoryClick(category.categoryName)} />
        ))}
        <FoodCategory pic={Plus} name='Add' minus={false} onClick={() => {hanldeClick2()}}/>
      </div>
      <hr />

      <AdminFoodCard change={change} category={selectedCategory} setChange={setChange}/>
      {showModel && model}
      {showModel1 && model1}
      {showModel2 && model2}
    </>
  );
};

export default AdminComponent;
