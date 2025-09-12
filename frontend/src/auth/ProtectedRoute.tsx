import { useAuth } from "./authContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ padding: 24 }}>Checking session…</div>;
  }

  if (!user) return <Navigate to="/login" />;

  return <Outlet />;
};

export default ProtectedRoute;
