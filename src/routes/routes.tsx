import MainLayout from "../layout/MainLayout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import DashboardHomePage from "../pages/Dashboard/DashboardHomePage";

import { toolRoutes } from "./toolRoutes";

export interface RouteItem {
  path?: string;        
  index?: boolean;     
  element: React.ReactNode;
  children?: RouteItem[];
}
export const routes: RouteItem[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      ...toolRoutes,
      { path: "about-us", element: <About /> },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardHomePage /> },
      ...toolRoutes,
    ],
  },
];