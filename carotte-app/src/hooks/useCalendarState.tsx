import { useState } from 'react';
import { CalendarOptions, DateAvailability } from '@/types';
import { useAuth } from '@/components/providers/auth-provider';

export const useCalendarState = () => {
  const { user } = useAuth();

  const [month, setMonth] = useState(new Date());
  const [availabilities, setAvailabilities] = useState<DateAvailability[]>([]);
  const [options, setOptions] = useState<CalendarOptions>({ hideNavigation: false, hideCalendar: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return {
    user,
    month,
    setMonth,
    availabilities,
    setAvailabilities,
    options,
    setOptions,
    loading,
    setLoading,
    error,
    setError,
  };
};
