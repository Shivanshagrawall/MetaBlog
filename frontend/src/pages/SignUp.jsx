import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

const SignUp = () => {

  const [formData, setFormData]=useState({
    name:"",
    email:"",
    password:"",
    image:null,
  })

  const naviagate=useNavigate();
  const [loading,setLoading]=useState(false);

  const onChangeHandler=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const fileHandler=(e)=>{
    setFormData({...formData,image:e.target.files[0]});
  }

  const submitHandler=async(e)=>{
    e.preventDefault();
    try {
      const data=new FormData();
      data.append("name",formData.name);
      data.append("email",formData.email);
      data.append("password",formData.password);
      data.append("image",formData.image);
      setLoading(true);
      const res=await axios.post("http://localhost:4000/user/register",data,{
        headers:{
          "Content-Type":"multipart/form-data", 
        }
      });
      if(res.data.success){
        toast.success(res.data.message);
        naviagate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className='w-full bg-pink-200 py-12 mx-auto flex items-center justify-center'>
      <div className='w-full bg-white max-w-md p-5 mx-auto py-6 border-1 border-gray-200 shadow-md'>
        <h1 className='text-lg font-bold text-center text-gray-700 '>Create your Account!</h1>
        <form onSubmit={submitHandler} className='flex flex-col gap-5 w-full'>
          <input onChange={onChangeHandler} name="name" value={formData.name} className='w-full p-2 border border-gray-300 rounded outline-none' type="text" placeholder='Enter Your Name...' required />
          <input onChange={onChangeHandler} name="email" value={formData.email} className='w-full p-2 border border-gray-300 rounded outline-none' type="email" placeholder='Enter Your Email...' required />
          <input onChange={onChangeHandler} name="password" value={formData.password} className='w-full p-2 border border-gray-300 rounded outline-none' type="password" placeholder='Enter Your Password...' required />
          <input onChange={fileHandler} accept='image/*' className='w-full p-2 border border-gray-300 rounded outline-none' type="file" required />
          <button className='bg-orange-600 text-white px-6 py-2 w-full cursor-pointer'>{loading?"Creating":"SignUp"}</button>
        </form>

        <p className='text-center mt-4'>Already have a Account? <Link to={"/login"} className='text-orange-600 cursor-pointer'>Login Here</Link>{" "}</p>
      </div>
    </div>
  )
}

export default SignUp