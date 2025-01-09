'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { afficher } from '@/lib/date-time';
// import { cn } from '@/lib/utils';
import { useState } from 'react';
import { fr } from 'date-fns/locale';
import { DayProps } from 'react-day-picker';
import CustomDay from './calendar/CustomDay';

type TimeSlot = {
  start: string;
  end: string;
};

type DateAvailability = {
  date: Date;
  timeSlots: TimeSlot[];
};

export default function AvailabilityScheduler() {
  const [availabilities, setAvailabilities] = useState<DateAvailability[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTimeSlot, setCurrentTimeSlot] = useState<TimeSlot>({ start: '09:00', end: '10:00' });

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const endTimeOptions = timeOptions.filter((time) => {
    const [startHour] = currentTimeSlot.start.split(':').map(Number);
    const [endHour] = time.split(':').map(Number);
    return endHour > startHour;
  });

  const handleStartTimeChange = (value: string) => {
    const [newStartHour] = value.split(':').map(Number);
    const [currentEndHour] = currentTimeSlot.end.split(':').map(Number);

    setCurrentTimeSlot((prev) => ({
      start: value,
      end: currentEndHour <= newStartHour ? `${(newStartHour + 1).toString().padStart(2, '0')}:00` : prev.end,
    }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setDialogOpen(true);
    }
  };

  const handleAddTimeSlot = () => {
    if (!selectedDate) return;

    setAvailabilities((prev) => {
      const existingDateIndex = prev.findIndex((a) => a.date.toDateString() === selectedDate.toDateString());

      if (existingDateIndex >= 0) {
        const updated = [...prev];
        updated[existingDateIndex] = {
          ...updated[existingDateIndex],
          timeSlots: [...updated[existingDateIndex].timeSlots, currentTimeSlot],
        };
        return updated;
      }

      return [...prev, { date: selectedDate, timeSlots: [currentTimeSlot] }];
    });
  };

  const handleRemoveTimeSlot = (date: Date, slotToRemove: TimeSlot) => {
    setAvailabilities((prev) =>
      prev
        .map((availability) => {
          if (availability.date.toDateString() === date.toDateString()) {
            return {
              ...availability,
              timeSlots: availability.timeSlots.filter(
                (slot) => slot.start !== slotToRemove.start || slot.end !== slotToRemove.end
              ),
            };
          }
          return availability;
        })
        .filter((availability) => availability.timeSlots.length > 0)
    );
  };

  return (
    <div className='container mx-auto py-4'>
      <h1 className='text-xl font-bold text-center'>@Carotte.ttt</h1>
      <div className='flex flex-col items-center gap-6'>
        <Calendar
          mode='single'
          locale={fr}
          labels={{
            labelWeekNumber: (weekNumber) => `Semaine ${weekNumber}`,
            labelNext: () => 'Mois suivant',
            labelPrevious: () => 'Mois précédent',
            labelMonthDropdown: () => 'Sélectionner le mois',
            labelYearDropdown: () => "Sélectionner l'annnée",
          }}
          showOutsideDays={false}
          weekStartsOn={1}
          numberOfMonths={1}
          selected={selectedDate}
          onSelect={handleDateSelect}
          modifiers={{
            booked: availabilities.map((a) => a.date),
          }}
          components={{
            Day: (props: DayProps) => <CustomDay {...props} handleSelection={handleDateSelect} />,
          }}
        />

        <div className='w-full max-w-2xl'>
          {availabilities.map((availability) => (
            <div key={availability.date.toISOString()} className='mb-4 p-4 border rounded-lg'>
              <h3 className='font-semibold mb-2'>{afficher(availability.date)}</h3>
              <div className='flex flex-wrap gap-2'>
                {availability.timeSlots.map((slot, index) => (
                  <div
                    key={`${slot.start}-${slot.end}-${index}`}
                    className='flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full'
                  >
                    <span>
                      {slot.start} - {slot.end}
                    </span>
                    <button
                      onClick={() => handleRemoveTimeSlot(availability.date, slot)}
                      className='text-red-500 hover:text-red-700'
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un créneau horaire</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <Select value={currentTimeSlot.start} onValueChange={handleStartTimeChange}>
                <SelectTrigger>
                  <SelectValue placeholder='Début' />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span>à</span>
              <Select
                value={currentTimeSlot.end}
                onValueChange={(value) => setCurrentTimeSlot((prev) => ({ ...prev, end: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Fin' />
                </SelectTrigger>
                <SelectContent>
                  {endTimeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddTimeSlot}>Ajouter ce créneau</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
