const ErrorHandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Assuming "Bearer" is used
    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedToken.id);
        console.log(req.user);
        next();
      } catch (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      }
    }
  }

  // const { token } = req.cookies;

  // console.log('Token:', token);
  // console.log('All Cookies:', req.cookies);

  // if (!token) {
  //   return res.status(400).json({ success: false, message: "You are not Authenticated" });
  // }

  // try {
  //   const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = await User.findById(decodedToken.id);
  //   console.log(req.user);
  //   next();
  // } catch (err) {
  //   return res.status(401).json({ success: false, message: "Invalid token" });
  // }
});

exports.authorizedRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "You are not authenticated.",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You are not authorized.",
      });
    }
    console.log("role", req.user.role);
    next();
  };
};
