import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext';
import { toast} from 'react-toastify'
const Dashboard = () => {
  const [activeTab,setActiveTab]=useState("list");
  const token=localStorage.getItem("token");
    // const contextValue={blogData,user,loginUser,logoutUser,backendUrl};
    const {blogData,user,loginUser,logoutUser,backendUrl}=useContext(StoreContext);
  const [formData,setFormData]=useState({
    title:"",
    category:"",
    description:"",
    image:null,
  });
  const [blogs,setBlogs]=useState([]);

  const onChangeHandler=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const fileHandler=(e)=>{
    setFormData({...formData,image:e.target.files[0]});
  }

  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    const data=new FormData();
    data.append("title",formData.title);
    data.append("category",formData.category);
    data.append("description",formData.description);
    data.append("image",formData.image);
    try {
      const res=await axios.post(backendUrl+"/blog/create",formData,{
        headers:{
          "Content-Type":"multipart/form-data",
          Authorization:`Bearer ${token}`
        },
      });
      toast.success(res.data.message);
      (formData.title=""),
      (formData.category=""),
      (formData.description=""),
      (formData.image=null);
    } catch (error) {
      console.log("error to create blog",error);
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    const allBlogs=async()=>{
      try {
        const res=await axios.get(backendUrl+'/blog/all',{
          headers:{
            Authorization:`Bearer ${token}`,
          }
        });
        setBlogs(res.data.blogs);
      } catch (error) {
        console.log("error",error);
      }
    }
    allBlogs();
  },[])

  const removeBlog=async(blogId)=>{
    try {
      toast.success("Blog delete sucessfully. Please refresh the page");
      const res=await axios.delete(backendUrl+`/blog/delete/${blogId}`,{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      });
      toast.success(res.data.message);
      setBlogs(blogs.filter((blog)=>blog._id!==blogId));
    } catch (error) {
      console.log("error",error);
    }
  }
  return (
    <div className='flex h-auto'>
      {/* Side Bar */}
      <div className='w-64 border-1 border-gray-300 text-white p-6'>
        <h2 className='text-lg font-semibold mb-6 text-white'>Dashboard</h2>
        <button className={`w-full text-left py-2 px-4 mb-2 rounded ${
          activeTab==="post"?"bg-orange-500":"bg-gray-700"
        }`}
        onClick={()=>setActiveTab("post")}>
          Post a blog
        </button>
        <button className={`w-full text-left py-2 px-4 rounded ${activeTab==="list"?"bg-orange-500":"bg-gray-700"}`}
        onClick={()=>setActiveTab("list")}>
          List of Blogs
        </button>
      </div>

      <div className='flex-1 p-6'>
        {activeTab==="post"?(
          <div>
          <h2 className='text-xl font-bold'>Post a new blog</h2>
          <div className='mt-8'>
            <form onSubmit={onSubmitHandler} className='w-1/2 flex flex-col gap-3'>
              <input name="title" value={formData.title} onChange={onChangeHandler} type="text" placeholder='title' className='border border-gray-300 rounded-md p-2 outline-none w-full'/>
              <input name="category" value={formData.category} onChange={onChangeHandler} type="text" placeholder='category' className='border border-gray-300 rounded-md p-2 outline-none w-full'/>
              <textarea name="description" value={formData.description} onChange={onChangeHandler} type="text" placeholder='description' className='border border-gray-300 rounded-md p-2 outline-none w-full'/>
              <div>
                <label htmlFor="">Choose Image</label>
                <input onChange={fileHandler} type="file" accept="/image/*" className='border border-gray-300 rounded-md p-2 outline-none w-full' />
              </div>
              <button className='bg-black text-white w-full rounded-full border-none cursor-pointer py-2'>Post Blog</button>
            </form> 
          </div>
        </div>
        ):(
          <div className='p-4 h-auto'>
            <h2 className='text-xl font-semibold mb-4'>Lists of Blogs</h2>
            <div className='overflow-x-auto'>
              <table className='min-w-full border border-gray-300'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border px-4 py-2'>Title</th>
                    <th className='border px-4 py-2'>Category</th>
                    <th className='border px-4 py-2'>Image</th>
                    <th className='border px-4 py-2'>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog)=>{
                    return(
                      <tr key={blog._id} className='text-center'>
                      <td className='border px-4 py-2'>{blog.title}</td>
                      <td className='border px-4 py-2'>{blog.category}</td>
                      <td className='border px-4 py-2'>
                        <img src={`http://localhost:4000/images/${blog.image}`} alt={blog.title} 
                        className='w-16 h-16 object-cover mx-auto' />
                      </td>
                      <td className='border px-4 py-2 cursor-pointer' onClick={()=>removeBlog(blog._id)}>
                        X
                      </td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
      </div>
    </div>
  )
}

export default Dashboard