import React, { useState, useEffect } from 'react'
import BackButton from './BackButton';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { toast } from 'react-toastify';
import app from '../../firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

function CreateCategory({setShowModel2,setChange}) {
    const [itemname , setItemName] = useState('');
    const [file , setFile] = useState(null);
    const [cookies] = useCookies(['token']);
    const [value, setValue] = useState('');

  useEffect(() => {
    if (cookies.token) {
      const decodedToken = jwtDecode(cookies.token);
      setValue(decodedToken.data);
    }
  }, [cookies]);

  async function handleUpload(e){
    const img = e.target.files[0];
    if(img){
      const storage = getStorage(app);
      const storageRef = ref(storage,"image/"+img.name);
      await uploadBytes(storageRef,img);
      const downloadUrl = await getDownloadURL(storageRef);
      console.log(downloadUrl);
      setFile(downloadUrl);
    }
    else{
      toast.error('Upload img');
    }
}

    function handlesubmit(event){
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('itemname', itemname);
        formData.append('file', file);
        formData.append('value', value);

        axios.post("https://restro-27c7.onrender.com/addcategory", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        })
        .then((response) => {
            toast.success(response.data.message);
            setChange(prevState => !prevState);
            setShowModel2(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }

  return (
    <>
    <div className="flex flex-col rounded-xl w-[90%] p-4 my-10 mx-auto bg-orange-500 opacity-90">
        <div className="flex items-center">
          <BackButton setShowModel={setShowModel2} destination='/admin'/>
          <h1 className="text-xl font-semibold mx-4">Add New Category</h1>
        </div>
        <form onSubmit={handlesubmit}>
          <div className="my-3">
            <label className="text-xl text-black mx-2">Category Name</label>
            <input
              type="text"
              value={itemname}
              onChange={(e) => setItemName(e.target.value)}
              className="border-2 border-gray-500 px-4 py-[4px] w-full rounded-xl text-lg focus:outline-none"
              placeholder="Title"
            />
          </div>


          <div className="my-3">
            <label className="text-xl text-black mx-2">Category Image</label>
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
            Add Category
          </button>
        </form>
      </div>
    </>
  )
}

export default CreateCategory