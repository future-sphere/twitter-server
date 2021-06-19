import { Router } from 'express';
import { getAllUsers, login, register } from './controller';

const authRouter = Router();

authRouter.get('/', getAllUsers);

authRouter.post('/login', login);

authRouter.post('/register', register);

export default authRouter;
