import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { TestService } from '@services/tests.service';

export class TestController {
  public test = Container.get(TestService);

  public getCarotteMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const str = this.test.carotte();

      res.status(200).json({ message: str });
    } catch (error) {
      next(error);
    }
  };
}
