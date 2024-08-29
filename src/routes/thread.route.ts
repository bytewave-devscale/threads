import { Router } from "express";
import * as threadController from "../controllers/thread.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const threadRouter = Router();

threadRouter.get("/", threadController.handleGetAllThread);
threadRouter.get("/:threadId", threadController.handleGetThreadById);
threadRouter.get("/author/:authorId", threadController.handleGetThreadByAuthor);
threadRouter.post("/", authMiddleware, threadController.handleCreateThread);
threadRouter.patch(
  "/:threadId",
  authMiddleware,
  threadController.handleUpdateThread
);
threadRouter.delete(
  "/:threadId",
  authMiddleware,
  threadController.handleDeleteThread
);

export default threadRouter;
