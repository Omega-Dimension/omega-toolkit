import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useState } from "react";

type CsvRow = Record<string, string>;

export default function CsvToJsonPage() {
  const [csv, setCsv] = useState<string>("");
  const [json, setJson] = useState<string>("");

  function convert() {
    try {
      const lines: string[] = csv.trim().split("\n");

      if (lines.length < 2) {
        throw new Error("No data rows");
      }

      const headers: string[] = lines[0].split(",").map((h) => h.trim());

      const data: CsvRow[] = lines.slice(1).map((line) => {
        const values = line.split(",");

        const row: CsvRow = {};

        headers.forEach((header, index) => {
          row[header] = values[index]?.trim() ?? "";
        });

        return row;
      });

      setJson(JSON.stringify(data, null, 2));
    } catch (err) {
      setJson("❌ Invalid CSV");
    }
  }

  return (
    <Box sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight={700} mb={4}>
          CSV to JSON
        </Typography>

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
              value={csv}
              onChange={(e) => setCsv(e.target.value)}
              placeholder="name,age\nFento,25"
            />

            <TextField
              multiline
              minRows={14}
              fullWidth
              value={json}
              InputProps={{ readOnly: true }}
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
