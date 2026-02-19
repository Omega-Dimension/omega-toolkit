import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type JsonObject = Record<string, string | number | boolean | null>;

export default function JsonToCsvPage() {
  const [json, setJson] = useState<string>("");
  const [csv, setCsv] = useState<string>("");

  function convert() {
    try {
      const parsed: unknown = JSON.parse(json);

      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error("Not Array");
      }

      const data = parsed as JsonObject[];
      const headers = Object.keys(data[0]);
      const rows = data.map((obj) =>
        headers.map((h) => String(obj[h] ?? "")).join(","),
      );

      setCsv([headers.join(","), ...rows].join("\n"));
    } catch (err) {
      setCsv("❌ Invalid JSON array");
    }
  }

  return (
    <Box sx={{ py: 10 }}>

        <Typography>JSON to CSV</Typography>

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
              value={json}
              onChange={(e) => setJson(e.target.value)}
            />

            <TextField
              multiline
              minRows={14}
              fullWidth
              value={csv}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
          </Box>

          <Box mt={3}>
            <Button variant="contained" onClick={convert}>
              Convert
            </Button>
          </Box>
        </Paper>
     
    </Box>
  );
}
