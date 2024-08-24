import { postInterface, postUpdateInterface } from "../types/post.type";
import { z, ZodError } from "zod";
import * as postRepository from "../repositories/post.repository";

const postSchema = z.object({
  authorId: z.string(),
  title: z.string().min(3),
  content: z.string().min(3),
});

const postUpdateSchema = z
  .object({
    title: z.string().min(3).optional(),
    content: z.string().min(3).optional(),
  })
  .strict();

export async function createPost(data: postInterface) {
  // validate input using zod
  postSchema.parse(data);

  const newPost = await postRepository.createPost(data);
  return newPost;
}

export async function getOnePost(postId: string) {
  const post = await postRepository.getOnePost(postId);
  if (!post) throw new Error("post not found");

  return post;
}

export async function getAllPost() {
  const allPost = await postRepository.getAllPost();
  return allPost;
}

export async function updatePost(
  postId: string,
  postData: postUpdateInterface
) {
  // validate input
  postUpdateSchema.parse(postData);

  const updatedPost = await postRepository.updatePost(postId, postData);
  return updatedPost;
}

export async function deletePost(postId: string) {
  const deletedPost = await postRepository.deletePost(postId);
  if (!deletedPost) throw new Error("post not found");
  return deletedPost;
}
