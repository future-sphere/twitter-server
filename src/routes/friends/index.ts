import { Router } from 'express';
import { handleAddFriend, handleRemoveFriend } from './controller';

const friendRouter = Router();

friendRouter.post('/', handleAddFriend);
friendRouter.delete('/', handleRemoveFriend);

export default friendRouter;
