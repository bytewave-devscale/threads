import { Request, Response } from "express";
import * as postService from "../services/post.service";
import { ZodError } from "zod";

export async function handleCreatePost(req: Request, res: Response) {
  try {
    const newPost = await postService.createPost(req.body);
    res.status(201).json({
      message: "post created succesfully",
      post: newPost,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "create post failed",
        error: error.issues[0].message,
      });
    } else {
      res.status(500).json({
        message: "update post failed",
        error,
      });
    }
  }
}

export async function handleGetOnePost(req: Request, res: Response) {
  const postId = req.params.postId;
  try {
    const post = await postService.getOnePost(postId);
    res.status(200).json({ post });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export async function handleGetAllPost(req: Request, res: Response) {
  try {
    const allPost = await postService.getAllPost();
    return res.status(200).json({ posts: allPost });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export async function handleUpdatePost(req: Request, res: Response) {
  const postId = req.params.postId;

  try {
    const updatedPost = await postService.updatePost(postId, req.body);
    res.status(201).json({ post: updatedPost });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "update post failed",
        error: error.issues[0].message,
      });
    } else {
      res.status(500).json({ message: "update post failed", error });
    }
  }
}

export async function handleDeletePost(req: Request, res: Response) {
  const postId = req.params.postId;

  try {
    const deletedPost = await postService.deletePost(postId);
    res
      .status(201)
      .json({ message: "post deleted successfully", post: deletedPost });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(400)
        .json({ message: "delete post failed", error: error.message });
    }
  }
}
