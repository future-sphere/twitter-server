import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import UserModel from '@schema/User';

const { OK } = StatusCodes;

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
