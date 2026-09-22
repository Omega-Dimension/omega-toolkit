import MainLayout from "../layout/MainLayout/MainLayout";
import Home from "../pages/public/Home";
import About from "../pages/public/About";

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

];