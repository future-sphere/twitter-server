import StatusCodes, { NOT_FOUND } from 'http-status-codes';
import { Request, Response } from 'express';

import { paramMissingError } from '@shared/constants';
import UserModel from '@schema/User';
import jwt from 'jsonwebtoken';
import { NOTFOUND } from 'dns';
const jwtSecret = process.env.JWT_SECRET;

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
 * Get user by username.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getUserByUsername(req: Request, res: Response) {
  if (req.query.username) {
    const users = await UserModel.findOne({
      username: req.query.username as string,
    });
    return res.status(OK).json(users);
  }
  return res.json('Username is missing');
}

/**
 * Get user by token.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getUserByToken(req: Request, res: Response) {
  const { token } = req.body;

  if (!jwtSecret) return res.json(500).json('JWT Secret is undefined');

  if (!token) return res.json(BAD_REQUEST).json('Token was not received.');

  const userId = jwt.verify(token, jwtSecret);

  const user = await UserModel.findById(userId).select(
    '_id username avatar friends'
  );
  return res.status(OK).json(user);
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
  const { username, bio, dob, gender, phone, email, userId } = req.body;
  if (!userId) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      $set: {
        username,
        bio,
        dob,
        gender,
        phone,
        email,
      },
    },
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

/**
 * Get users by user id list
 *
 * @param req
 * @param res
 * @returns
 */
export async function getUsersByIdList(req: Request, res: Response) {
  const { userIdList } = req.query;

  const users = await UserModel.find({
    _id: {
      $in: userIdList,
    },
  });
  return res.status(OK).json(users);
}
