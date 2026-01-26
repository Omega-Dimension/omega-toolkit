import MainLayout from "../layout/MainLayout";
import JsonFormatter from "../pages/Files/JsonFormatter";
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
    children: [
      { path: "", element: <Home /> },
      { path: "/json-formatter", element: <JsonFormatter /> },
    ],
  },
];
