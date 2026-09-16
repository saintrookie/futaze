import { Navigate, useLocation } from 'react-router-dom';
import { useSession } from '@entities/user';
import { Container } from '@shared/ui/primitives/Layout';
import { ErrorState } from '@shared/ui/patterns/ErrorState';

export function RequireAuth({ children }) {
  const { user } = useSession();
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
}

export function RequireRole({ role, children }) {
  const { user } = useSession();
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  const allowed = role === 'creator' ? user.isCreator : role === 'admin' ? user.isAdmin : true;
  if (!allowed) {
    return (
      <Container className="py-4xl">
        <ErrorState type="permission" title="You don't have access to this area" description="This section is only available to accounts with the right permissions." />
      </Container>
    );
  }
  return children;
}
