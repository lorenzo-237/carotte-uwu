import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthController } from '@/controllers/auth.controller';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { LogInDto } from '@/dtos/auth.dto';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public test = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, ValidationMiddleware(LogInDto), this.test.logIn);
    this.router.get(`${this.path}/logout`, AuthMiddleware, this.test.logOut);
  }
}
