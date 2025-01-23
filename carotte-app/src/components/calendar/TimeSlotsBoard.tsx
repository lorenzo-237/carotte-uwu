import { afficherJourDeLaSemaine, afficherTime } from '@/lib/date-time';
import { useCalendar } from '../providers/calendar-provider';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import CrossOverText from './CrossOverText';

function TimeSlotsBoard({ className }: { className?: string }) {
  const { availabilities, setAvailabilities } = useCalendar();

  const sortedAvailabilities = useMemo(
    () => [...availabilities].sort((a, b) => a.date.getTime() - b.date.getTime()),
    [availabilities]
  );

  const handleRemoveTimeSlot = (date: Date, slotToRemove: string) => {
    setAvailabilities((prev) =>
      prev
        .map((availability) => {
          if (availability.date.toDateString() === date.toDateString()) {
            return {
              ...availability,
              timeslots: availability.timeslots.filter((slot) => slot.start !== slotToRemove),
            };
          }
          return availability;
        })
        .filter((availability) => availability.timeslots.length > 0)
    );
  };

  const handleBookedTimeSlot = (date: Date, slotToBook: string) => {
    setAvailabilities((prev) =>
      prev.map((availability) => {
        if (availability.date.toDateString() === date.toDateString()) {
          return {
            ...availability,
            timeslots: availability.timeslots.map((slot) =>
              slot.start === slotToBook ? { ...slot, booked: true } : slot
            ),
          };
        }
        return availability;
      })
    );
  };

  return (
    <div className={cn('w-full max-w-xs text-lg', className)}>
      {sortedAvailabilities.map((availability) => (
        <div key={availability.date.toISOString()} className=''>
          <div className='grid grid-cols-2'>
            <div className=''>
              <h3 className='text-purple-600'>{afficherJourDeLaSemaine(availability.date)}:</h3>
            </div>
            <div className='flex gap-2 justify-end'>
              {availability.timeslots.map((slot, index) => (
                <div key={`${slot}-${index}`} className='font-semibold'>
                  {slot.booked ? (
                    <CrossOverText onClick={() => handleRemoveTimeSlot(availability.date, slot.start)}>
                      <button
                        onClick={() => handleRemoveTimeSlot(availability.date, slot.start)}
                        className='text-purple-700 hover:text-purple-900'
                      >
                        {afficherTime(slot.start)}
                      </button>
                    </CrossOverText>
                  ) : (
                    <button
                      onClick={() => handleBookedTimeSlot(availability.date, slot.start)}
                      className='text-purple-700 hover:text-purple-900'
                    >
                      {afficherTime(slot.start)}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TimeSlotsBoard;
