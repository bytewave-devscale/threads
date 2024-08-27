import { Schema, model } from "mongoose";
import { threadInterface, threadUpdateInterface } from "../types/thread.type";

const threadSchema = new Schema({
  authorId: String,
  title: String,
  content: String,
});

const Thread = model("Thread", threadSchema);

export async function createThread(threadData: threadInterface) {
  const newThread = await new Thread(threadData).save();
  return newThread;
}

export async function getOneThread(threadId: string) {
  const thread = await Thread.findById(threadId);
  return thread;
}

export async function getAllThread() {
  const allThread = await Thread.find();
  return allThread;
}

export async function updateThread(
  threadId: string,
  threadData: threadUpdateInterface
) {
  const updatedThread = await Thread.findOneAndUpdate(
    { _id: threadId, authorId: threadData.authData.userId },
    threadData,
    {
      new: true,
    }
  );
  return updatedThread;
}

export async function deleteThread(threadId: string, userId:string) {
  const deletedThread = await Thread.findOneAndDelete({_id:threadId, authorId:userId})
  return deletedThread;
}
