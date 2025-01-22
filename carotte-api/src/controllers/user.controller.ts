import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { UserService } from '@/services/user.service';
import { CreateUserDTO } from '@/dtos/user.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class UserController {
  public users = Container.get(UserService);

  public getMe = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ ...req.user });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body = req.body as CreateUserDTO;

      await this.users.createUser(body);

      res.status(201).json({ message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
