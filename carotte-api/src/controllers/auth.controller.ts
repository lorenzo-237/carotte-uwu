import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { AuthService } from '@services/auth.service';
import { LogInDto } from '@/dtos/auth.dto';

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
}
