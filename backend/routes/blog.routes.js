import express from 'express';
import { upload } from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { allBlogs, createBlog, deleteBlog, userBlogs } from '../controllers/blog.controller.js';
const router=express.Router();

router.post("/create",isAuthenticated, upload.single("image"),createBlog);
router.get("/all",allBlogs);
router.delete("/delete/:id",isAuthenticated,deleteBlog);
router.get("/user/blogs",isAuthenticated,userBlogs);

export default router;