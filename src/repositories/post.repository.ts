import { Schema, model } from "mongoose";
import { postInterface, postUpdateInterface } from "../types/post.type";

const postSchema = new Schema({
  authorId: String,
  title: String,
  content: String,
});

const Post = model("Post", postSchema);

export async function createPost(postData: postInterface) {
  const newPost = await new Post(postData).save();
  return newPost;
}

export async function getOnePost(postId: string) {
  const post = await Post.findById(postId);
  return post;
}

export async function getAllPost() {
  const allPost = await Post.find();
  return allPost;
}

export async function updatePost(
  postId: string,
  postData: postUpdateInterface
) {
  const updatedPost = await Post.findOneAndUpdate({ _id: postId }, postData, {
    new: true,
  });
  return updatedPost;
}

export async function deletePost(postId: string) {
  const deletedPost = await Post.findByIdAndDelete(postId);
  return deletedPost;
}
