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
import { SwapHorizOutlined } from "@mui/icons-material";

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

  const isZawgyiToUnicode = type === "zawgyiToUnicode";

  const leftLabel = isZawgyiToUnicode ? "Zawgyi Input" : "Unicode Input";
  const rightLabel = isZawgyiToUnicode ? "Unicode Output" : "Zawgyi Output";

  const options: {
    value: ConvertType;
    from: string;
    to: string;
  }[] = [
    { value: "zawgyiToUnicode", from: "Zawgyi", to: "Unicode" },
    { value: "unicodeToZawgyi", from: "Unicode", to: "Zawgyi" },
  ];

  function renderDirection(from: string, to: string) {
    return (
      <Box display="flex" alignItems="center" gap={1}>
        {from}
        <SwapHorizOutlined fontSize="small" />
        {to}
      </Box>
    );
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
        <Select
          value={type}
          onChange={handleChange}
          fullWidth
          sx={{
            fontWeight: 600,
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              gap: 1,
            },
          }}
          renderValue={(selected) => {
            const current = options.find((o) => o.value === selected);
            return current ? renderDirection(current.from, current.to) : null;
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {renderDirection(option.from, option.to)}
            </MenuItem>
          ))}
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
          <Box>
            <Typography mb={1} fontWeight={600}>
              {leftLabel}
            </Typography>
            <TextField
              multiline
              minRows={14}
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="စာထည့်ပါ..."
            />
          </Box>

          <Box>
            <Typography mb={1} fontWeight={600}>
              {rightLabel}
            </Typography>
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
