import { Request, Response } from "express";
import * as threadService from "../services/thread.service";
import { ZodError } from "zod";

export async function handleCreateThread(req: Request, res: Response) {
  try {
    const newThread = await threadService.createThread(req.body);
    res.status(201).json({
      message: "thread created succesfully",
      thread: newThread,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "create thread failed",
        error: error.issues[0].message,
      });
    } else {
      res.status(500).json({
        message: "update thread failed",
        error,
      });
    }
  }
}

export async function handleGetOneThread(req: Request, res: Response) {
  const threadId = req.params.threadId;
  try {
    const thread = await threadService.getOneThread(threadId);
    res.status(200).json({ thread });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export async function handleGetAllThread(req: Request, res: Response) {
  try {
    const allThread = await threadService.getAllThread();
    return res.status(200).json({ threads: allThread });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export async function handleUpdateThread(req: Request, res: Response) {
  const threadId = req.params.threadId;

  try {
    const updatedThread = await threadService.updateThread(threadId, req.body);
    res.status(201).json({ thread: updatedThread });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "update thread failed",
        error: error.issues[0].message,
      });
    } else {
      res.status(500).json({ message: "update thread failed", error });
    }
  }
}

export async function handleDeleteThread(req: Request, res: Response) {
  const threadId = req.params.threadId;

  try {
    const deletedThread = await threadService.deleteThread(threadId);
    res
      .status(201)
      .json({ message: "thread deleted successfully", thread: deletedThread });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(400)
        .json({ message: "delete thread failed", error: error.message });
    }
  }
}
