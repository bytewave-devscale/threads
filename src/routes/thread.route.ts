import { Router } from "express";
import * as threadController from "../controllers/thread.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const threadRouter = Router();

threadRouter.post("/", authMiddleware, threadController.handleCreateThread);
threadRouter.get("/all", threadController.handleGetAllThread);
threadRouter.get("/:threadId", threadController.handleGetOneThread);
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
