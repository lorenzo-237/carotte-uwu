export type TimeSlot = {
  start: string;
  booked: boolean;
};

export type DateAvailability = {
  date: Date;
  times: TimeSlot[];
};
