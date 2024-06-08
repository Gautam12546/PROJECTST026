import React from 'react';
import BackButton from './BackButton';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

const Register = ({ setShowModel1 }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [number, setNumber] = useState("");

  const navigate = useNavigate();

  const handleSaveShop = (event) => {
    event.preventDefault();
    if(!email || !password || !shopName || !number){
      return toast.error('Invalid User Data');
    }
    const data = {
      email,
      password,
      shopName,
      number,
    };
    console.log(data);
    axios
      .post("http://localhost:3000/register", data)
      .then((response) => {

          toast.success(response.data.message);
          navigate("/");
        
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <fieldset className="bg-orange-300 w-[90%] flex flex-col justify-center items-center rounded-[20px]">
        <legend className="h-32 w-32 rounded-full bg-black text-center">
          <img
            className="object-cover rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSSXay82N9LNLzTzuSIp2R6grADgY_P42jJw&usqp=CAU"
            alt=""
          />
        </legend>
        <div className="flex justify-start w-[100%]">
          <div className="w-[20%] flex justify-start pl-5">
            <BackButton setShowModel1={setShowModel1} destination="/" />
          </div>
          <div className="flex w-[80%] pl-14">
            <h2 className="text-2xl font-semibold">SignUp</h2>
          </div>
        </div>
        <div className="bg-orange-300 rounded-lg p-8 w-[100%] sm:w-2/3 lg:w-1/3 flex flex-col justify-center">
          <form className="flex flex-col gap-2" onSubmit={handleSaveShop}>
            <input
              type="email"
              placeholder="Email Address"
              className="p-2 border border-gray-400 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="p-2 border border-gray-400 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              name="shopname"
              type="text"
              placeholder="Shop name"
              className="p-2 border border-gray-400 rounded-lg"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
            <input
              name="number"
              type="text"
              placeholder="Contact"
              className="p-2 border border-gray-400 rounded-lg"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <input
              type="submit"
              value="Register"
              className="p-2 mt-4 bg-orange-600 text-white font-semibold rounded-md cursor-pointer"
            />
          </form>
          <p className="text-xs font-semibold text-zinc-500 mt-5 w-4/3 mx-auto text-center">
            By continuing, you agree to Our Terms of Service; Opens a new tab
            and acknowledge you've read our Privacy Policy; Notice at
            collection;
          </p>
          <h2 className="text-center border-1 bg-black-200">Or</h2>
          <div className="flex flex-col mt-4 gap-3">
            <button className="bg-blue-600 cursor-pointer text-white font-semibold px-4 py-2 rounded-md mr-2">
              Register with Google
            </button>
            <button className="bg-blue-900 cursor-pointer text-white font-semibold px-4 py-2 rounded-md mr-2">
              Register with Facebook
            </button>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default Register;
