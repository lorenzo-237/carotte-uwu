import { IsDateStringFormat } from '@/validators/IsDateStringFormat';
import { IsString, Validate } from 'class-validator';

export class CreateAvailabilityDTO {
  @IsString()
  @Validate(IsDateStringFormat, {
    message: 'La date doit être au format YYYY-MM-DD.',
  })
  date: string;
}

export class FindAvailabilitiesQUERY {
  min: string; // YYYY-MM-DD
  max: string; // YYYY-MM-DD
}
