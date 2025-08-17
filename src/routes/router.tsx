import { createBrowserRouter, Outlet } from "react-router";

import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import { ProtectedLayout } from "../layouts/protected";


export const router = createBrowserRouter([
  {
    element: <Outlet/>,
    children: [
      { path: "/login", element: <Login /> },
    ],
  },
  { 
    path: "/", 
    element: <ProtectedLayout /> 
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);