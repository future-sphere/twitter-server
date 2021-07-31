import { Router } from 'express';
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  getAllPosts,
  getPostById,
  likeComment,
  likePost,
  unlikePost,
} from './controller';

const postRouter = Router();

postRouter.get('/', getAllPosts);
postRouter.get('/:id', getPostById);
postRouter.post('/', createPost);
postRouter.put('/:postId/like', likePost);
postRouter.put('/:postId/unlike', unlikePost);
postRouter.post('/comment', createComment);
postRouter.put('/:postId/comment/like', likeComment);
postRouter.put('/:postId/comment/unlike', likeComment);
postRouter.delete('/:postId', deletePost);
postRouter.delete('/:postId/comment', deleteComment);

export default postRouter;
