import React, { useEffect, useState } from 'react';
import BackButton from './BackButton';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import app from '../../firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

function Editmenu({setShowModel2,itemId,setChange}) {
    const [itemname, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [categorys, setCategorys] = useState('');
    const [file, setFile] = useState(null);
    const [cookies] = useCookies(['token']);
    const [userData,setUserData] = useState({});

    useEffect(()=>{
        axios.get('https://restro-27c7.onrender.com/itemdetail', {
      params: {
        value: itemId
      }
    })
    .then((response) => {
        setItemName(response.data.data.productName);
        setPrice(response.data.data.productPrice);
        setCategorys(response.data.data.productCategory);
    })
    .catch((err) => {
      console.log(err);
    });
    },[itemId]);

    useEffect(() => {
      if (cookies.token) {
        const decodedToken = jwtDecode(cookies.token);
  
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

    async function handleUpload(e){
      const img = e.target.files[0];
      if(img){
        const storage = getStorage(app);
        const storageRef = ref(storage,"image/"+img.name);
        await uploadBytes(storageRef,img);
        const downloadUrl = await getDownloadURL(storageRef);
        setFile(downloadUrl);
      }
      else{
        toast.error('Upload img');
      }
  }

    const handleEdit = (event) => {
        event.preventDefault();
        const formData ={
          itemname,
          price,
          categorys,
          file
        }
        axios.put(`https://restro-27c7.onrender.com/menu/${itemId}`, formData)
          .then((response) => {
            toast.success(response.data.message);
            setChange(prevState => !prevState);
            setShowModel2(false);
          })
          .catch((err) => {
            console.log(err);
          });
      };

  return (
    <>
    <div className="flex flex-col rounded-xl w-[90%] p-4 my-10 mx-auto bg-orange-500 opacity-90">
        <div className="flex items-center">
          <BackButton setShowModel={setShowModel2} destination='/admin'/>
          <h1 className="text-xl font-semibold mx-4">Edit Menu Item</h1>
        </div>
        <form onSubmit={handleEdit}>
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
              value={categorys}
              onChange={(e) => setCategorys(e.target.value)}
            >
              {userData.category && userData.category.slice().reverse().map((cat, index) => (
                <option key={index} value={cat.categoryName}>{cat.categoryName}</option>
              ))}
            </select>
          </div>

          <div className="my-3">
            <label className="text-xl text-black mx-2">Item Image</label>
            <input
              type="file"
              onChange={handleUpload} // Handle file change
              className="border-2 border-gray-500 px-4 py-[4px] w-full rounded-xl text-lg focus:outline-none"
              placeholder="Image"
            />
          </div>

          <button
            type="submit"
            className='p-2 bg-zinc-600 w-full my-5 rounded-2xl text-xl font-semibold text-white hover:bg-zinc-700'
          >
            Edit Item
          </button>
        </form>
      </div>
    </>
  )
}

export default Editmenu