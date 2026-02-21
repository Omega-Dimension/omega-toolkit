import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function ImageResizePage() {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(300);
  const [result, setResult] = useState<string>("");

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => setImgSrc(reader.result as string);
    reader.readAsDataURL(file);
  }

  function resize() {
    if (!imgSrc) return;

    const img = new Image();
    img.src = imgSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, width, height);
      setResult(canvas.toDataURL("image/png"));
    };
  }

  return (
    <Box sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight={700} mb={1}>
          Image Resize
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Upload image and resize to custom width and height
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

          {/* Size Inputs */}
          <Box mt={3} display="flex" gap={2} flexWrap="wrap">
            <TextField
              type="number"
              label="Width (px)"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
            />
            <TextField
              type="number"
              label="Height (px)"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />

            <Button variant="contained" onClick={resize}>
              Resize
            </Button>
          </Box>

          {/* Preview */}
          {result && (
            <Box mt={4}>
              <Typography mb={1}>Preview</Typography>

              <Box mb={2}>
                <img src={result} style={{ maxWidth: "100%" }} />
              </Box>

              <Button
                variant="outlined"
                href={result}
                download="resized.png"
              >
                Download Image
              </Button>
            </Box>
          )}
        </Paper>
    </Box>
  );
}
