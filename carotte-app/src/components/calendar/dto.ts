export type CreateTimeSlotDTO = {
  start: string;
  booked: boolean;
};

export type CreateAvailabilityDTO = {
  date: string;
  timeslots: CreateTimeSlotDTO[];
};
