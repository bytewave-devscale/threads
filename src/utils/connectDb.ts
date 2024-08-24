import mongoose from "mongoose";

export default async function connectDb() {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    console.log("DB connected");
  } catch (error) {
    if (error instanceof Error) {
      console.error("DB connection failed", error);
    }
  }
}
