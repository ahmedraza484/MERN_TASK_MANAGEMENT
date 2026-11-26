import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please provide a valid email"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must have atleast 8 characters!"],
    maxLength: [18, "Password must have execeed 18 characters!"],
    trim: true,
    select: false
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Hash the password
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign(
    {
      id: this._id
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_SECRET_KEY_EXPIRES
    }
  )
}

export const User = mongoose.model("User", userSchema);
