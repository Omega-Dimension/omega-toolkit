import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelToCsvPage() {
  const [csv, setCsv] = useState<string>("");

  function handleFile(file: File) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const csvText: string = XLSX.utils.sheet_to_csv(sheet);
      setCsv(csvText);
    };

    reader.readAsArrayBuffer(file);
  }

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} mb={4}>
          Excel to CSV
        </Typography>

        <Paper sx={{ p: 3 }}>
          <Button variant="contained" component="label">
            Upload Excel File
            <input
              type="file"
              hidden
              accept=".xlsx,.xls"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </Button>

          <Box mt={3}>
            <TextField
              multiline
              minRows={14}
              fullWidth
              value={csv}
              placeholder="CSV output will appear here..."
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
