import { CreateTimeslotDTO, UpdateTimeslotDTO } from '@/dtos/timeslot.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { TimeslotService } from '@/services/timeslot.service';
import { Request, Response, NextFunction } from 'express';

export class TimeslotController {
  private service: TimeslotService;

  constructor() {
    this.service = new TimeslotService();
  }

  public createTimeslot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body as CreateTimeslotDTO;

      // Créer le Timeslot
      const timeslot = await this.service.createTimeslot(data);

      res.status(201).json({ ...timeslot });
    } catch (error) {
      next(error);
    }
  };

  public updateTimeslot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = +req.params.id;
      const data = req.body as UpdateTimeslotDTO;

      const timeslot = await this.service.setBooked(id, data.booked);

      res.status(201).json({ ...timeslot });
    } catch (error) {
      next(error);
    }
  };

  public deleteTimeslot = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = +req.params.id;

      await this.service.deleteTimeslot(id, req.user.id);

      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
