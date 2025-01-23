import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { AvailabilityController } from '@/controllers/availability.controller';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { CreateAvailabilityAndTimeslotsDTO, CreateAvailabilityDTO } from '@/dtos/availability.dto';
import { TimeslotController } from '@/controllers/timeslot.controller';
import { CreateTimeslotDTO, UpdateTimeslotDTO } from '@/dtos/timeslot.dto';

export class CalendarRoute implements Routes {
  public pathAvailability = '/availabilities';
  public pathTimeslot = '/timeslots';
  public router = Router();
  public availability = new AvailabilityController();
  public timeslot = new TimeslotController();

  constructor() {
    this.initializeAvailabilitiesRoutes();
    this.initializeTimeslotsRoutes();
  }

  private initializeAvailabilitiesRoutes() {
    this.router.get(`${this.pathAvailability}`, AuthMiddleware, this.availability.getAvailabilities);
    this.router.post(`${this.pathAvailability}`, AuthMiddleware, ValidationMiddleware(CreateAvailabilityDTO), this.availability.createAvailability);
    this.router.post(
      `${this.pathAvailability}/timeslot`,
      AuthMiddleware,
      ValidationMiddleware(CreateAvailabilityAndTimeslotsDTO),
      this.availability.createAvailabilityAndTimeslots,
    );
    this.router.delete(`${this.pathAvailability}/:id`, AuthMiddleware, this.availability.deleteAvailability);
  }

  private initializeTimeslotsRoutes() {
    this.router.post(`${this.pathTimeslot}`, AuthMiddleware, ValidationMiddleware(CreateTimeslotDTO), this.timeslot.createTimeslot);
    this.router.put(`${this.pathTimeslot}/:id`, AuthMiddleware, ValidationMiddleware(UpdateTimeslotDTO), this.timeslot.updateTimeslot);
    this.router.delete(`${this.pathTimeslot}/:id`, AuthMiddleware, this.timeslot.deleteTimeslot);
  }
}
