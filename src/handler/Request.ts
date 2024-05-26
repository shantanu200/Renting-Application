import { Context } from "hono";
import { Error, MongooseError } from "mongoose";

export const SuccessHandler = (c: Context, data: any, message: string) => {
  c.status(200);
  return c.json({
    success: true,
    data,
    message,
  });
};

export const ErrorHandler = (c: Context, message: string) => {
  c.status(404);
  return c.json({
    success: false,
    message,
  });
};

export const ServerHandler = (c: Context, error?: any) => {
  console.error(error);
  c.status(500);
  if (error instanceof Error.ValidationError) {
    const messages = Object.values(error.errors).map((err) => err.message);
    return c.json({
      success: false,
      message: "Validation Error",
      error: messages,
    });
  } else if (error?.code === 11000) {
    return c.json({
      success: false,
      message: "Duplicate key error",
      error: error.keyValue,
    });
  }
  return c.json({
    success: false,
    message: "Internal Server Error",
    error,
  });
};

export const InvalidUserHandler = (c: Context) => {
  c.status(401);
  return c.json({
    success: false,
    message: "You are not authorized to perform this action.",
  });
};
