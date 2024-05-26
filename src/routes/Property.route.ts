import { Hono } from "hono";
import { CreatePropertyModel, DeletePropertyModel, GetAllPropertiesModel, GetPropertyModel, UpdatePropertyModel, UserAllPropertiesModel } from "../controllers/Property.controller";
import { authMiddleware } from "../middleware/auth";

const propertyRouter = new Hono();

propertyRouter.use("*",authMiddleware)

propertyRouter.post("/",CreatePropertyModel)

propertyRouter.get("/details/:id",GetPropertyModel)

propertyRouter.put("/details/:id",UpdatePropertyModel)

propertyRouter.delete("/details/:id",DeletePropertyModel)

propertyRouter.get("/",GetAllPropertiesModel)

propertyRouter.get("/user",UserAllPropertiesModel)

export default propertyRouter;