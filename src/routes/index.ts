import { Router } from 'express';
import userRouter from '@routes/user';
import authRouter from '@routes/auth';
import postRouter from '@routes/post';

const baseRouter = Router();

baseRouter.use('/auth', authRouter);
baseRouter.use('/user', userRouter);
baseRouter.use('/post', postRouter);

export default baseRouter;
