import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/connectDb";
import postRouter from "./routes/post.router";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).send("post services - bytewaveForum");
});
app.use("/api/v1/post", postRouter);

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`server listens to port:${process.env.PORT}`);
});
