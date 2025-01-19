import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IsDateStringFormat', async: false })
export class IsDateStringFormat implements ValidatorConstraintInterface {
  validate(date: string): boolean {
    // Vérifie si la date correspond au format YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) {
      return false;
    }

    // Vérifie si c'est une date valide
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }

  defaultMessage(): string {
    return 'La date doit être valide et au format YYYY-MM-DD.';
  }
}
