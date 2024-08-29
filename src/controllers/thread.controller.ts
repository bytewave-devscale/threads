import { Request, Response } from "express";
import * as threadService from "../services/thread.service";
import { ZodError } from "zod";

export async function handleCreateThread(req: Request, res: Response) {
  const { title, content, authData } = req.body;
  const threadData = {
    authorId: authData.userId,
    title,
    content,
  };

  try {
    const newThread = await threadService.createThread(threadData);
    res.status(201).json({ newThread, authData: req.body.authData });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: error.issues[0].message,
        authData: req.body.authData,
      });
    }

    if (error instanceof Error) {
      return res.status(500).json({
        error: error.message,
        authData: req.body.authData,
      });
    }
  }
}

export async function handleGetThreadById(req: Request, res: Response) {
  const threadId = req.params.threadId;
  try {
    const thread = await threadService.getThreadById(threadId);
    res.status(200).json({ thread });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export async function handleGetThreadByAuthor(req: Request, res: Response) {
  const authorId = req.params.authorId;
  try {
    const thread = await threadService.getThreadByAuthor(authorId);
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
  const authorId = req.body.authData.userId;

  const updateData = { ...req.body };
  delete updateData.authData;

  try {
    const updatedThread = await threadService.updateThread(
      threadId,
      authorId,
      updateData
    );
    res
      .status(201)
      .json({ thread: updatedThread, authData: req.body.authData });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        error: error.issues[0].message,
      });
    } else if (error instanceof Error) {
      res
        .status(500)
        .json({ error: error.message, authData: req.body.authData });
    }
  }
}

export async function handleDeleteThread(req: Request, res: Response) {
  const _id = req.params.threadId;
  const authorId = req.body.authData.userId;

  try {
    const deletedThread = await threadService.deleteThread({ _id, authorId });
    res.status(201).json({ deletedThread, authData: req.body.authData });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(400)
        .json({ error: error.message, authData: req.body.authData });
    }
  }
}
