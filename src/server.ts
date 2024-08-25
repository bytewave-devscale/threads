import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/connectDb";
import threadRouter from "./routes/thread.route";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).send("thread services - bytewaveForum");
});
app.use("/api/v1/thread", threadRouter);

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`server listens to port:${process.env.PORT}`);
});
