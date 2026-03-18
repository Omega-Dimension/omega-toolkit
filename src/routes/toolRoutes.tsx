import ColorPickerPage from "../pages/colors/ColorPickerPage";
import Base64ToolPage from "../pages/dev/Base64ToolPage";
import HashGeneratorPage from "../pages/dev/HashGeneratorPage";
import JWTDecoderPage from "../pages/dev/JwtDecoderPage";
import RegexTesterPage from "../pages/dev/RegexTesterPage";
import UrlEncodeDecodePage from "../pages/dev/UrlEncodeDecodePage";
import UuidGeneratorPage from "../pages/dev/UuidGeneratorPage";

import CsvToExcelPage from "../pages/files/CsvToExcelPage";
import CsvToJsonPage from "../pages/files/CsvToJsonPage";
import ExcelToCsv from "../pages/files/ExcelToCsvPage";
import JsonFormatter from "../pages/files/JsonFormatterPage";
import JsonToCsvPage from "../pages/files/JsonToCsvPage";
import MyanmarFontConverter from "../pages/files/MyanmarFontConverterPage";

import Base64ToImagePage from "../pages/images/Base64ToImagePage";
import FaviconGeneratorPage from "../pages/images/FaviconGeneratorPage";
import ImageCropPage from "../pages/images/ImageCropPage";
import ImageResizePage from "../pages/images/ImageResizePage";
import ImageToBase64Page from "../pages/images/ImageToBase64Page";
import JpgToPng from "../pages/images/JpgToPngPage";
import QrScannerPage from "../pages/images/QrScannerPage";

import Mp3ConverterPage from "../pages/media/Mp3ConverterPage";

export const toolRoutes = [
  // FILE
  { path: "file/json-csv", element: <JsonToCsvPage /> },
  { path: "file/csv-json", element: <CsvToJsonPage /> },
  { path: "file/excel-csv", element: <ExcelToCsv /> },
  { path: "file/csv-excel", element: <CsvToExcelPage /> },
  {
    path: "file/myanmar-font-converter",
    element: <MyanmarFontConverter />,
  },

  // IMAGE
  { path: "image/jpg-png", element: <JpgToPng /> },
  { path: "image/resize-image", element: <ImageResizePage /> },
  { path: "image/favicon-generator", element: <FaviconGeneratorPage /> },
  { path: "image/image-crop", element: <ImageCropPage /> },
  { path: "image/image-base64", element: <ImageToBase64Page /> },
  { path: "image/base64-image", element: <Base64ToImagePage /> },
  { path: "image/qr-scanner", element: <QrScannerPage /> },

  // DEV
  { path: "dev/json-formatter", element: <JsonFormatter /> },
  { path: "dev/hash-generator", element: <HashGeneratorPage /> },
  { path: "dev/base64-tool", element: <Base64ToolPage /> },
  { path: "dev/uuid-generator", element: <UuidGeneratorPage /> },
  { path: "dev/jwt-decoder", element: <JWTDecoderPage /> },
  { path: "dev/regex-tester", element: <RegexTesterPage /> },
  { path: "dev/url-tool", element: <UrlEncodeDecodePage /> },

  // MEDIA
  { path: "media/mp3-converter", element: <Mp3ConverterPage /> },

  // COLOR
  {path : "colors/picker", element : <ColorPickerPage />}
];