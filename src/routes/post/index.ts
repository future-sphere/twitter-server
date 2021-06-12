import { Router } from 'express';
import { createPost, getAllPosts, getPostById } from './controller';

const postRouter = Router();

postRouter.get('/', getAllPosts);
postRouter.get('/:id', getPostById);
postRouter.post('/', createPost);

export default postRouter;
