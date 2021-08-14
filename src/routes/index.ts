import { Router } from 'express';
import userRouter from '@routes/user';
import authRouter from '@routes/auth';
import postRouter from '@routes/post';
import friendsRouter from '@routes/friends';

const baseRouter = Router();

baseRouter.use('/auth', authRouter);
baseRouter.use('/user', userRouter);
baseRouter.use('/posts', postRouter);
baseRouter.use('/friends', friendsRouter);

export default baseRouter;
