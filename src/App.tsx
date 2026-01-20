import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes, type RouteItem } from "./routes/routes";

export default function App() {
  function renderRoutes(routeList: RouteItem[]) {
    return routeList.map((r) => (
      <Route path={r.path} element={r.element} key={r.path}>
        {r.children && renderRoutes(r.children)}
      </Route>
    ));
  }

  return (
    <BrowserRouter>
      <Routes>{renderRoutes(routes)}</Routes>
    </BrowserRouter>
  );
}
