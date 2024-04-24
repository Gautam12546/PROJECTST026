import React from 'react'

const Register = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
        <fieldset className='bg-orange-300 w-[90%] flex flex-col justify-center items-center rounded-[20px]'>
          <legend className='h-32 w-32 rounded-full bg-black text-center'><img className=' object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSSXay82N9LNLzTzuSIp2R6grADgY_P42jJw&usqp=CAU" alt="" /></legend>
          <h2 className="text-2xl font-semibold">Signup to see more</h2>
          <div className="bg-orange-300 rounded-lg p-8 w-[100%] sm:w-2/3 lg:w-1/3 flex flex-col justify-center">

            <form className="flex flex-col gap-2" action="">
              <input type="email" placeholder="Email Address" className="p-2 border border-gray-400 rounded-lg" />
              <input name="password" type="password" placeholder="Password" className="p-2 border border-gray-400 rounded-lg" />
              <input name="shopname" type="text" placeholder="Shop name" className="p-2 border border-gray-400 rounded-lg" />
              <input name="number" type="text" placeholder="Contact" className="p-2 border border-gray-400 rounded-lg" />
              <input
                type="submit"
                value="Register"
                className="p-2 mt-4 bg-orange-600 text-white font-semibold rounded-md cursor-pointer"
              />
            </form>
            <p className='text-xs font-semibold text-zinc-500 mt-5 w-4/3 mx-auto text-center'>By continuing, you agree to Our Terms of Service; Opens a new tab and acknowledge you've read our Privacy Policy; Notice at collection;
            </p>
             <h2 className='text-center border-1 bg-black-200'>Or</h2>
            <div className="flex flex-col  mt-4 gap-3">
              {/* Google Login Button */}
              <button className="bg-blue-600 cursor-pointer text-white font-semibold px-4 py-2 rounded-md mr-2">
                Register with Google
              </button>
              {/* Facebook Login Button */}
              <button className="bg-blue-900 cursor-pointer text-white font-semibold px-4 py-2 rounded-md mr-2">
                Register with Facebook
              </button>
            </div>

          </div>
        </fieldset>
      </div>
  )
}

export default Register
