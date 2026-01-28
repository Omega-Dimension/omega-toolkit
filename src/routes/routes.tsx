import MainLayout from "../layout/MainLayout";
import CsvToExcelPage from "../pages/Files/CsvToExcelPage";
import CsvToJsonPage from "../pages/Files/CsvToJsonPage";
import ExcelToCsv from "../pages/Files/ExcelToCsvPage";
import JsonFormatter from "../pages/Files/JsonFormatterPage";
import JsonToCsvPage from "../pages/Files/JsonToCsvPage";
import Home from "../pages/Home";
import ImageResizePage from "../pages/Images/ImageResize";
import JpgToPng from "../pages/Images/JpgToPngPage";

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
      { path: "/json-csv", element: <JsonToCsvPage /> },
      { path: "/csv-json", element: <CsvToJsonPage /> },
      { path: "/excel-csv", element: <ExcelToCsv /> },
      { path : "/csv-excel", element : <CsvToExcelPage />},
      { path : "/jpg-png", element : <JpgToPng />},
      { path : "/resize-image", element : <ImageResizePage />}
    ],
  },
];
