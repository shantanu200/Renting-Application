import { Context, Next } from "hono";
import { jwt, verify } from "hono/jwt";
import User from "../models/User.model";
import { IUser } from "../interfaces/User.interface";

export interface IJWtPayload extends Context {
  user?: IUser;
}

export const authMiddleware = async (c: IJWtPayload, next: Next) => {
  try {
    const token = c.req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return c.json({
        success: false,
        message: "Please send valid access token",
      });
    }

    const payload = await verify(token, process.env.JWTSECRET!);
    let user;
    if (payload.role === "user") {
      user = await User.findById(payload._id).select("-password");
    }
    c.user = user as IUser;

    return await next();
  } catch (error) {
    return c.json({
      success: false,
      message: "Token expired or invalid",
    });
  }
};
