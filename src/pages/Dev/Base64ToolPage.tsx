import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";

export default function Base64ToolPage() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleModeChange(
    _: React.MouseEvent<HTMLElement>,
    newMode: "encode" | "decode" | null,
  ) {
    if (newMode) {
      setMode(newMode);
      setInput("");
      setOutput("");
      setError("");
    }
  }

  function process() {
    setError("");
    setOutput("");

    if (!input.trim()) return;

    try {
      if (mode === "encode") {
        const encoded = btoa(
          new TextEncoder()
            .encode(input)
            .reduce((data, byte) => data + String.fromCharCode(byte), ""),
        );
        setOutput(encoded);
      } else {
        const binary = atob(input);
        const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
        const decoded = new TextDecoder().decode(bytes);
        setOutput(decoded);
      }
    } catch (e) {
      setError("Invalid Base64 input");
    }
  }

  function copyToClipboard() {
    if (!output) return;
    navigator.clipboard.writeText(output);
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setError("");
  }

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={700} mb={1}>
          Base64 Encode / Decode
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Encode text to Base64 or decode Base64 back to text
        </Typography>

        <Paper sx={{ p: 3 }}>
          {/* Mode Toggle */}
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleModeChange}
            sx={{ mb: 3 }}
          >
            <ToggleButton value="encode">Encode</ToggleButton>
            <ToggleButton value="decode">Decode</ToggleButton>
          </ToggleButtonGroup>

          {/* Input */}
          <TextField
            fullWidth
            multiline
            minRows={4}
            label={mode === "encode" ? "Enter text" : "Enter Base64 string"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Buttons */}
          <Box mt={3} display="flex" gap={2} flexWrap="wrap">
            <Button variant="contained" onClick={process}>
              {mode === "encode" ? "Encode" : "Decode"}
            </Button>

            <Button variant="outlined" onClick={clearAll}>
              Clear
            </Button>
          </Box>

          {/* Error */}
          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}

          {/* Output */}
          {output && (
            <Box mt={4}>
              <Typography mb={1}>Result</Typography>

              <TextField fullWidth multiline minRows={4} value={output} />

              <Box mt={2}>
                <Button variant="contained" onClick={copyToClipboard}>
                  Copy Result
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
