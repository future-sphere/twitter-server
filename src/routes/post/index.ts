import { Router } from 'express';
import { getAllPosts, getPostById } from './controller';

const postRouter = Router();

postRouter.get('/', getAllPosts);
postRouter.get('/:id', getPostById);

export default postRouter;
