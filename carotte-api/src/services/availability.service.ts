import Container, { Service } from 'typedi';
import { prisma } from '@/lib/prisma';
import { CreateAvailabilityAndTimeslotsDTO, CreateAvailabilityDTO } from '@/dtos/availability.dto';
import { parseDateFromYYYYMMDD } from '@/lib/date';
import { HttpException } from '@/exceptions/httpException';

import { TimeslotService } from './timeslot.service';

@Service()
export class AvailabilityService {
  public timeslot = Container.get(TimeslotService);

  public async createAvailability(userId: number, dto: CreateAvailabilityDTO) {
    const find = await this.findByUserIdAndDate(userId, dto.date);

    if (find) {
      throw new HttpException(403, 'La disponibilité existe déjà.');
    }

    return prisma.availability.create({
      data: {
        date: parseDateFromYYYYMMDD(dto.date),
        userId: userId,
      },
    });
  }

  public async createAvailabilityTimeSlots(userId: number, dto: CreateAvailabilityAndTimeslotsDTO) {
    const find = await this.findByUserIdAndDate(userId, dto.date);

    if (find) {
      throw new HttpException(403, 'La disponibilité existe déjà.');
    }

    await prisma.$transaction(async prismaTransaction => {
      const availability = await prismaTransaction.availability.create({
        data: {
          date: parseDateFromYYYYMMDD(dto.date),
          userId: userId,
        },
      });

      // Créez les créneaux horaires associés
      await prismaTransaction.timeslot.createMany({
        data: dto.timeslots.map(slot => ({
          start: slot.start,
          booked: slot.booked,
          availabilityId: availability.id,
        })),
      });
    });

    return this.findByUserIdAndDate(userId, dto.date, true);
  }

  public findAvailabilities(userId: number, min: Date, max: Date) {
    return prisma.availability.findMany({
      where: {
        userId,
        AND: {
          date: {
            gte: min, // "Greater than or equal to"
            lte: max, // "Less than or equal to"
          },
        },
      },
      include: {
        timeslots: true,
      },
    });
  }

  async deleteAvailability(availabilityId: number, userId: number) {
    const find = await prisma.availability.findUnique({
      where: {
        id: availabilityId,
      },
    });

    if (!find) {
      throw new HttpException(404, 'Not Found');
    }

    if (find.userId !== userId) {
      throw new HttpException(401, 'Impossible');
    }

    await prisma.availability.delete({
      where: {
        id: availabilityId,
      },
    });
  }

  public findByUserIdAndDate(userId: number, date: string, withTimeslot?: boolean) {
    return prisma.availability.findUnique({
      where: {
        userId_date: {
          userId,
          date: parseDateFromYYYYMMDD(date),
        },
      },
      include: {
        timeslots: withTimeslot,
      },
    });
  }
}
