import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../middlewares/errorMiddleware.js";
import { User } from "../models/user.model.js";

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
export { register };
