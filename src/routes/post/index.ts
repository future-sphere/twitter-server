import { Router } from 'express';
import { getAllPosts } from './controller';

const postRouter = Router();

postRouter.get('/', getAllPosts);

export default postRouter;
