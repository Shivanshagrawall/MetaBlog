import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext';

const SingleBlog = () => {
  const {id}=useParams();
  const {blogData}=useContext(StoreContext);
  const blog=blogData.find((b)=>b._id===id);
  return (
    <div className='rounded-md border-1 border-gray-200 p-5 max-w-3xl flex flex-col gap-3 items-center justify-center mx-auto py-8'>
      <img className='transition-transform duration-300 hover:scale-105' src={`http://localhost:4000/images/${blog.image}`} alt="blog image" />
      <p className='text-2xl font-bold'>{blog.title}</p>
      <p className='text-[#4b6bfb]'>{blog.category}</p>
      <p>{blog.description}</p>
      <div className='flex gap-2 items-center justify-center'>
        <p className='text-lg font-bold'>Author: {blog.author.name}</p>
        <img className='w-8 h-8 rounded-full' src={`http://localhost:4000/images/${blog.author.image}`} alt="author image" />
      </div>
      <p>{" "}
      {new Date(blog.createdAt).toLocaleDateString("en-US",{
                month:"long",
                day:"2-digit",
                year:"numeric",
              })}
      </p>
    </div>
  )
}

export default SingleBlog