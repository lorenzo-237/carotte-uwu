import { IsDateStringFormat } from '@/validators/IsDateStringFormat';
import { IsArray, IsBoolean, IsString, Validate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAvailabilityDTO {
  @IsString()
  @Validate(IsDateStringFormat, {
    message: 'La date doit être au format YYYY-MM-DD.',
  })
  date: string;
}

export class CreateTimeSlotDirect {
  @IsString()
  start: string;

  @IsBoolean()
  booked: boolean;
}

export class CreateAvailabilityAndTimeslotsDTO {
  @IsString()
  @Validate(IsDateStringFormat, {
    message: 'La date doit être au format YYYY-MM-DD.',
  })
  date: string;

  @ValidateNested({ each: true }) // Valide chaque élément du tableau
  @Type(() => CreateTimeSlotDirect)
  @IsArray() // Vérifie que c'est un tableau
  timeslots: CreateTimeSlotDirect[];
}

export class FindAvailabilitiesQUERY {
  min: string; // YYYY-MM-DD
  max: string; // YYYY-MM-DD
}
