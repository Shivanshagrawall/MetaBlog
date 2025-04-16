import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'

const BlogCard = ({id, title, image, category, author_name, author_image, date}) => {
  const {backendUrl}=useContext(StoreContext)
  return (
    <div className='border-1 border-gray-300 shadow-md p-3 rounded-md'>
        <Link to={`/blog/${id}`}>
        <img src={backendUrl+`/images/${image}`} alt="blog image" className='flex items-center justify-center  w-full mx-auto cursor-pointer transform duration-300 hover:scale-105' />
        </Link>
        <p className='text-[#4b6bfb] font-semibold my-3'>{category}</p>
        <h1 className='text-xl font-bold'>{title}</h1>
        <div className='flex gap-3 items-center my-3'>
            <img className='w-8 h-8 rounded-full'
             src={backendUrl+`/images/${author_image}`} alt="author image" />
            <p className='text-lg font-bold text-gray-600'>Author {author_name}</p>
            {/* <p className='text-lg font-bold text-gray-600'>
              {new Date(date).toLocaleDateString("en-US",{
                month:"long",
                day:"2-digit",
                year:"numeric",
              })}
            </p> */}
        </div>
    </div>
  )
}

export default BlogCard