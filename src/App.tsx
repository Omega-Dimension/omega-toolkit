import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes, type RouteItem } from "./routes/routes";
import { AuthProvider } from "./hooks/useAuth";
import { ModalProvider } from "./hooks/useModal";

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
      <ModalProvider>
        <AuthProvider>
          <Routes>{renderRoutes(routes)}</Routes>
        </AuthProvider>
      </ModalProvider>
    </BrowserRouter>
  );
}
