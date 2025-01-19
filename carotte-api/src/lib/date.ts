export function parseDateFromYYYYMMDD(dateString: string): Date {
  const parsedDate = new Date(dateString);
  if (isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid date format: ${dateString}. Expected format is YYYY-MM-DD.`);
  }
  return parsedDate;
}
