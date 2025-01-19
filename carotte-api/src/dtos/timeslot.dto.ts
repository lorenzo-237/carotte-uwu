import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateTimeslotDTO {
  @IsString()
  start: string;

  @IsBoolean()
  booked: boolean;

  @IsInt()
  availabilityId: number;
}

export class UpdateTimeslotDTO {
  @IsBoolean()
  booked: boolean;
}
