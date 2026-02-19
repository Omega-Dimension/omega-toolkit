import { useState } from "react";
import knayi from "knayi-myscript";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";

type ConvertType = "zawgyiToUnicode" | "unicodeToZawgyi";

export default function MyanmarFontConverter() {
  const [type, setType] = useState<ConvertType>("zawgyiToUnicode");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  function handleConvert(): void {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      const result =
        type === "zawgyiToUnicode"
          ? knayi.fontConvert(input, "zawgyi", "unicode")
          : knayi.fontConvert(input, "unicode", "zawgyi");

      setOutput(result);
    } catch {
      setOutput("❌ Conversion failed");
    }
  }

  function handleClear(): void {
    setInput("");
    setOutput("");
  }

  function handleChange(e: SelectChangeEvent): void {
    setType(e.target.value as ConvertType);
  }

  return (
    <Box sx={{ py: 10 }}>
      <Typography variant="h4" mb={1}>
        Myanmar Font Converter
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Convert between Zawgyi and Unicode easily
      </Typography>

      <Box mb={3}>
        <Select value={type} onChange={handleChange} fullWidth>
          <MenuItem>Zawgyi Unicode</MenuItem>
          <MenuItem>Unicode Zawgyi</MenuItem>
        </Select>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { md: "1fr 1fr" },
            gap: 3,
          }}
        >
          <TextField
            multiline
            minRows={14}
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="စာထည့်ပါ..."
          />

          <TextField
            multiline
            minRows={14}
            fullWidth
            value={output}
            slotProps={{
              input: { readOnly: true },
            }}
          />
        </Box>

        <Box mt={3} display="flex" gap={2}>
          <Button variant="contained" onClick={handleConvert}>
            Convert
          </Button>

          <Button variant="outlined" onClick={handleClear}>
            Clear
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
