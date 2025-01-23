export function afficher(date: Date): string {
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long', // Jour de la semaine en toutes lettres
    year: 'numeric', // Année sur 4 chiffres
    month: 'long', // Mois en toutes lettres
    day: 'numeric', // Jour du mois
  });
}

export function afficherJourDeLaSemaine(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: '2-digit' };
  const formattedDate = date.toLocaleDateString('fr-FR', options);

  // Mettre la première lettre en majuscule
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

// time : format HH:MM par exemple 09:00
// return : XXh retourne 9h
export function afficherTime(time: string): string {
  const [hours] = time.split(':'); // Séparer les heures et les minutes
  return `${parseInt(hours, 10)}h`; // Convertir les heures en nombre pour supprimer le zéro initial
}

export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois (0-11) => (1-12)
  const day = String(date.getDate()).padStart(2, '0'); // Jour avec deux chiffres
  return `${year}-${month}-${day}`;
}

export function getMonthBoundaries(date: Date) {
  // Créez une copie de la date pour éviter de modifier l'original
  const firstDayOfMonth = new Date(date);
  firstDayOfMonth.setDate(1); // Définir le jour à 1 pour obtenir le premier jour du mois

  // Créez une copie de la date pour obtenir le dernier jour du mois
  const lastDayOfMonth = new Date(date);
  lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1, 0); // Définir le mois suivant et le jour à 0 pour obtenir le dernier jour du mois actuel

  return {
    firstDayOfMonth,
    lastDayOfMonth,
  };
}
