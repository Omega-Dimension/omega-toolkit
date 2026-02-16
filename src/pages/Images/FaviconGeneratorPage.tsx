"use client";

import { useState } from "react";
import JSZip from "jszip";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";

type SizeItem = {
  name: string;
  size: number;
};

const ICONS: SizeItem[] = [
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
];

export default function FaviconGeneratorPage() {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [preview, setPreview] = useState<string>("");

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      setImgSrc(reader.result as string);
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function resizeTo(size: number, img: HTMLImageElement) {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    return canvas.toDataURL("image/png");
  }

  async function generateZip() {
    if (!imgSrc) return;

    const img = new Image();
    img.src = imgSrc;

    img.onload = async () => {
      const zip = new JSZip();

      // PNG icons
      for (const item of ICONS) {
        const dataUrl = resizeTo(item.size, img);
        const base64 = dataUrl.split(",")[1];
        zip.file(item.name, base64, { base64: true });
      }

      // favicon.ico (png renamed)
      const icoData = resizeTo(32, img).split(",")[1];
      zip.file("favicon.ico", icoData, { base64: true });

      // site.webmanifest
      const manifest = {
        name: "My App",
        short_name: "App",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
      };

      zip.file("site.webmanifest", JSON.stringify(manifest, null, 2));

      // download zip
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "favicons.zip";
      a.click();

      URL.revokeObjectURL(url);
    };
  }

  return (
    <Box sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight={700} mb={1}>
          Favicon Generator
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Upload one image and download all favicon files in a ZIP
        </Typography>

        <Paper sx={{ p: 3 }}>
          {/* Upload */}
          <Button variant="contained" component="label">
            Upload Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </Button>

          {/* Preview */}
          {preview && (
            <Box mt={4}>
              <Typography mb={1}>Preview</Typography>

              <Box
                sx={{
                  width: 160,
                  height: 160,
                  border: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <img
                  src={preview}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </Box>

              <Button variant="contained" onClick={generateZip}>
                Download Favicons ZIP
              </Button>
            </Box>
          )}
        </Paper>
    </Box>
  );
}
