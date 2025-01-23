import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { AuthService } from '@services/auth.service';
import { LogInDto } from '@/dtos/auth.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class AuthController {
  public auth = Container.get(AuthService);

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = req.body as LogInDto;
      const { cookie, user, token } = await this.auth.logIn(dto);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  };

  // Log out méthode
  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      res.clearCookie('Authorization', {
        path: '/',
      });

      res.status(200).json({ message: 'Successfully logged out' });
    } catch (error) {
      next(error);
    }
  };
}
