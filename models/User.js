import mongoose from "mongoose";

export const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30,
      },
      lastName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLengh: 255,
      },
      password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1024,
      },
    },
    { timestamps: true }
  )
);
