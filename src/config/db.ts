import mongoose from "mongoose";
export const connectMongoDB = async () => {
  const URI = process.env.MONGO_URI!;
  try {
    const conn = await mongoose.connect(URI);
    if (conn) {
      console.log("Application is connected to MongoDB");
    }
  } catch (error) {
    console.error(error);
  }
};
