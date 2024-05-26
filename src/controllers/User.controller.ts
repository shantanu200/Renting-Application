import { Context, ContextRenderer } from "hono";
import { IUser } from "../interfaces/User.interface";
import {
  createUser,
  deleteUser,
  loginUser,
  updateUser,
} from "../functions/User.function";
import {
  ErrorHandler,
  ServerHandler,
  SuccessHandler,
} from "../handler/Request";
import { IJWtPayload } from "../middleware/auth";
import { createToken } from "../utils/Token";

export const createUserModel = async (c: Context) => {
  try {
    const body = (await c.req.json()) as IUser;

    const userObj = await createUser(body);

    if (userObj && userObj?._id) {
      const token = await createToken({
        _id: String(userObj._id),
        role: "user",
      });

      return SuccessHandler(
        c,
        {
          email: userObj?.email,
          accessToken: token,
        },
        "User Created successfully"
      );
    }

    return ErrorHandler(c, "Unable to create user");
  } catch (error) {
    return ServerHandler(c, error);
  }
};

export const loginUserModel = async (c: Context) => {
  try {
    const body = (await c.req.json()) as IUser;
    const { email, password } = body;

    const { success, message, userObj } = await loginUser(email, password);

    if (success && userObj) {
      const token = await createToken({
        _id: String(userObj._id),
        role: "user",
      });
      return SuccessHandler(
        c,
        {
          email,
          accessToken: token,
          _id: userObj._id,
          role: userObj?.type
        },
        message
      );
    } else {
      return ErrorHandler(c, message);
    }
  } catch (error) {
    return ServerHandler(c, error);
  }
};

export const getUserByTokenModel = async (c: IJWtPayload) => {
  try {
    const { user } = c;

    return user && user._id
      ? SuccessHandler(c, user, "User Details")
      : ErrorHandler(c, "User not found");
  } catch (error) {
    return ServerHandler(c, error);
  }
};

export const updateUserModel = async (c: IJWtPayload) => {
  try {
    const { user } = c;

    if (user && user._id) {
      const body = (await c.req.json()) as IUser;
      const userObj = await updateUser(String(user._id), body);

      return userObj && userObj._id
        ? SuccessHandler(c, userObj, "User Updated")
        : ErrorHandler(c, "Unable to update user");
    } else {
      return ErrorHandler(c, "User not Found");
    }
  } catch (error) {
    return ServerHandler(c, error);
  }
};

export const deleteUserModel = async (c: IJWtPayload) => {
  try {
    const { user } = c;

    if (user && user._id) {
      const body = (await c.req.json()) as IUser;
      const userObj = await deleteUser(String(user._id));
      return userObj
        ? SuccessHandler(c, {}, "User deleted")
        : ErrorHandler(c, "Unable to delete user");
    } else {
      return ErrorHandler(c, "User not Found");
    }
  } catch (error) {
    return ServerHandler(c, error);
  }
};
