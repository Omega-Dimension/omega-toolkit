import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes, type RouteItem } from "./routes/routes";
import { AuthProvider } from "./hooks/useAuth";

export default function App() {
  function renderRoutes(routeList: RouteItem[]) {
    return routeList.map((r, index) => {
      if (r.index) {
        return <Route index element={r.element} key={`index-${index}`} />;
      }

      return (
        <Route path={r.path} element={r.element} key={r.path ?? index}>
          {r.children && renderRoutes(r.children)}
        </Route>
      );
    });
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>{renderRoutes(routes)}</Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
