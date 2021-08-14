import { Router } from 'express';
import {
  getAllUsers,
  addOneUser,
  updateOneUser,
  deleteOneUser,
  getUserByToken,
  getUserByUsername,
} from './controller';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/username', getUserByUsername);
userRouter.post('/', addOneUser);
userRouter.put('/', updateOneUser);
userRouter.delete('/:id', deleteOneUser);
userRouter.post('/token', getUserByToken);
export default userRouter;
