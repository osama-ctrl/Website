const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendEmail");

// Set up Multer for image upload

exports.registeruser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Email already exists
      return res.status(400).json({ error: "Email already exists" });
    }

    if (password.length < 8) {
      // Password is too short
      return res
        .status(401)
        .json({ error: "Password should be at least 8 characters" });
    }

    // Check if an avatar was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an avatar" });
    }

    // Create a new user with the provided name, email, and password
    const user = await User.create({
      name,
      email,
      password,
      role,
      avatar: {
        data: req.file.buffer, // Store the binary image data
        contentType: req.file.mimetype, // Set the MIME type of the image
      },
    });

    // You can generate a token and send it as a response
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      message: "Interval Server Error. Please try later",
    });
  }
};

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter email and password", 400));
  }
  if (!role) {
    return next(new ErrorHandler("Please Enter a role", 400));
  }

  // Find a user that matches the provided email and role
  const user = await User.findOne({ email, role }).select("+password");

  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }

  // Ensure that user is an instance of the User model
  if (user instanceof User) {
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Password or email", 401));
    }

    sendToken(user, 200, res);
  } else {
    return res.status(404).json({
      message: "User Not Found",
    });
  }
});

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.clearCookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(201).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

exports.forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Not Found", 401));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}"//${req.get(
    "host"
  )}/api/v1/password/token/${resetToken}`;

  const message = `Your Password Reset Token is :- /n/n ${resetPasswordUrl} /n/n if you have not request this email please ignore it /n/n Thnak You!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Reset",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Mail sent to ${user.email} Successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExipre = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler("Mail could not be sent", 500));
  }
});
