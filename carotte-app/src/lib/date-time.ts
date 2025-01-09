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
