import { SECRET_KEY } from '@/config';
import { HttpException } from '@/exceptions/httpException';
import { DataStoredInToken, RequestWithUser } from '@/interfaces/auth.interface';
import { PrismaClient } from '@prisma/client';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

const getAuthorization = req => {
  const coockie = req.cookies['Authorization'];
  if (coockie) return coockie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (!Authorization) {
      next(new HttpException(404, 'Authentication token missing'));
      return;
    }
    const { id } = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken;

    const users = new PrismaClient().user;
    const findUser = await users.findUnique({ where: { id } });

    if (!findUser) {
      next(new HttpException(401, 'Wrong authentication token'));
      return;
    }

    req.user = {
      ...findUser,
    };

    next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
