import MainLayout from "../layout/MainLayout";
import Base64ToolPage from "../pages/Dev/Base64ToolPage";
import HashGeneratorPage from "../pages/Dev/HashGeneratorPage";
import CsvToExcelPage from "../pages/Files/CsvToExcelPage";
import CsvToJsonPage from "../pages/Files/CsvToJsonPage";
import ExcelToCsv from "../pages/Files/ExcelToCsvPage";
import JsonFormatter from "../pages/Files/JsonFormatterPage";
import JsonToCsvPage from "../pages/Files/JsonToCsvPage";
import Home from "../pages/Home";
import Base64ToImagePage from "../pages/Images/Base64ToImagePage";
import FaviconGeneratorPage from "../pages/Images/FaviconGeneratorPage";
import ImageCropPage from "../pages/Images/ImageCropPage";
import ImageResizePage from "../pages/Images/ImageResize";
import ImageToBase64Page from "../pages/Images/ImageToBase64Page";
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
      { path: "/file/json-formatter", element: <JsonFormatter /> },
      { path: "/file/json-csv", element: <JsonToCsvPage /> },
      { path: "/file/csv-json", element: <CsvToJsonPage /> },
      { path: "/file/excel-csv", element: <ExcelToCsv /> },
      { path: "/file/csv-excel", element: <CsvToExcelPage /> },

      { path: "/image/jpg-png", element: <JpgToPng /> },
      { path: "/image/resize-image", element: <ImageResizePage /> },
      { path: "/image/favicon-generator", element: <FaviconGeneratorPage /> },
      { path: "/image/image-crop", element: <ImageCropPage /> },
      { path : "/image/image-base64", element : <ImageToBase64Page />},
      { path : "/image/base64-image", element : <Base64ToImagePage />},


      {path : "/dev/hash-generator", element : <HashGeneratorPage />},
      {path : "/dev/base64-tool", element : <Base64ToolPage />},
    ],
  },
];
