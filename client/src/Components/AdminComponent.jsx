import React, { useState } from 'react';
import FoodCard from './FoodCard';
import FoodCategory from './FoodCategory';
import AdminFoodCard from './AdminFoodCard';


const AdminComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
    <div className="flex items-center justify-between bg-orange-400 text-white p-3">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="https://images.pexels.com/photos/5560518/pexels-photo-5560518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Replace with your logo URL
          alt="Account Logo"
          className="w-12 h-12 mr-2 rounded-full"
        />
        
      </div>
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
              <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black text-lg font-semibold">
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
    <div className="flex flex-row overflow-scroll my-3">
    <FoodCategory />
    <FoodCategory />
    <FoodCategory />
    <FoodCategory />
    <FoodCategory />
    <FoodCategory />
    <FoodCategory />
    </div>
    <hr />
    
    <AdminFoodCard />
    <AdminFoodCard />
    </>
  );
};

export default AdminComponent;
