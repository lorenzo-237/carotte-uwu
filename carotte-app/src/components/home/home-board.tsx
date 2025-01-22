import { useAuth } from '../providers/auth-provider';

function HomeBoard() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return <div>Bienvenue {user.name} !</div>;
}

export default HomeBoard;
