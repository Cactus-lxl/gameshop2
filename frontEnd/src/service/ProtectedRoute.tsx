import { Navigate } from 'react-router-dom';
import { ProtectedRouteProps } from '@/types';

function ProtectedRoute({ isLoggedIn, children }: ProtectedRouteProps): JSX.Element {
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;