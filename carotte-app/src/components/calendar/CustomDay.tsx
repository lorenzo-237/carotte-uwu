import { cn } from '@/lib/utils';
import { DayProps } from 'react-day-picker';
import './CustomDay.css';

const cell =
  'inline-flex items-center justify-center rounded-md text-sm h-9 w-9 gap-2 whitespace-nowrap p-0 font-normal';

const cellEffect =
  'day-container focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring aria-selected:opacity-100';

export type CustomDayProps = DayProps & {
  handleSelection: (date: Date | undefined) => void;
};

const CustomDay = ({ day, modifiers, handleSelection }: CustomDayProps) => {
  if (modifiers.outside) {
    return <td className={cn(cell, 'invisible')}></td>;
  }

  return (
    <td className={cn(cell, cellEffect)}>
      <button
        className={cn(
          'h-8 w-8',
          'transition-colors ease-in-out delay-100 rounded-full day-button',
          modifiers.booked && 'bg-gradient-to-tr from-purple-300 to-purple-500 text-white rounded-full'
        )}
        onClick={() => handleSelection(day.date)}
      >
        {day.date.getDate()}
      </button>
    </td>
  );
};

export default CustomDay;
