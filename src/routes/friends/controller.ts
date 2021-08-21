import { Request, Response } from 'express';
import UserModel from '@schema/User';

export async function handleAddFriend(req: Request, res: Response) {
  const { userId, friendId } = req.body;

  const user = await UserModel.findById(userId).lean();

  if (user?.friends.includes(friendId)) {
    return res.json('This is already a friend');
  }

  await UserModel.findByIdAndUpdate(userId, {
    $push: {
      friends: friendId,
    },
  });

  await UserModel.findByIdAndUpdate(friendId, {
    $push: {
      friends: userId,
    },
  });

  res.json({
    success: true,
  });
}

export async function handleRemoveFriend(req: Request, res: Response) {
  const { userId, friendId } = req.body;

  const user = await UserModel.findById(userId).lean();

  if (user?.friends.includes(friendId)) {
    await UserModel.findByIdAndUpdate(userId, {
      $pull: {
        friends: friendId,
      },
    });
    await UserModel.findByIdAndUpdate(friendId, {
      $pull: {
        friends: userId,
      },
    });
    res.json({ success: true });
  } else {
    res.json('Friend does not exist in user friend list');
  }
}
