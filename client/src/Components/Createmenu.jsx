import React from 'react'
import BackButton from './BackButton'

function Createmenu({setShowModel}) {
  return (
    <div>
      <div className="flex flex-col rounded-xl w-[90%] p-4 my-10 mx-auto bg-yellow-500 opacity-90">
        <div className="flex items-center">
          <BackButton setShowModel={setShowModel}/>
          <h1 className="text-xl font-semibold mx-4">Add Menu Item</h1>
        </div>

        <div className="my-3">
          <label className="text-xl text-black mx-2">Item Name</label>
          <input
            type="text"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-[3px] w-full rounded-xl text-lg focus:outline-none "
            placeholder="Title"
          />
        </div>

        <div className="my-3">
          <label className="text-xl text-black mx-2">Item Price</label>
          <input
            type="number"
            // value={author}
            // onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-[3px] w-full rounded-xl text-lg focus:outline-none "
            placeholder="Author"
          />
        </div>

        <div className="my-3">
          <label className="text-xl text-black mx-2">Item Image</label>
          <input
            type='file'
            // value={publishYear}
            // onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-[3px] w-full rounded-xl text-lg focus:outline-none "
            placeholder="Publish Year"
          />

        </div>

        <button className=' p-2 bg-zinc-600 w-full my-5 rounded-2xl text-xl font-semibold text-white' onClick={()=>{
          setShowModel(false);
        }}>
          Add Item
        </button>
      </div>
    </div>
  )
}

export default Createmenu