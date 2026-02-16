import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";

export default function HashGeneratorPage() {
  const [input, setInput] = useState<string>("");
  const [hash, setHash] = useState<string>("");
  const [algorithm, setAlgorithm] = useState<string>("SHA-256");

  async function generateHash() {
    if (!input) return;

    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const hashBuffer = await crypto.subtle.digest(algorithm, data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    setHash(hashHex);
  }

  function copyToClipboard() {
    if (!hash) return;
    navigator.clipboard.writeText(hash);
    alert("Hash copied!");
  }

  function clearAll() {
    setInput("");
    setHash("");
  }

  return (
    <Box sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight={700} mb={1}>
          Hash Generator
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Generate SHA hashes securely in your browser
        </Typography>

        <Paper sx={{ p: 3 }}>
          {/* Input */}
          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Enter text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Algorithm Select */}
          <Box mt={3}>
            <TextField
              select
              fullWidth
              label="Select Algorithm"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
            >
              <MenuItem value="SHA-1">SHA-1</MenuItem>
              <MenuItem value="SHA-256">SHA-256</MenuItem>
              <MenuItem value="SHA-512">SHA-512</MenuItem>
            </TextField>
          </Box>

          {/* Buttons */}
          <Box mt={3} display="flex" gap={2} flexWrap="wrap">
            <Button variant="contained" onClick={generateHash}>
              Generate Hash
            </Button>

            <Button variant="outlined" onClick={clearAll}>
              Clear
            </Button>
          </Box>

          {/* Output */}
          {hash && (
            <Box mt={4}>
              <Typography mb={1}>Hash Output</Typography>

              <TextField
                fullWidth
                multiline
                minRows={3}
                value={hash}
              />

              <Box mt={2}>
                <Button variant="contained" onClick={copyToClipboard}>
                  Copy Hash
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
    </Box>
  );
}
