import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/Home";

export interface RouteItem {
  path: string;
  element: React.ReactNode;
  children?: RouteItem[];
}

export const routes: RouteItem[] = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [{ path: "", element: <Home /> }],
  },
];
