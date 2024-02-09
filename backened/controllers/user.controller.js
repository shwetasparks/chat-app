
import User from "../models/user.model.js";

export const getUsersForSidebar= async(req,res)=>{
  try {
    const loggedInUserId=req.user._id

    const filteredUsers =await User.find({
      _id:{$ne:loggedInUserId}     // _id:{$ne:loggedInUserId} to avoid ourselves from
    }).select("-password");
    
    res.status(200).json(filteredUsers);
  
  } catch (error) {
    console.log("error:",error.message)
    res.status(500).json({error: "internal server errror"})
  }
}