import React, { useState } from 'react';
import FoodCard from './FoodCard';
import FoodCategory from './FoodCategory';
import AdminFoodCard from './AdminFoodCard';
import { Link } from 'react-router-dom';
import Model from './Model';
import Createmenu from './Createmenu';
import Pizza from '../assets/Pizza.jpeg';
import Burger from '../assets/Burger.jpeg';
import Noodles from '../assets/Noodles.webp';
import Dosa from '../assets/Dosa.jpeg';
import Drinks from '../assets/Drinks.webp';


const AdminComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const hanldeClick = () => {
    setShowModel(true);
  }
  const handleClose = () => {
    setShowModel(false);
  }

  const model = <Model onClose={handleClose}>

    <Createmenu setShowModel={setShowModel} />

  </Model>

  return (
    <>
      <div className="flex items-center justify-between bg-yellow-500 text-white p-3">
        {/* Logo */}
        <Link to='/profile'>
          <div className="flex items-center">
            <img
              src="https://images.pexels.com/photos/5560518/pexels-photo-5560518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Replace with your logo URL
              alt="Account Logo"
              className="w-12 h-12 mr-2 rounded-full"
            />

          </div>
        </Link>

        <span className="font-semibold text-2xl italic text-black">Dewsis</span>
        {/* Menu Icon */}
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

          {/* Menu Dialog Box */}
          {isMenuOpen && (
            <div className="absolute right-[-12px] mt-4 w-48 bg-gray-100 border rounded shadow-lg z-10">
              <ul className='flex flex-col items-center'>
                <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black text-lg font-semibold" onClick={()=>{
                  hanldeClick()
                  toggleMenu()
                }}>
                  Add Menu
                </li>
                <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black text-lg font-semibold">
                  Add Offers
                </li>
                <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black text-lg font-semibold">
                  Logout
                </li>
                {/* Add more menu items as needed */}
              </ul>
            </div>
          )}

        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 flex-wrap">
        <FoodCategory  pic={Pizza} name='Pizza' />
        <FoodCategory pic={Burger} name='Burger' />
        <FoodCategory pic={Noodles} name='Noodles' />
        <FoodCategory pic={Dosa} name='South' />
        <FoodCategory  pic={Drinks} name='Drinks' />
      </div>
      <hr />

      <AdminFoodCard />
      <AdminFoodCard />
      {showModel && model}
    </>
  );
};

export default AdminComponent;
