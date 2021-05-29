import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import PostModel from '@schema/Post';

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
