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
  return res.status(OK).json(posts);
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
