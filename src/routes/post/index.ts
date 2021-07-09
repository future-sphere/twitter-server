import { Router } from 'express';
import {
  createComment,
  createPost,
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

export default postRouter;
