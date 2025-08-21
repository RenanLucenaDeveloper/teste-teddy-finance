import { Navigate, Outlet } from "react-router";
import { useAuthData } from "../store/authStore";
import Header from "mfeHeaderSidebar/Header";
import Sidebar from "mfeHeaderSidebar/Sidebar";


export function ProtectedLayout() {
  const { isAuthenticated } = useAuthData();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>
    <div className="relative">
      <Header/>
      <Sidebar/>
      <div className="w-full pt-21">
        <Outlet/>
      </div>
    </div>
  </>;
}