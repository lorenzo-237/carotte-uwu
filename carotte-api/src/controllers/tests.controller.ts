import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { TestService } from '@services/tests.service';
import { UserService } from '@/services/user.service';
import { CreateUserDTO } from '@/dtos/user.dto';

export class TestController {
  public test = Container.get(TestService);
  public users = Container.get(UserService);

  public getCarotteMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const str = this.test.carotte();

      res.status(200).json({ message: str });
    } catch (error) {
      next(error);
    }
  };

  public createElia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body = req.body as CreateUserDTO;

      await this.users.createUser(body);

      res.status(201).json({ message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
