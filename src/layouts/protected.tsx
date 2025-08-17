import { Navigate, Outlet } from "react-router";
import { useAuthData } from "../store/auth";


export function ProtectedLayout() {
  const { isAuthenticated } = useAuthData();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>
    <div className="w-full pt-21">
      <Outlet/>
    </div>
  </>;
}