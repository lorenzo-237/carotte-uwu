import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogProps } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useCalendar } from '../providers/calendar-provider';
import { Separator } from '../ui/separator';
import { Plus } from 'lucide-react';
import { afficherTime } from '@/lib/date-time';
import { CreateTimeSlotDTO } from './dto';
import { useToast } from '@/hooks/use-toast';

export type DialogTimeSlotsProps = DialogProps & {
  selectedDate?: Date;
};

const timeOptions = Array.from({ length: 11 }, (_, i) => {
  const hour = (9 + i).toString().padStart(2, '0'); // Génère 9 à 19
  return `${hour}:00`;
});

const initialTime: CreateTimeSlotDTO = {
  start: '10:00',
  booked: false,
};

const slotsToAdd: CreateTimeSlotDTO[] = [
  { start: '10:00', booked: false },
  { start: '14:00', booked: false },
];

const favorites = [
  {
    id: 1,
    slots: slotsToAdd,
  },
];

const DialogTimeSlots: React.FC<DialogTimeSlotsProps> = (props) => {
  const { addTimeSlot, pushTimeSlots } = useCalendar();
  const { toast } = useToast();

  const [currentTimeSlot, setCurrentTimeSlot] = useState<CreateTimeSlotDTO>(initialTime);

  const handleStartTimeChange = (value: string) => {
    setCurrentTimeSlot({
      start: value,
      booked: false,
    });
  };

  const handleAddTimeSlot = async () => {
    if (!props.selectedDate) {
      alert("Veuillez sélectionner une date avant d'ajouter un créneau.");
      return;
    }

    try {
      await addTimeSlot(props.selectedDate, currentTimeSlot);

      if (props.onOpenChange) {
        props.onOpenChange(false);
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: '' + error,
      });
    }
  };

  const handleAddFavoritesSlots = (slots: CreateTimeSlotDTO[]) => {
    if (!props.selectedDate) {
      alert("Veuillez sélectionner une date avant d'ajouter des créneaux.");
      return;
    }
    pushTimeSlots(props.selectedDate, slots);
    if (props.onOpenChange) {
      props.onOpenChange(false);
    }
  };

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un créneau horaire</DialogTitle>
          <DialogDescription></DialogDescription>
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
          </div>
          <Button onClick={handleAddTimeSlot}>Ajouter ce créneau</Button>
          <Separator />
          <h4 className='text-normal font-semibold'>Créneaux préférés</h4>

          {favorites.map((fav) => (
            <div key={fav.id} className='flex items-center gap-2'>
              {fav.slots.map((slot) => (
                <span key={slot.start} className='font-semibold text-purple-700'>
                  {afficherTime(slot.start)}
                </span>
              ))}
              <Button
                size='icon'
                className='rounded-full'
                onClick={() => {
                  handleAddFavoritesSlots(slotsToAdd);
                }}
              >
                <Plus />
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogTimeSlots;
