import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export default function UuidGeneratorPage() {
  const [mode, setMode] = useState<"uuid" | "custom">("uuid");
  const [length, setLength] = useState<number>(8);
  const [count, setCount] = useState<number>(1);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [useLower, setUseLower] = useState<boolean>(true);
  const [useUpper, setUseUpper] = useState<boolean>(true);
  const [results, setResults] = useState<string[]>([]);

  function handleModeChange(
    _: React.MouseEvent<HTMLElement>,
    newMode: "uuid" | "custom" | null,
  ) {
    if (newMode) {
      setMode(newMode);
      setResults([]);
    }
  }

  function generateUUIDv4() {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      list.push(crypto.randomUUID());
    }
    setResults(list);
  }

  function generateCustomID() {
    let chars = "";

    if (useNumbers) chars += "0123456789";
    if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (!chars) return;

    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      let id = "";
      const randomValues = crypto.getRandomValues(new Uint32Array(length));

      for (let j = 0; j < length; j++) {
        id += chars[randomValues[j] % chars.length];
      }

      list.push(id);
    }

    setResults(list);
  }

  function handleGenerate() {
    if (mode === "uuid") {
      generateUUIDv4();
    } else {
      generateCustomID();
    }
  }

  function copyAll() {
    if (!results.length) return;

    navigator.clipboard.writeText(results.join("\n"));
  }

  function clearAll() {
    setResults([]);
  }

  return (
    <Box sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight={700} mb={1}>
          UUID / ID Generator
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Generate UUID v4 or custom random IDs securely in your browser
        </Typography>

        <Paper sx={{ p: 3 }}>
          {/* Mode */}
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleModeChange}
            sx={{ mb: 3 }}
          >
            <ToggleButton value="uuid">UUID v4</ToggleButton>
            <ToggleButton value="custom">Custom ID</ToggleButton>
          </ToggleButtonGroup>

          {/* Custom Options */}
          {mode === "custom" && (
            <Box mb={3}>
              <TextField
                type="number"
                label="Length"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                sx={{ mr: 2, mb: 2 }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={useNumbers}
                    onChange={(e) => setUseNumbers(e.target.checked)}
                  />
                }
                label="Numbers"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={useLower}
                    onChange={(e) => setUseLower(e.target.checked)}
                  />
                }
                label="Lowercase"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={useUpper}
                    onChange={(e) => setUseUpper(e.target.checked)}
                  />
                }
                label="Uppercase"
              />
            </Box>
          )}

          {/* Count */}
          <TextField
            type="number"
            label="How many IDs?"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            sx={{ mb: 3 }}
          />

          {/* Buttons */}
          <Box display="flex" gap={2} flexWrap="wrap">
            <Button variant="contained" onClick={handleGenerate}>
              Generate
            </Button>

            <Button variant="outlined" onClick={clearAll}>
              Clear
            </Button>
          </Box>

          {/* Results */}
          {results.length > 0 && (
            <Box mt={4}>
              <Typography mb={1}>Generated IDs</Typography>

              <TextField
                fullWidth
                multiline
                minRows={4}
                value={results.join("\n")}
              />

              <Box mt={2}>
                <Button variant="contained" onClick={copyAll}>
                  Copy All
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
    </Box>
  );
}
