import { Router } from "express";
import * as postController from "../controllers/post.controller";

const postRouter = Router();

postRouter.post("/", postController.handleCreatePost);
postRouter.get("/all", postController.handleGetAllPost);
postRouter.get("/:postId", postController.handleGetOnePost);
postRouter.patch("/:postId", postController.handleUpdatePost);
postRouter.delete("/:postId", postController.handleDeletePost);

export default postRouter;
