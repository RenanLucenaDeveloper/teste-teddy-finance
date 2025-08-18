import { createBrowserRouter, Outlet } from "react-router";

import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import { ProtectedLayout } from "../layouts/protected";
import Clients from "../pages/Clients";


export const router = createBrowserRouter([
  {
    element: <Outlet/>,
    children: [
      { path: "/login", element: <Login /> },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      { path: "/", element: <Clients /> },
      { path: "/clients", element: <Clients /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);