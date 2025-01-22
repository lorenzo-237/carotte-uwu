import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../providers/auth-provider';

function UnAuthRoutes() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
}

export default UnAuthRoutes;
