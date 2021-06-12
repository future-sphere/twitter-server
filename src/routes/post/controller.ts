import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import PostModel from '@schema/Post';
import UserModel from '@schema/User';

const { OK } = StatusCodes;

/**
 * Get all posts.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getAllPosts(req: Request, res: Response) {
  const posts = await PostModel.find({});
  const result = [];
  for (let i = 0; i < posts.length; i++) {
    const authorId = posts[i].author;
    const author = await UserModel.findById(authorId);
    const postObject = posts[i].toJSON();
    result.push({
      ...postObject,
      author,
      createdAt: posts[i]._id.getTimestamp(),
    });
  }
  return res.status(OK).json(result);
}

/**
 * Get post by id.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getPostById(req: Request, res: Response) {
  const { id } = req.params;
  const post = await PostModel.findById(id);
  const author = await UserModel.findById(post?.author);
  return res.status(OK).json({
    _id: post?._id,
    title: post?.title,
    authorName: author?.username,
    authorAvatar: author?.avatar,
  });
}

/**
 * Create post with author and title.
 *
 * @param req
 * @param res
 * @returns
 */
export async function createPost(req: Request, res: Response) {
  const { author, title } = req.body;
  const post = await PostModel.create({ author, title });
  return res.status(OK).json(post);
}
