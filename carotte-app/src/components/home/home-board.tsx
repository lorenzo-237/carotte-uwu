import { useAuth } from '../providers/auth-provider';
import CarottSvg from '../../assets/carrot_ttt.svg';

function HomeBoard() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <p className='text-purple-600'>Bienvenue {user.name} !</p>
      <div className='size-52'>
        <img className='rounded-full' src={CarottSvg} alt='image yamato' />
      </div>
      <p className='text-red-500'>La page d'accueil est en construction</p>
    </div>
  );
}

export default HomeBoard;
