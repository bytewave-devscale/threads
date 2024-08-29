import { Schema, model } from "mongoose";
import { threadInterface, threadUpdateInterface } from "../types/thread.type";

const threadSchema = new Schema({
  authorId: String,
  title: String,
  content: String,
});

const threadModel = model("Thread", threadSchema);

export async function createThread(threadData: threadInterface) {
  const newThread = await new threadModel(threadData).save();
  return newThread;
}

// export async function getOneThread(threadId: string) {
//   const thread = await threadModel.find({ _id: threadId });
//   return thread;
// }

// export async function getAllThread() {
//   const allThread = await threadModel.find();
//   return allThread;
// }

export async function getThreads(filter: { _id?: string; authorId?: string }) {
  const threads = await threadModel.find(filter).exec();
  return threads;
}

export async function updateThread(data: {
  _id: string;
  authorId: string;
  updateData: threadUpdateInterface;
}) {
  const { _id, authorId, updateData } = data;

  const updatedThread = await threadModel.findOneAndUpdate(
    { _id, authorId },
    updateData,
    {
      new: true,
    }
  );
  return updatedThread;
}

export async function deleteThread(data: { _id: string; authorId: string }) {
  const { _id, authorId } = data;
  const deletedThread = await threadModel.findOneAndDelete({
    _id,
    authorId,
  });
  return deletedThread;
}
