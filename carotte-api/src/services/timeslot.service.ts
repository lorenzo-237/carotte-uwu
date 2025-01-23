import { Service } from 'typedi';
import { prisma } from '@/lib/prisma';
import { CreateTimeslotDTO } from '@/dtos/timeslot.dto';
import { HttpException } from '@/exceptions/httpException';

@Service()
export class TimeslotService {
  async createTimeslot(data: CreateTimeslotDTO) {
    const { start, booked, availabilityId } = data;

    // Vérifier que l'Availability existe
    const availability = await prisma.availability.findUnique({
      where: { id: availabilityId },
    });

    if (!availability) {
      throw new Error('Availability not found');
    }

    const find = await this.findByAvailabilityAndStart(availabilityId, start);

    if (find) {
      throw new Error('Le créneau existe déjà.');
    }

    // Créer le Timeslot
    return prisma.timeslot.create({
      data: {
        start,
        booked,
        availabilityId,
      },
    });
  }

  async setBooked(timeslotId: number, value: boolean) {
    try {
      return await prisma.timeslot.update({
        where: {
          id: timeslotId,
        },
        data: {
          booked: value,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(404, 'Not Found');
      } else {
        throw new HttpException(500, error);
      }
    }
  }

  async deleteTimeslot(timeslotId: number, userId: number) {
    const findTimeslot = await prisma.timeslot.findUnique({
      where: {
        id: timeslotId,
      },
      include: {
        availability: true,
      },
    });

    if (!findTimeslot) {
      throw new HttpException(404, 'Not Found');
    }

    if (findTimeslot.availability.userId !== userId) {
      throw new HttpException(401, 'Impossible');
    }

    await prisma.timeslot.delete({
      where: {
        id: timeslotId,
      },
    });
  }

  public findByAvailabilityAndStart(availabilityId: number, start: string) {
    return prisma.timeslot.findUnique({
      where: {
        availabilityId_start: {
          availabilityId,
          start,
        },
      },
    });
  }
}
