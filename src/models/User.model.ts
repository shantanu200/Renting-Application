import mongoose from "mongoose";
import { IUser } from "../interfaces/User.interface";

const UserSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "Please enter firstName"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter lastName"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter phoneNumber"],
    },
    type: {
      type: String,
      enum: ["SELLER", "BUYER"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema) || mongoose.models.User;

export default User;
