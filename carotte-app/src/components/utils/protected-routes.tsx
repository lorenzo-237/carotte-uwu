import { Outlet, Navigate } from 'react-router';
import AppNavigation from '../navigation/app-navigation';
import { useAuth } from '../providers/auth-provider';
import Loading from './loading';

function ProtectedRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to='/login' />;
  }

  return (
    <AppNavigation>
      <Outlet />
    </AppNavigation>
  );
}

export default ProtectedRoutes;
