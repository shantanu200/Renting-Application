import mongoose from "mongoose";
import { IUser } from "../interfaces/User.interface";
import User from "../models/User.model";

export async function createUser(body: IUser) {
  return await User.create(body);
}

export async function getUserByEmail(email: string) {
  return await User.findOne({ email });
}

export async function getUserById(_id: string) {
  return await User.findById(_id).populate("posts");
}

export async function getUserByPhone(phone: string) {
  return await User.findOne({ phoneNumber: phone });
}

export async function loginUser(email: string, password: string) {
  const userObj = await getUserByEmail(email);

  if (!userObj) {
    return { success: false, message: "User not found" };
  } else if (userObj.password !== password) {
    return { success: false, message: "Incorrect Password is entered" };
  } else {
    return { success: true, message: "User Logged In", userObj };
  }
}

export async function updateUser(id: string, body: IUser) {
  return await User.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    body,
    { new: true }
  );
}

export async function deleteUser(id: string) {
  return await User.findByIdAndDelete(id);
}
