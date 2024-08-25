import { threadInterface, threadUpdateInterface } from "../types/thread.type";
import { z, ZodError } from "zod";
import * as threadRepository from "../repositories/thread.repository";

const threadSchema = z.object({
  authorId: z.string(),
  title: z.string().min(3),
  content: z.string().min(3),
});

const threadUpdateSchema = z
  .object({
    title: z.string().min(3).optional(),
    content: z.string().min(3).optional(),
  })
  .strict();

export async function createThread(data: threadInterface) {
  // validate input using zod
  threadSchema.parse(data);

  const newThread = await threadRepository.createThread(data);
  return newThread;
}

export async function getOneThread(threadId: string) {
  const thread = await threadRepository.getOneThread(threadId);
  if (!thread) throw new Error("thread not found");

  return thread;
}

export async function getAllThread() {
  const allThread = await threadRepository.getAllThread();
  return allThread;
}

export async function updateThread(
  threadId: string,
  threadData: threadUpdateInterface
) {
  // validate input
  threadUpdateSchema.parse(threadData);

  const updatedThread = await threadRepository.updateThread(threadId, threadData);
  return updatedThread;
}

export async function deleteThread(threadId: string) {
  const deletedThread = await threadRepository.deleteThread(threadId);
  if (!deletedThread) throw new Error("thread not found");
  return deletedThread;
}
