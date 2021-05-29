import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import { paramMissingError } from '@shared/constants';
import UserModel from '@schema/User';

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/**
 * Get all users.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getAllUsers(req: Request, res: Response) {
  const users = await UserModel.find({});
  return res.status(OK).json(users);
}

/**
 * Add one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function addOneUser(req: Request, res: Response) {
  const { user } = req.body;
  if (!user) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  await UserModel.create(user);
  return res.status(CREATED).end();
}

/**
 * Update one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function updateOneUser(req: Request, res: Response) {
  const { userId, field, value } = req.body;
  if (!userId) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { $set: { [field]: value } },
    { new: true }
  );
  return res.status(OK).json(updatedUser);
}

/**
 * Delete one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function deleteOneUser(req: Request, res: Response) {
  const { userId } = req.params;
  await UserModel.findByIdAndDelete(userId);
  return res.status(OK).end();
}
