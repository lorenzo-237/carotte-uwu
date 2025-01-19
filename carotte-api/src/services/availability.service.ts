import { Service } from 'typedi';
import { prisma } from '@/lib/prisma';
import { CreateAvailabilityDTO } from '@/dtos/availability.dto';
import { parseDateFromYYYYMMDD } from '@/lib/date';
import { HttpException } from '@/exceptions/httpException';

@Service()
export class AvailabilityService {
  public createAvailability(userId: number, dto: CreateAvailabilityDTO) {
    return prisma.availability.create({
      data: {
        date: parseDateFromYYYYMMDD(dto.date),
        userId: userId,
      },
    });
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
}
