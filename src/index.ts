import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { config } from "dotenv";
import { connectMongoDB } from "./config/db";
import userRouter from "./routes/User.route";
import propertyRouter from "./routes/Property.route";
config();

const app = new Hono();

app.get("/health", (c) => {
  return c.html("<h1>OK!</h1>");
});

app.route("/user", userRouter);
app.route("/property",propertyRouter)

const port = 9000;

connectMongoDB();
console.log(`Renting application running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
