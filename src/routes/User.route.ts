import { Hono } from "hono";
import {
  createUserModel,
  deleteUserModel,
  getUserByTokenModel,
  loginUserModel,
  updateUserModel,
} from "../controllers/User.controller";
import { loginUser } from "../functions/User.function";
import { authMiddleware } from "../middleware/auth";

const userRouter = new Hono();

userRouter.post("/", createUserModel);

userRouter.post("/login", loginUserModel);

userRouter.use("/details/*", authMiddleware);

userRouter.get("/details", getUserByTokenModel);

userRouter.put("/details", updateUserModel);

userRouter.delete("/details/delete", deleteUserModel);

export default userRouter;
