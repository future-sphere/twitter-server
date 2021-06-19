import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import UserModel from '@schema/User';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const jwtSecret = process.env.JWT_SECRET;

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

/**
 * User Login
 *
 * @param req
 * @param res
 * @returns
 */
export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    if (!username) {
      throw 'Missing username';
    }

    if (!password) {
      throw 'Missing Password';
    }

    if (!jwtSecret) {
      throw 'Secret is missing';
    }

    const user = await UserModel.findOne({
      username,
    });

    if (!user) {
      throw 'User is not found';
    }

    // const isPasswordMatch = bcrypt.compareSync(password, user.password);
    const isPasswordMatch = password === user.password;

    if (!isPasswordMatch) {
      throw 'Password is incorrect';
    }
    const signed = jwt.sign(String(user._id), jwtSecret);
    return res.status(OK).json(signed);
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .end(typeof error === 'string' ? error : 'Something is wrong');
  }
}

/**
 * User Register
 *
 * @param req
 * @param res
 * @returns
 */
export async function register(req: Request, res: Response) {
  const { phone, password, username, avatar, email, friends, gender } =
    req.body;

  try {
    if (!username) {
      throw 'missing username';
    }

    if (!password) {
      throw 'missing password';
    }

    const hashedPassword = bcrypt.hashSync(password);

    const user = await UserModel.create({
      username,
      password: hashedPassword,
      phone,
      avatar,
      email,
      friends,
      gender,
    });
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .end(typeof error === 'string' ? error : 'Something is wrong');
  }
}
