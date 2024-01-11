const User = require("../models/userModel")

// sending a token and storing in cookies


const sendToken = (user , statusCode , res)=>{

    const token = user.getJWTToken();
console.log("Token:", token); // Add this line to check the generated token

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly : true,
    }

const response = res.status(statusCode).cookie("token" , token , options);
    console.log("Response Headers:", response._headers);

    res.status(statusCode).cookie("token" , token , options).json({
        success : true,
        user,
        token

    })
}


module.exports = sendToken;