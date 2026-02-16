import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function Base64ToImagePage() {
  const [input, setInput] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");
  const [error, setError] = useState<string>("");

  function convert() {
    setError("");

    if (!input.trim()) {
      setError("Please paste Base64 string.");
      return;
    }

    let formatted = input.trim();

    // If no data:image header, add default png header
    if (!formatted.startsWith("data:image")) {
      formatted = `data:image/png;base64,${formatted}`;
    }

    try {
      setImageSrc(formatted);
    } catch {
      setError("Invalid Base64 string.");
    }
  }

  function clearAll() {
    setInput("");
    setImageSrc("");
    setError("");
  }

  return (
    <Box sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight={700} mb={1}>
          Base64 to Image
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Paste Base64 string and convert it back to image
        </Typography>

        <Paper sx={{ p: 3 }}>
          {/* Input */}
          <TextField
            fullWidth
            multiline
            minRows={6}
            label="Paste Base64 string here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Box mt={2} display="flex" gap={2} flexWrap="wrap">
            <Button variant="contained" onClick={convert}>
              Convert
            </Button>

            <Button variant="outlined" onClick={clearAll}>
              Clear
            </Button>
          </Box>

          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}

          {/* Preview */}
          {imageSrc && (
            <Box mt={4}>
              <Typography mb={1}>Preview</Typography>

              <Box
                sx={{
                  border: "1px solid #ddd",
                  p: 2,
                  textAlign: "center",
                }}
              >
                <img
                  src={imageSrc}
                  style={{ maxWidth: "100%", maxHeight: 400 }}
                />
              </Box>

              <Box mt={2}>
                <Button
                  variant="contained"
                  href={imageSrc}
                  download="converted-image.png"
                >
                  Download Image
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
    </Box>
  );
}
