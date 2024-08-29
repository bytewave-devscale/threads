import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/connectDb";
import threadRouter from "./routes/thread.route";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  res.status(200).send("thread services - bytewaveForum");
});
app.use("/api/v1/thread", threadRouter);

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`server listens to port:${process.env.PORT}`);
});
