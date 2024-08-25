import { Router } from "express";
import * as threadController from "../controllers/thread.controller";

const threadRouter = Router();

threadRouter.post("/", threadController.handleCreateThread);
threadRouter.get("/all", threadController.handleGetAllThread);
threadRouter.get("/:threadId", threadController.handleGetOneThread);
threadRouter.patch("/:threadId", threadController.handleUpdateThread);
threadRouter.delete("/:threadId", threadController.handleDeleteThread);

export default threadRouter;
