import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";

export interface RouteItem {
  path: string;
  element: React.ReactNode;
  children?: RouteItem[];
}

export const routes: RouteItem[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "", element: <Home /> }],
  },
];
