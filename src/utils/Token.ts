import { sign } from "hono/jwt";
import { config } from "dotenv";

config();

export const createToken = async (payload: { _id: string; role: string }) => {
  const secret = process.env.JWTSECRET!;
  const token = await sign(payload, secret);
  return token;
};
