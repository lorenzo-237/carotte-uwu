import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { UserController } from '@/controllers/user.controller';
import { NODE_ENV } from '@/config';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public controller = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/me`, AuthMiddleware, this.controller.getMe);
    if (NODE_ENV === 'development') {
      this.router.post(`${this.path}`, this.controller.createUser);
    }
  }
}
