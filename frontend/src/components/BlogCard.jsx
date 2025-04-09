import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({id, title, image, category, author_name, author_image, date}) => {
  return (
    <div className='border-1 border-gray-300 shadow-md p-3 rounded-md'>
        <Link to={`/blog/${id}`}>
        <img src={image} alt="blog image" className='flex items-center justify-center  w-full mx-auto cursor-pointer transform duration-300 hover:scale-105' />
        </Link>
        <p className='text-[#4b6bfb] font-semibold my-3'>{category}</p>
        <h1 className='text-xl font-bold'>{title}</h1>
        <div className='flex gap-3 items-center my-3'>
            <img src={author_image} alt="author image" />
            <p className='text-lg font-bold text-gray-600'>{author_name}</p>
            <p className='text-lg font-bold text-gray-600'>{date}</p>
        </div>
    </div>
  )
}

export default BlogCard