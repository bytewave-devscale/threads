import {
  threadCreateInterface,
  threadUpdateInterface,
} from "../types/thread.type";
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
  .strip();

export async function createThread(data: threadCreateInterface) {
  // replace the author id from json with userId from auth
  data.authorId = data.authData.userId;
  // validate input using zod
  threadSchema.parse(data);

  const newThread = await threadRepository.createThread(data);
  return newThread;
}

export async function getAllThread() {
  const allThread = await threadRepository.getThreads({});
  return allThread;
}

export async function getThreadById(threadId: string) {
  const threads = await threadRepository.getThreads({ _id: threadId });
  if (threads.length === 0) throw new Error("thread not found");

  return threads[0];
}

export async function getThreadByAuthor(authorId: string) {
  const threads = await threadRepository.getThreads({ authorId });
  if (threads.length === 0) throw new Error("thread not found");

  return threads;
}

export async function updateThread(
  threadId: string,
  threadData: threadUpdateInterface
) {
  // validate input
  threadUpdateSchema.parse(threadData);

  const updatedThread = await threadRepository.updateThread(
    threadId,
    threadData
  );

  if (!updatedThread) throw new Error("your thread not found");

  return updatedThread;
}

export async function deleteThread(threadId: string, userId: string) {
  const deletedThread = await threadRepository.deleteThread(threadId, userId);
  if (!deletedThread) throw new Error("your thread not found");
  return deletedThread;
}
