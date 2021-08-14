import { Router } from 'express';
import { handleAddFriend } from './controller';

const friendRouter = Router();

friendRouter.post('/', handleAddFriend);

export default friendRouter;
