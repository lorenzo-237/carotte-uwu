import { IsString, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  instagram: string;

  @IsString()
  password: string; // Mot de passe à hasher
}
