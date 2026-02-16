import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  Paper,
} from "@mui/material";

export default function JpgToPng() {
  const [preview, setPreview] = useState<string>("");

  function handleFile(file: File) {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const png = canvas.toDataURL("image/png");
      setPreview(png);
    };
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        JPG to PNG
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={4}>
        Convert JPG images to PNG format
      </Typography>

      <Stack spacing={3}>
        {/* Upload Button */}
        <Button variant="contained" component="label">
          Upload JPG
          <input
            hidden
            type="file"
            accept="image/jpeg"
            onChange={(e) =>
              e.target.files && handleFile(e.target.files[0])
            }
          />
        </Button>

        {preview && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Stack spacing={2} alignItems="flex-start">
              <Box
                component="img"
                src={preview}
                sx={{ maxWidth: 300, borderRadius: 1 }}
              />

              <Button
                variant="contained"
                color="primary"
                href={preview}
                download="converted.png"
              >
                Download PNG
              </Button>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
