// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (err: any, setError: React.Dispatch<React.SetStateAction<string | null>>) => {
  setError(err.response?.data?.message || 'Une erreur est survenue.');
  throw err.response?.data?.message || 'Une erreur est survenue.';
};
