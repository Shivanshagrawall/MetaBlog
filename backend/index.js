import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/connectionDb.js";
import userRoutes from './routes/user.routes.js';
import blogRoutes from './routes/blog.routes.js';

dotenv.config();

const app=express();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Hello World");
})

// API endpoint
app.use("/images",express.static("uploads"));
app.use("/user",userRoutes);
app.use("/blog",blogRoutes);

const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})