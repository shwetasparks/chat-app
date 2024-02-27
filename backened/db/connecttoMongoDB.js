//connect to mongoose


import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
    
  
    });
    console.log("connected to mongodb");
  } catch (error) {
    console.log("error in connecting to mongodb", error.message);
  }
};

// Call the connectToMongoDB function here
connectToMongoDB();

export default connectToMongoDB;
