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
const corsOptions = {
    origin: 'https://meta-blog-frontend-chi.vercel.app', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  };
  
  // Use CORS middleware
  app.use(cors(corsOptions));
  
app.use(cors());
await connectDB();

app.get("/",(req,res)=>{
    res.send("Hello World!!!");
})

// API endpoint
app.use("/images",express.static("uploads"));
app.use("/user",userRoutes);
app.use("/blog",blogRoutes);

const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


// const corsConfig = {
//     origin: '',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
// }
// app.use(cors(corsConfig));
// app.options("", cors(corsConfig));


// // index.js
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDB } from "./config/connectionDb.js";
// import userRoutes from "./routes/user.routes.js";
// import blogRoutes from "./routes/blog.routes.js";

// dotenv.config();

// const app = express();

// // Middleware for parsing JSON
// app.use(express.json());

// // Configure CORS settings
// const corsConfig = {
//   origin: "", // Set this to the allowed origin (e.g., "https://yourdomain.com")
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"]
// };
// app.use(cors(corsConfig));
// app.options("", cors(corsConfig));

// // Flag to indicate if the database is connected
// let isDBConnected = false;

// // Attempt to connect to the database asynchronously.
// // If the connection fails, ensure you catch the error and log it.
// connectDB()
//   .then(() => {
//     isDBConnected = true;
//     console.log("Database connected successfully.");
//   })
//   .catch((error) => {
//     console.error("Database connection failed:", error);
//   });

// // Middleware to hold requests until the DB connection is ready.
// app.use((req, res, next) => {
//   if (!isDBConnected) {
//     return res
//       .status(503)
//       .send("Database is not connected yet, please try again later.");
//   }
//   next();
// });

// // Basic route to test server
// app.get("/", (req, res) => {
//   res.send("Hello World!!!");
// });

// // Serve static files (ensure the 'uploads' directory exists)
// app.use("/images", express.static("uploads"));

// // API endpoints
// app.use("/user", userRoutes);
// app.use("/blog", blogRoutes);

// // IMPORTANT: Do NOT call app.listen() when deploying as a serverless function.
// // Instead, export the Express app so Vercel can handle the server instantiation.
// export default app;