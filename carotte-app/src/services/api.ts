// api.ts
import axios from 'axios';
import { CAROTTE_API_URL } from '@/lib/env';
import { DateAvailability, TimeSlot } from '@/types';
import { CreateAvailabilityDTO, CreateTimeSlotDTO } from '@/components/calendar/dto';

export const createTimeSlot = async (id: number, dto: CreateTimeSlotDTO): Promise<TimeSlot> => {
  const response = await axios.post(
    `${CAROTTE_API_URL}/timeslots`,
    { ...dto, availabilityId: id },
    { withCredentials: true }
  );
  return response.data as TimeSlot;
};

export const createAvailabilityAndTimeslot = async (dto: CreateAvailabilityDTO): Promise<DateAvailability> => {
  const response = await axios.post(
    `${CAROTTE_API_URL}/availabilities/timeslot`,
    { ...dto },
    { withCredentials: true }
  );
  return response.data as DateAvailability;
};

type PrismaAvailability = {
  id: number;
  date: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  timeslots: TimeSlot[];
};

export const getAvailabilities = async (min: string, max: string): Promise<DateAvailability[]> => {
  const response = await axios.get(`${CAROTTE_API_URL}/availabilities?min=${min}&max=${max}`, {
    withCredentials: true,
  });

  const prismaItems = response.data.availabilities as PrismaAvailability[];

  return prismaItems.map((availability) => ({
    ...availability,
    date: new Date(availability.date),
  })) as DateAvailability[];
};
