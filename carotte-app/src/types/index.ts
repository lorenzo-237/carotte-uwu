export type User = {
  id: number;
  email: string;
  name: string;
  instagram: string;
  createdAt: string;
  updatedAT: string;
};

export type CalendarOptions = {
  hideNavigation: boolean;
  hideCalendar: boolean;
  hidePastDays: boolean;
};

export type TimeSlot = {
  id: number;
  start: string;
  booked: boolean;
};

export type DateAvailability = {
  id: number;
  date: Date;
  timeslots: TimeSlot[];
};
