import React, { useEffect, useState } from 'react';
import BackButton from './BackButton';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

function Createmenu({ setShowModel, setChange }) {
  const [cookies] = useCookies(['token']);
  const [itemname, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [value, setValue] = useState('');
  const [userData,setUserData] = useState({});

  useEffect(() => {
    if (cookies.token) {
      const decodedToken = jwtDecode(cookies.token);
      setValue(decodedToken.data);
      axios.get('https://restro-27c7.onrender.com/getdata', {
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
    }
  }, [cookies]);

  function handlemenu(event) {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('itemname', itemname);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('file', file);
    formData.append('value', value);

    axios.post("https://restro-27c7.onrender.com/addmenu", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      toast.success(response.data.message);
      setChange(prevState => !prevState);
      setShowModel(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <div className="flex flex-col rounded-xl w-[90%] p-4 my-10 mx-auto bg-orange-500 opacity-90">
        <div className="flex items-center">
          <BackButton setShowModel={setShowModel} destination='/admin'/>
          <h1 className="text-xl font-semibold mx-4">Add Menu Item</h1>
        </div>
        <form onSubmit={handlemenu}>
          <div className="my-3">
            <label className="text-xl text-black mx-2">Item Name</label>
            <input
              type="text"
              value={itemname}
              onChange={(e) => setItemName(e.target.value)}
              className="border-2 border-gray-500 px-4 py-[4px] w-full rounded-xl text-lg focus:outline-none"
              placeholder="Title"
            />
          </div>

          <div className="my-3">
            <label className="text-xl text-black mx-2">Item Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border-2 border-gray-500 px-4 py-[4px] w-full rounded-xl text-lg focus:outline-none"
              placeholder="Price"
            />
          </div>

          <div className="my-3">
            <label className="text-xl text-black mx-2">Category</label>
            <select
              className="category-select border-2 border-gray-500 px-4 py-[4px] w-full rounded-xl text-lg focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>Select category</option>
              {userData.category && userData.category.slice().reverse().map((cat, index) => (
                <option key={index} value={cat.categoryName}>{cat.categoryName}</option>
              ))}
            </select>
          </div>

          <div className="my-3">
            <label className="text-xl text-black mx-2">Item Image</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])} // Handle file change
              className="border-2 border-gray-500 px-4 py-[4px] w-full rounded-xl text-lg focus:outline-none"
              placeholder="Image"
            />
          </div>

          <button
            type="submit"
            className='p-2 bg-zinc-600 w-full my-5 rounded-2xl text-xl font-semibold text-white hover:bg-zinc-700'
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default Createmenu;
