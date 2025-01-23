import { CAROTTE_API_URL } from '@/lib/env';
import { useAuth } from '../providers/auth-provider';

function HomeBoard() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <p className='text-purple-600'>Bienvenue {user.name} !</p>
      <div className='size-52'>
        <img className='rounded-full' src={`${CAROTTE_API_URL}/assets/yamato-profil.jpg`} alt='image yamato' />
      </div>
      <p className='text-red-500'>La page d'accueil est en construction</p>
    </div>
  );
}

export default HomeBoard;
