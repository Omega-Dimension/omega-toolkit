import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

export default function UrlEncodeDecodePage() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleEncode(): void {
    setError("");
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
    } catch {
      setError("Failed to encode text.");
    }
  }

  function handleDecode(): void {
    setError("");
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
    } catch {
      setError("Invalid URL encoded string.");
      setOutput("");
    }
  }

  function clearAll(): void {
    setInput("");
    setOutput("");
    setError("");
  }

  function copyOutput(): void {
    if (!output) return;
    navigator.clipboard.writeText(output);
  }

  return (
    <Box sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight={700} mb={1}>
          URL Encode / Decode
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Encode or decode URL strings directly in your browser.
        </Typography>

        <Paper sx={{ p: 3 }}>
          {/* Input */}
          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Buttons */}
          <Stack direction="row" spacing={2} mt={3} flexWrap="wrap">
            <Button variant="contained" onClick={handleEncode}>
              Encode
            </Button>

            <Button variant="contained" onClick={handleDecode}>
              Decode
            </Button>

            <Button variant="outlined" onClick={clearAll}>
              Clear
            </Button>
          </Stack>

          {/* Error */}
          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}

          {/* Output */}
          {output && (
            <Box mt={4}>
              <Typography fontWeight={600} mb={1}>
                Result
              </Typography>

              <TextField
                fullWidth
                multiline
                minRows={4}
                value={output}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />

              <Button variant="outlined" sx={{ mt: 2 }} onClick={copyOutput}>
                Copy
              </Button>
            </Box>
          )}
        </Paper>
    </Box>
  );
}
