import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Slider,
  Typography,
} from "@mui/material";

export default function ImageCompressPage() {
  const [preview, setPreview] = useState<string>("");
  const [quality, setQuality] = useState<number>(60);
  const [imageFile, setImageFile] = useState<File | null>(null);

  function handleFile(file: File) {
    setImageFile(file);
    compress(file, quality);
  }

  function compress(file: File, q: number) {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      const compressed = canvas.toDataURL("image/jpeg", q / 100);
      setPreview(compressed);
    };
  }

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} mb={1}>
          Image Compress
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Reduce image size by adjusting quality
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

          {/* Quality Slider */}
          <Box mt={4} maxWidth={400}>
            <Typography gutterBottom>
              Quality: {quality}%
            </Typography>
            <Slider
              value={quality}
              min={10}
              max={100}
              step={5}
              onChange={(_, val) => {
                const q = val as number;
                setQuality(q);
                if (imageFile) compress(imageFile, q);
              }}
            />
          </Box>

          {/* Preview */}
          {preview && (
            <Box mt={4}>
              <Typography mb={1}>Preview</Typography>

              <Box mb={2}>
                <img src={preview} style={{ maxWidth: "100%" }} />
              </Box>

              <Button
                variant="outlined"
                href={preview}
                download="compressed.jpg"
              >
                Download Image
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
