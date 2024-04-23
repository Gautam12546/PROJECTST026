import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa6";
import { MdHome } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import FoodCategory from "./FoodCategory";
import { BsCartCheckFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-700">
      <div className="overflow-hidden w-full sm:w-11/12 lg:w-3/4 xl:w-2/3 rounded-lg flex flex-col bg-zinc-600">
        <nav className="h-1/5 font-medium text-yellow-400 flex flex-row text-4xl items-start justify-between bg-zinc-600 p-6">
          <Link to='/'>
            <IoIosArrowBack />
          </Link>
          <span className="text-xl sm:text-2xl">Profile</span>
          <Link to='/cart'>
            <FaCartPlus />
          </Link>
        </nav>

        <fieldset className="flex flex-col bg-yellow-500 overflow-scroll">
          <legend className="text-center rounded-full h-40 w-40 overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src="https://images.pexels.com/photos/3714432/pexels-photo-3714432.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="Userprofile Image"
            />
          </legend>

          <div className="p-6 sm:p-8">
            <div className="flex sm:flex-row items-center justify-center gap-4">
              <h2 className="text-3xl font-semibold">Username</h2>
              <p className="text-2xl cursor-pointer">
                <MdEdit />
              </p>
            </div>
            
          </div>

          <div className="flex justify-evenly items-center p-6 sm:p-8">
            <a className="text-6xl text-black-400" href="">
              <MdHome />
            </a>
            <a className="text-5xl text-black-400" href="">
              <BsCartCheckFill />
            </a>
            <a className="text-5xl text-black-400" href="">
              <MdHistory />
            </a>
          </div>

          <div className="p-6 sm:p-8 flex flex-col items-center">
            <p className="font-extrabold text-xl">New</p>
            <div className="flex flex-row items-center gap-3 overflow-x-auto">
              <FoodCategory />
              <FoodCategory />
              <FoodCategory />
              <FoodCategory />
            </div>
            <p className="font-extrabold text-xl mt-4">Top Sales</p>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default Profile;
