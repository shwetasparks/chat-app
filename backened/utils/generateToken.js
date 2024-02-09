import jwt from 'jsonwebtoken';

const generateTokenAndSetCookies= (userId,res)=>{
  const token =jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:'15d',
  });

  res.cookie('jwt',token,{
    maxAge:15*24*60*60*1000, //in ms
    httpOnly:true,  //prevent xss attack cross-site scripting attacks
    sameSite:"strict"  , //protect against csrf attacks
    secure:process.env.NODE.ENV!=="development"
  })
} ;

export default generateTokenAndSetCookies;