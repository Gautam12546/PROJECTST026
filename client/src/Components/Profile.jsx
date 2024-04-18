import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa6";
import { MdHome } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import FoodCategory from "./FoodCategory";
import { BsCartCheckFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
const Profile = () => {
  return (
    <div className=" flex items-center justify-center h-screen w-screen bg-slate-700">
      <div className="overflow-hidden h-4/5 w-11/12 rounded-[30px] flex flex-col bg-zinc-600">
        <nav className="h-1/5 font-medium text-yellow-400 flex flex-row text-4xl   items-start justify-between bg-zinc-600 p-6">
          <a className=" cursor-pointer" href="">
            <IoIosArrowBack />
          </a>
          <a className="" href="">
            Profile
          </a>
          <a className="cursor-pointer" href="">
            <FaCartPlus />
          </a>
        </nav>

        <fieldset className="w-full h-screen flex flex-col bg-yellow-500 overflow-scroll">
          <legend className="text-center rounded-full h-40 w-40 overflow-hidden">
            <img
              src="https://images.pexels.com/photos/3714432/pexels-photo-3714432.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="Userprofile Image"
            />
          </legend>

          <div className="w-full gap-8 flex flex-col  items-center bg-yellow-500">
            <div className=" w-full flex flex-col items-center gap-1 ">

              <div className=" items-center justify-center  flex gap-2 flex-row">
                <h2 className="text-3xl font-semibold">Username</h2> <p className="text-2xl">
                <MdEdit />
              </p> </div>
              <p className="text-sm font-semibold text-slate-300">
                description about userfkjfgbjf
              </p>

            </div>

            <div className="w-full  flex flex-row justify-evenly items-center">
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
          </div>

          <div className=" flex flex-col w-full items-center justify-center gap-4 p-8">
            <p className="font-extrabold text-xl">New</p>
            <div className=' flex flex-row items-center gap-3 h-3/6 overflow-hidden'>
         <FoodCategory/> 
         <FoodCategory/>
         <FoodCategory/>
         <FoodCategory/>
         
            </div>
            

            <p className="font-extrabold text-xl">Top Sales</p>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default Profile;
