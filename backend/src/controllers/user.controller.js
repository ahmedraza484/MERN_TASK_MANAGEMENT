import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../middlewares/errorMiddleware.js";
import { User } from "../models/user.model.js";



const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  res.status(statusCode)
    .cookie('userToken', token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true
    })
    .json({
      success: true,
      message,
      user,
      token
    })
}

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ApiError("All fields are required", 400));
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return next(new ApiError("User already registered", 409));
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  return res.status(201).json({
    success: true,
    message: "User registered successfully!",
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(new ApiError("All fields are required!", 400))
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ApiError("Invalid email or password", 401))
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ApiError("Invalid email or password", 401))
  }
  generateToken(user, "User logged In successfully!", 200, res)

})

export { register, login };
