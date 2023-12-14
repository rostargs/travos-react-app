import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Spinner from "./ui/Spinner";

type TProtectedRoute = {
  shouldBeAdmin?: boolean;
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<TProtectedRoute> = ({ children, shouldBeAdmin }) => {
  const { isLogged, loading, isAdmin } = useAuth();

  if (loading) return <Spinner />;
  if (!isLogged) return <Navigate to={`/registration/login`} />;
  if (shouldBeAdmin && !isAdmin) throw new Error("You do not have enough rights");
  return children;
};
