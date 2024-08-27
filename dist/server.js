"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDb_1 = __importDefault(require("./utils/connectDb"));
const thread_route_1 = __importDefault(require("./routes/thread.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (_, res) => {
    res.status(200).send("thread services - bytewaveForum");
});
app.use("/api/v1/thread", thread_route_1.default);
(0, connectDb_1.default)();
app.listen(process.env.PORT, () => {
    console.log(`server listens to port:${process.env.PORT}`);
});
