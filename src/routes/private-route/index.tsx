import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  authorizationKey: string | boolean;
  children: ReactNode;
}

function ProtectedRoute({ authorizationKey, children }: ProtectedRouteProps) {
  if (!authorizationKey) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
