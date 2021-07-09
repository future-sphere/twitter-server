import StatusCodes, { BAD_REQUEST } from 'http-status-codes';
import { Request, Response } from 'express';

import PostModel from '@schema/Post';
import UserModel from '@schema/User';
import shortid from 'shortid';

const { OK } = StatusCodes;

/**
 * Get all posts.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getAllPosts(req: Request, res: Response) {
  const posts = await PostModel.find({}).sort({ _id: -1 });
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
  const post = await PostModel.create({ author, title, likedBy: [] });
  return res.status(OK).json(post);
}

/**
 * Like a post by id.
 *
 * @param req
 * @param res
 * @returns
 */
export async function likePost(req: Request, res: Response) {
  const { userId } = req.body;
  const { postId } = req.params;
  if (!postId || !userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .end('Post ID and User ID cannot be empty');
  }
  const currentPost = await PostModel.findById(postId).select('likedBy');
  if (currentPost?.likedBy.includes(userId)) {
    // has already liked it
    return res.status(StatusCodes.BAD_REQUEST).end('You have liked this post');
  }
  const post = await PostModel.findByIdAndUpdate(
    postId,
    {
      $push: {
        // $pull: {likedBy: userId}
        likedBy: userId,
      },
    },
    {
      new: true,
    }
  );

  return res.status(OK).json(post);
}

/**
 * Unlike a post by id.
 *
 * @param req
 * @param res
 * @returns
 */
export async function unlikePost(req: Request, res: Response) {
  const { userId } = req.body;
  const { postId } = req.params;
  if (!postId || !userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .end('Post ID and User ID cannot be empty');
  }
  const currentPost = await PostModel.findById(postId).select('likedBy');
  if (currentPost?.likedBy.includes(userId)) {
    // has already liked it
    const post = await PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: {
          // $pull: {likedBy: userId}
          likedBy: userId,
        },
      },
      {
        new: true,
      }
    );

    return res.status(OK).json(post);
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .end('You have not liked this post, therefore you cannot unlike it.');
  }
}

/**
 * Create comment
 *
 * @param req
 * @param res
 * @returns
 */

export async function createComment(req: Request, res: Response) {
  const { userId, text, postId } = req.body;
  const newComment = {
    userId,
    text,
    createdAt: new Date(),
    likedBy: [],
    commentId: shortid.generate(),
  };

  const post = await PostModel.findByIdAndUpdate(
    postId,
    {
      $push: {
        comments: newComment,
      },
    },
    {
      new: true,
    }
  );

  return res.status(OK).json(post);
}

/**
 * Like comment
 *
 * @param req
 * @param res
 * @returns
 */

export async function likeComment(req: Request, res: Response) {
  const { userId, commentId } = req.body;
  const { postId } = req.params;
  const found = await PostModel.findById(postId);

  let commentIndex = -1;
  found?.comments.forEach((v, i) => {
    if (v.commentId === commentId) {
      commentIndex = i;
    }
  });

  if (commentIndex > -1) {
    const post = await PostModel.findByIdAndUpdate(
      postId,
      {
        $push: {
          [`comments.${commentIndex}.likedBy`]: userId,
        },
      },
      { new: true }
    );

    return res.json(post);
  }
}
