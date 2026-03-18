import {
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Slider,
  Box,
} from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { useState } from "react";

function hexToRgbValues(hex: string) {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;

  const bigint = parseInt(clean, 16);

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function hexToRgb(hex: string) {
  const rgb = hexToRgbValues(hex);
  if (!rgb) return "";
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function hexToRgba(hex: string, alpha: number) {
  const rgb = hexToRgbValues(hex);
  if (!rgb) return "";
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function hexToHsl(hex: string) {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return { h: 0, s: 0, l: 0 };

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

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hexToHsla(hex: string, alpha: number) {
  const hsl = hexToHsl(hex);
  if (!hsl) return "";
  return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alpha})`;
}

export default function ColorPickerPage() {
  const [color, setColor] = useState("#1976d2");
  const [opacity, setOpacity] = useState(1);

  const rgb = hexToRgb(color);
  const rgba = hexToRgba(color, opacity);
  const hsl = hexToHsl(color);
  const hsla = hexToHsla(color, opacity);

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
  };

  return (
    <Box sx={{ py: 10 }}>
      <Typography variant="h5" mb={2} fontWeight={600}>
        🎨 Color Tools
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
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 250,
              height: 250,
              borderRadius: "50%",
              background: color,
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
                transform: "scale(1.05)",
              },
              position: "relative",
              overflow: "hidden",
            }}
            onClick={() =>
              document.getElementById("hidden-color-input")?.click()
            }
          >
            <input
              type="color"
              id="hidden-color-input"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "pointer",
                top: 0,
                left: 0,
                borderRadius: "50%",
              }}
            />
          </Box>

          {/* Inputs */}
          <Box display="flex" flexDirection="column" gap={2}>
            {/* HEX (editable) */}
            <Box display="flex" gap={1}>
              <TextField
                fullWidth
                label="HEX"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <Tooltip title="Copy HEX">
                <IconButton onClick={() => copy(color)}>
                  <ContentCopy />
                </IconButton>
              </Tooltip>
            </Box>

            {/* RGB */}
            <Box display="flex" gap={1}>
              <TextField fullWidth label="RGB" value={rgb} />
              <Tooltip title="Copy RGB">
                <IconButton onClick={() => copy(rgb)}>
                  <ContentCopy />
                </IconButton>
              </Tooltip>
            </Box>

            {/* RGBA */}
            <Box display="flex" gap={1}>
              <TextField fullWidth label="RGBA" value={rgba} />
              <Tooltip title="Copy RGBA">
                <IconButton onClick={() => copy(rgba)}>
                  <ContentCopy />
                </IconButton>
              </Tooltip>
            </Box>

            {/* HSL */}
            <Box display="flex" gap={1}>
              <TextField
                fullWidth
                label="HSL"
                value={hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : ""}
              />
              <Tooltip title="Copy HSL">
                <IconButton
                  onClick={() => copy(`hsl(${hsl?.h}, ${hsl?.s}%, ${hsl?.l}%)`)}
                >
                  <ContentCopy />
                </IconButton>
              </Tooltip>
            </Box>

            {/* HSLA */}
            <Box display="flex" gap={1}>
              <TextField fullWidth label="HSLA" value={hsla} />
              <Tooltip title="Copy HSLA">
                <IconButton onClick={() => copy(hsla)}>
                  <ContentCopy />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        <Box mt={4}>
          <Typography gutterBottom>Opacity ({opacity})</Typography>
          <Slider
            value={opacity}
            min={0}
            max={1}
            step={0.01}
            onChange={(_, v) => setOpacity(v as number)}
          />
        </Box>

        <Box
          mt={4}
          sx={{
            height: 120,
            borderRadius: 3,
            backgroundImage:
              "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: rgba,
              transition: "all 0.3s ease",
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
