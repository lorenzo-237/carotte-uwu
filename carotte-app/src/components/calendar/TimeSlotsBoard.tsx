import { afficherJourDeLaSemaine, afficherTime } from '@/lib/date-time';
import { useCalendar } from '../providers/calendar-provider';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import CrossOverText from './CrossOverText';

function TimeSlotsBoard({ className }: { className?: string }) {
  const { availabilities, bookTimeslot, removeTimeslot, options } = useCalendar();

  const sortedAvailabilities = useMemo(
    () => [...availabilities].sort((a, b) => a.date.getTime() - b.date.getTime()),
    [availabilities]
  );

  const filteredAvailabilities = useMemo(
    () =>
      sortedAvailabilities.filter(
        (availability) => !options.hidePastDays || availability.date.getTime() >= new Date().getTime()
      ),
    [sortedAvailabilities, options]
  );

  return (
    <div className={cn('w-full max-w-xs text-lg', className)}>
      {filteredAvailabilities.map((availability) => (
        <div key={availability.date.toISOString()} className=''>
          <div className='grid grid-cols-2'>
            <div className=''>
              <h3 className='text-purple-600'>{afficherJourDeLaSemaine(availability.date)}:</h3>
            </div>
            <div className='flex gap-2 justify-end'>
              {availability.timeslots.map((slot, index) => (
                <div key={`${slot}-${index}`} className='font-semibold'>
                  {slot.booked ? (
                    <CrossOverText onClick={() => removeTimeslot(slot.id)}>
                      <button onClick={() => removeTimeslot(slot.id)} className='text-purple-700 hover:text-purple-900'>
                        {afficherTime(slot.start)}
                      </button>
                    </CrossOverText>
                  ) : (
                    <button onClick={() => bookTimeslot(slot.id)} className='text-purple-700 hover:text-purple-900'>
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
