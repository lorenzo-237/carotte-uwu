import { Calendar } from '@/components/ui/calendar';

import { useState } from 'react';
import { fr } from 'date-fns/locale';
import { DayProps } from 'react-day-picker';
import CustomDay from './CustomDay';
import { useCalendar } from '../providers/calendar-provider';
import DialogTimeSlots from './DialogTimeSlots';
import TimeSlotsBoard from './TimeSlotsBoard';
import { cn } from '@/lib/utils';

export default function CalendarApp() {
  const { availabilities, setSelectedDate, selectedDate, month, setMonth, options } = useCalendar();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setDialogOpen(true);
    }
  };

  const handleMonthChange = (date: Date) => {
    setMonth(date);
  };

  return (
    <>
      <div className='flex flex-col items-center gap-6'>
        {!options.hideCalendar && (
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
            hideNavigation={options.hideNavigation}
            month={month}
            onMonthChange={handleMonthChange}
            selected={selectedDate}
            onSelect={handleDateSelect}
            modifiers={{
              booked: availabilities.map((a) => a.date),
            }}
            components={{
              Day: (props: DayProps) => <CustomDay {...props} handleSelection={handleDateSelect} />,
            }}
          />
        )}
        <TimeSlotsBoard className={cn(options.hideCalendar && 'py-4')} />
      </div>
      <DialogTimeSlots open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
