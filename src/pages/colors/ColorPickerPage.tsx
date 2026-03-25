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
import { useState, useMemo } from "react";

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

function hexToHsl(hex: string) {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;

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

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange?: (val: string) => void;
}) {
  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
  };

  return (
    <Box display="flex" gap={1}>
      <TextField
        fullWidth
        label={label}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        slotProps={{
          input: {
            readOnly: !onChange,
          },
        }}
      />
      <Tooltip title={`Copy ${label}`} placement="right">
        <IconButton
          onClick={handleCopy}
          sx={{
            width: 45,
            height: 45,
            padding: 2.5,
            borderRadius: "50%",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <ContentCopy />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default function ColorPickerPage() {
  const [color, setColor] = useState("#1976d2");
  const [opacity, setOpacity] = useState(1);

  const formats = useMemo(() => {
    const rgb = hexToRgbValues(color);
    const hsl = hexToHsl(color);

    return {
      hex: color,
      rgb: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "",
      rgba: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})` : "",
      hsl: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "",
      hsla: hsl ? `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${opacity})` : "",
    };
  }, [color, opacity]);

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
            sx={{
              width: 250,
              aspectRatio: "1 / 1",
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
                inset: 0,
                opacity: 0,
                cursor: "pointer",
              }}
            />
          </Box>

          {/* Inputs */}
          <Box display="flex" flexDirection="column" gap={2}>
            <ColorField label="HEX" value={formats.hex} onChange={setColor} />
            <ColorField label="RGB" value={formats.rgb} />
            <ColorField label="RGBA" value={formats.rgba} />
            <ColorField label="HSL" value={formats.hsl} />
            <ColorField label="HSLA" value={formats.hsla} />
          </Box>
        </Box>

        {/* Opacity */}
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

        {/* Preview */}
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
              background: formats.rgba,
              transition: "all 0.3s ease",
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
