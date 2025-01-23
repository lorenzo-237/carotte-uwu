import { createContext, useContext, useEffect } from 'react';
import { DateAvailability, TimeSlot } from '@/types';
import { CreateTimeSlotDTO } from '../calendar/dto';
import { formatDateToYYYYMMDD, getMonthBoundaries } from '@/lib/date-time';
import { CalendarOptions } from '@/types';
import { useCalendarState } from '@/hooks/useCalendarState';
import { createAvailabilityAndTimeslot, createTimeSlot, getAvailabilities } from '@/services/api';
import { handleError } from '@/handler/errorHandler';

type CalendarProviderProps = {
  children: React.ReactNode;
};

type CalendarProviderState = {
  month: Date;
  setMonth: React.Dispatch<React.SetStateAction<Date>>;
  availabilities: DateAvailability[];
  options: CalendarOptions;
  setOptions: React.Dispatch<React.SetStateAction<CalendarOptions>>; // Ajout d'une fonction pour mettre à jour options
  addTimeSlot: (selectedDate: Date, slot: CreateTimeSlotDTO) => void;
  pushTimeSlots: (selectedDate: Date, slots: CreateTimeSlotDTO[]) => void;
  loading: boolean;
  error: string | null;
};

const initialState: CalendarProviderState = {
  month: new Date(),
  setMonth: () => null,
  availabilities: [],
  options: {
    hideNavigation: false,
    hideCalendar: false,
  },
  setOptions: () => null,
  addTimeSlot: () => null,
  pushTimeSlots: () => null,
  loading: false,
  error: null,
};

const CalendarProviderContext = createContext<CalendarProviderState>(initialState);

export function CalendarProvider({ children }: CalendarProviderProps) {
  const {
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
    user,
  } = useCalendarState();

  useEffect(() => {
    const fetchAvailabilities = async () => {
      const data = getMonthBoundaries(month);
      const min = formatDateToYYYYMMDD(data.firstDayOfMonth);
      const max = formatDateToYYYYMMDD(data.lastDayOfMonth);
      setAvailabilities(await getAvailabilities(min, max));
    };
    if (user) {
      fetchAvailabilities();
    }
  }, [user, setAvailabilities, month]);

  const addTimeSlot = async (selectedDate: Date, currentTimeSlot: CreateTimeSlotDTO) => {
    try {
      setLoading(true);
      // Rechercher l'id de la disponibilité existante pour la date sélectionnée
      const availability = availabilities.find((a) => a.date.toDateString() === selectedDate.toDateString());

      const availabilityId = availability?.id;

      if (!availabilityId) {
        // Si aucune disponibilité n'existe pour la date, créer avec le créneau
        const newAvailability = await createAvailabilityAndTimeslot({
          date: formatDateToYYYYMMDD(selectedDate),
          timeslots: [currentTimeSlot],
        });

        setAvailabilities((prev) => [
          ...prev,
          { id: newAvailability.id, date: selectedDate, timeslots: newAvailability.timeslots },
        ]);
      } else {
        // Créer juste le créneau
        const newTimeSlot = await createTimeSlot(availabilityId, {
          start: currentTimeSlot.start,
          booked: currentTimeSlot.booked,
        });

        // Mettre à jour le créneau dans le state
        setAvailabilities((prev) =>
          prev.map((availability) =>
            availability.id === availabilityId
              ? {
                  ...availability,
                  timeslots: [...availability.timeslots, newTimeSlot]
                    .filter(
                      (slot, index, self) => self.findIndex((s) => s.start === slot.start) === index // Évite les doublons
                    )
                    .sort((a, b) => a.start.localeCompare(b.start)), // Trie par ordre croissant
                }
              : availability
          )
        );
      }

      setError(null); // Réinitialise l'erreur en cas de succès
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  const pushTimeSlots = async (selectedDate: Date, newTimeSlots: CreateTimeSlotDTO[]) => {
    try {
      setLoading(true);

      // Rechercher la disponibilité pour la date sélectionnée
      const availability = availabilities.find((a) => a.date.toDateString() === selectedDate.toDateString());
      const availabilityId = availability?.id;

      if (!availabilityId) {
        // Si aucune disponibilité n'existe, en créer une avec les créneaux
        const newAvailability = await createAvailabilityAndTimeslot({
          date: formatDateToYYYYMMDD(selectedDate),
          timeslots: newTimeSlots, // Utiliser le premier créneau comme base
        });

        // Mettre à jour le state avec la nouvelle disponibilité
        setAvailabilities((prev) => [
          ...prev,
          { id: newAvailability.id, date: selectedDate, timeslots: newAvailability.timeslots },
        ]);
      } else {
        // Si une disponibilité existe, ajouter les nouveaux créneaux
        const addedTimeSlots: TimeSlot[] = [];

        for (const slot of newTimeSlots) {
          const newSlot = await createTimeSlot(availabilityId, slot);
          addedTimeSlots.push(newSlot);
        }

        // Mettre à jour le state en ajoutant les nouveaux créneaux
        setAvailabilities((prev) =>
          prev.map((availability) =>
            availability.id === availabilityId
              ? {
                  ...availability,
                  timeslots: [...availability.timeslots, ...addedTimeSlots]
                    .filter(
                      (slot, index, self) => self.findIndex((s) => s.start === slot.start) === index // Évite les doublons
                    )
                    .sort((a, b) => a.start.localeCompare(b.start)), // Trie par ordre croissant
                }
              : availability
          )
        );
      }

      setError(null); // Réinitialise l'erreur en cas de succès
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CalendarProviderContext.Provider
      value={{
        availabilities,
        month,
        setMonth,
        options,
        setOptions,
        addTimeSlot,
        pushTimeSlots,
        error,
        loading,
      }}
    >
      {children}
    </CalendarProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCalendar = () => {
  const context = useContext(CalendarProviderContext);

  if (context === undefined) throw new Error('useCalendar must be used within a CalendarProvider');

  return context;
};
