import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { AvailabilityService } from '@/services/availability.service';
import { CreateAvailabilityAndTimeslotsDTO, CreateAvailabilityDTO, FindAvailabilitiesQUERY } from '@/dtos/availability.dto';
import { parseDateFromYYYYMMDD } from '@/lib/date';
import { HttpException } from '@/exceptions/httpException';

export class AvailabilityController {
  public service = Container.get(AvailabilityService);

  public getAvailabilities = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    const query = req.query as unknown as FindAvailabilitiesQUERY;

    // Vérification des paramètres
    if (!query.min || !query.max) {
      next(new HttpException(400, 'Les paramètres "min" et "max" sont requis.'));
      return;
    }

    let min: Date;
    let max: Date;

    try {
      min = parseDateFromYYYYMMDD(query.min);
      max = parseDateFromYYYYMMDD(query.max);
    } catch (error) {
      next(new HttpException(400, `Erreur de format pour "min" ou "max" : ${error.message}`));
      return;
    }

    // Appel du service avec des dates validées
    const availabilities = await this.service.findAvailabilities(req.user.id, min, max);

    res.status(200).json({ availabilities });
  };

  public createAvailability = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateAvailabilityDTO;
      const availability = await this.service.createAvailability(req.user.id, dto);

      res.status(201).json({ ...availability });
    } catch (error) {
      next(error);
    }
  };

  public createAvailabilityAndTimeslots = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateAvailabilityAndTimeslotsDTO;
      const availability = await this.service.createAvailabilityTimeSlots(req.user.id, dto);

      res.status(201).json({ ...availability });
    } catch (error) {
      next(error);
    }
  };

  public deleteAvailability = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = +req.params.id;

      await this.service.deleteAvailability(id, req.user.id);

      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
