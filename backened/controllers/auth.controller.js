/*
registers a new user by validating input, 
checking for existing users, generating profile picture 
URLs based on gender, saving the user to the database,
 and responding with user details or an error message.

*/
import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import generateTokenAndSetCookies from '../utils/generateToken.js';


export const signup = async (req,res)=>{

  try {
    //destructure
    const{ fullName,userName,password,confirmPassword,gender} =req.body;

    //password matches
    if(password!==confirmPassword){
      return res.status(400).json({error:"password don't match"})
    }
 
     // Check if a user with the provided userName already exists
    const existingUser = await User.findOne({userName});

    if(existingUser){
      return res.status(400).json({error:"username already exists"});
    }

    //hash password
    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);


    // https://avatar.iran.liara.run/

 // Generate profile picture URLs based on gender
    const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${userName}`
    const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${userName}`


// Create a new user object
const newUser = new User({
  fullName,
  userName,
  password:hashedPassword,
  gender,
  profilePic:gender === "male" ? boyProfilePic : girlProfilePic 
});

  // Save the new user to the database
if(newUser){
  //generate jwt token for the new user and save it in cookie
 generateTokenAndSetCookies (newUser._id,res);
  await newUser.save();

  res.status(201).json({
    _id: newUser._id,
    fullName:newUser.fullName,
    userName:newUser.userName,
    profilePic:newUser.profilePic,
    gender,
    password:hashedPassword,
  
  })
}
else{
  res.status(400).json({error:"invalid user data"})
}
 
  } catch (error) {
    console.log("Error in signup", error.message);
    res.status(500).json({
      error:"internal server error here"
    })
  }
};

/************************************************************************************** */


//signup
export const login = async (req,res)=>{
  try {
    const {userName,password}= req.body;
    const user= await User.findOne({userName});
    const isPasswordCorrect= await bcrypt.compare(password,user?.password||"");

    if(!user||isPasswordCorrect){
      return res.status(400).json({error:"invalid username or password"})
    }
generateTokenAndSetCookies(user._id,res);
res.status(200).json({
  _id: user._id,
  fullName:user.fullName,
  userName:user.userName,
  profilePic:user.profilePic,
});

  } catch (error) {
    console.log("Error in signup", error.message);
    res.status(500).json({
      error:"internal server error here"
    })
  }
};
             


//logout
export const logout = (req,res)=>{
  try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"logged out successfully"})
    
  } catch (error) {
    console.log("Error in logout", error.message);
    res.status(500).json({
      error:"internal server error here"
    })
    
  }
};
