import { createContext, useContext, useState } from 'react';
import { DateAvailability, TimeSlot } from '../calendar/types';

type CalendarProviderProps = {
  children: React.ReactNode;
};

type CalendarOptions = {
  hideNavigation: boolean;
  hideCalendar: boolean;
};

type CalendarProviderState = {
  month: Date;
  setMonth: React.Dispatch<React.SetStateAction<Date>>;
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  availabilities: DateAvailability[];
  setAvailabilities: React.Dispatch<React.SetStateAction<DateAvailability[]>>;
  options: CalendarOptions;
  setOptions: React.Dispatch<React.SetStateAction<CalendarOptions>>; // Ajout d'une fonction pour mettre à jour options
  addTimeSlot: (slot: TimeSlot) => void;
  pushTimeSlots: (slots: TimeSlot[]) => void;
};

const initialState: CalendarProviderState = {
  month: new Date(),
  setMonth: () => null,
  selectedDate: undefined,
  setSelectedDate: () => null,
  availabilities: [],
  setAvailabilities: () => null,
  options: {
    hideNavigation: false,
    hideCalendar: false,
  },
  setOptions: () => null, // Initialisation de setOptions
  addTimeSlot: () => null,
  pushTimeSlots: () => null,
};

const CalendarProviderContext = createContext<CalendarProviderState>(initialState);

export function CalendarProvider({ children }: CalendarProviderProps) {
  const [month, setMonth] = useState(new Date()); // Par défaut, le mois actuel
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availabilities, setAvailabilities] = useState<DateAvailability[]>([]);
  const [options, setOptions] = useState<CalendarOptions>({ hideNavigation: false, hideCalendar: false }); // Gestion des options

  const addTimeSlot = (currentTimeSlot: TimeSlot) => {
    if (!selectedDate) {
      alert("Veuillez sélectionner une date avant d'ajouter un créneau.");
      return;
    }

    setAvailabilities((prev) => {
      const index = prev.findIndex((a) => a.date.toDateString() === selectedDate.toDateString());

      if (index >= 0) {
        const updated = [...prev];

        updated[index] = {
          ...updated[index],
          times: [...updated[index].times, currentTimeSlot]
            .filter((time, index, self) => self.findIndex((t) => t.start === time.start) === index) // Évite les doublons
            .sort((a, b) => a.start.localeCompare(b.start)), // Trie par ordre croissant,
        };

        return updated;
      }

      return [...prev, { date: selectedDate, times: [currentTimeSlot] }];
    });
  };

  const pushTimeSlots = (newTimeSlots: TimeSlot[]) => {
    if (!selectedDate) {
      alert("Veuillez sélectionner une date avant d'ajouter des créneaux.");
      return;
    }

    setAvailabilities((prev) => {
      const index = prev.findIndex((a) => a.date.toDateString() === selectedDate.toDateString());

      if (index >= 0) {
        const updated = [...prev];

        updated[index] = {
          ...updated[index],
          times: [...updated[index].times, ...newTimeSlots]
            .filter((time, index, self) => self.findIndex((t) => t.start === time.start) === index) // Évite les doublons
            .sort((a, b) => a.start.localeCompare(b.start)), // Trie par ordre croissant
        };

        return updated;
      }

      return [...prev, { date: selectedDate, times: [...newTimeSlots] }];
    });
  };

  return (
    <CalendarProviderContext.Provider
      value={{
        availabilities,
        setAvailabilities,
        selectedDate,
        setSelectedDate,
        month,
        setMonth,
        options,
        setOptions,
        addTimeSlot,
        pushTimeSlots,
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
