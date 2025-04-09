import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <div className='w-full bg-pink-200 py-12 mx-auto flex items-center justify-center'>
      <div className='w-full bg-white max-w-md p-5 mx-auto py-6 border-1 border-gray-200 shadow-md'>
        <h1 className='text-lg font-bold text-center text-gray-700 '>Login your Account!</h1>
        <form className='flex flex-col gap-5 w-full'>
          <input className='w-full p-2 border border-gray-300 rounded outline-none' type="email" placeholder='Enter Your Email...' required />
          <input className='w-full p-2 border border-gray-300 rounded outline-none' type="password" placeholder='Enter Your Password...' required />
          <button className='bg-orange-600 text-white px-6 py-2 w-full cursor-pointer'>SignIn</button>
        </form>

        <p className='text-center mt-4'>Don't have a Account? <Link to={"/register"} className='text-orange-600 cursor-pointer'>Register Here</Link>{" "}</p>
      </div>
    </div>
    </div>
  )
}

export default Login