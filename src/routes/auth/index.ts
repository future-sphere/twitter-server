import { Router } from 'express';
import { getAllUsers } from './controller';

const authRouter = Router();

authRouter.get('/', getAllUsers);

export default authRouter;
