import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function ImageToBase64Page() {
  const [base64, setBase64] = useState<string>("");
  const [preview, setPreview] = useState<string>("");

  function handleFile(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      setBase64(result);
      setPreview(result);
    };

    reader.readAsDataURL(file);
  }

  function copyToClipboard() {
    if (!base64) return;
    navigator.clipboard.writeText(base64);
    alert("Base64 copied!");
  }

  function downloadTxt() {
    if (!base64) return;

    const blob = new Blob([base64], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "image-base64.txt";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <Box sx={{ py: 10 }}>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Image to Base64
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Convert image file to Base64 string
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
            <img src={preview} style={{ maxWidth: "100%", maxHeight: 300 }} />
          </Box>
        )}

        {/* Base64 Output */}
        {base64 && (
          <Box mt={4}>
            <Typography mb={1}>Base64 Output</Typography>

            <TextField
              fullWidth
              multiline
              minRows={6}
              value={base64}
              onChange={() => {}}
            />

            <Box mt={2} display="flex" gap={2} flexWrap="wrap">
              <Button variant="contained" onClick={copyToClipboard}>
                Copy Base64
              </Button>

              <Button variant="outlined" onClick={downloadTxt}>
                Download .txt
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
