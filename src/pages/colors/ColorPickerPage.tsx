import { ContentCopy } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);

  if (clean.length !== 6) return "";

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgb(${r}, ${g}, ${b})`;
}

function hexToHsl(hex: string) {
  const clean = hex.replace("#", "");

  if (clean.length !== 6) return "";

  let r = parseInt(clean.substring(0, 2), 16) / 255;
  let g = parseInt(clean.substring(2, 4), 16) / 255;
  let b = parseInt(clean.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
    l * 100,
  )}%)`;
}

export default function ColorPickerPage() {
  const [color, setColor] = useState<string>("#1976d2");

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  function copy(val: string) {
    navigator.clipboard.writeText(val);
  }

  return (
    <Box sx={{ py: 10 }}>
      <Typography variant="h5" mb={2} fontWeight={600}>
        🎨 Color Picker
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "auto 1fr" },
            gap: 3,
            alignItems: "center",
          }}
        >
          <Box display="flex" justifyContent="center">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                width: 100,
                height: 100,
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            />
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" gap={1}>
              <TextField fullWidth label="HEX" value={color} />
              <Tooltip title="Copy HEX">
                <IconButton onClick={() => copy(color)}>
                  <ContentCopy />
                </IconButton>
              </Tooltip>
            </Box>

            <Box display="flex" gap={1}>
              <TextField fullWidth label="RGB" value={rgb} />
              <Tooltip title="Copy RGB">
                <IconButton onClick={() => copy(rgb)}>
                  <ContentCopy />
                </IconButton>
              </Tooltip>
            </Box>

            <Box display="flex" gap={1}>
              <TextField fullWidth label="HSL" value={hsl} />
              <Tooltip title="Copy HSL">
                <IconButton onClick={() => copy(hsl)}>
                  <ContentCopy />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        <Box
          mt={4}
          sx={{
            height: 120,
            borderRadius: 3,
            background: color,
            transition: "all 0.3s ease",
          }}
        />
      </Paper>
    </Box>
  );
}
