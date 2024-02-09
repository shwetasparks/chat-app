import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from './db/connecttoMongoDB.js';
import messageRoutes from "./routes/message.routes.js";
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/user.routes.js"

const app=express();
const PORT = process.env.PORT||5000;

dotenv.config();

app.use(express.json());  //sets up middleware to parse incoming JSON requests.
app.use(cookieParser())
// app.get("/",(req,res)=>{
//   res.send("hello world")
// });

//middleware
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/users",userRoutes);


// app.get("/api/auth/signup", (req, res) => {
//   // You can send a response or redirect to another page
//   res.send("hello world ,this is working");
// });

app.listen(PORT,()=> {
  connectToMongoDB();
  console.log(`server is running at port ${PORT}`
  )
})
