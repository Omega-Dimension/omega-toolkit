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

export default function CsvToExcelPage() {
  const [csv, setCsv] = useState<string>("");

  function downloadExcel() {
    try {
      const rows: string[][] = csv
        .trim()
        .split("\n")
        .map((line) => line.split(","));

      if (rows.length === 0) throw new Error("Empty CSV");

      const worksheet = XLSX.utils.aoa_to_sheet(rows);
      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      XLSX.writeFile(workbook, "data.xlsx");
    } catch (err) {
      alert("❌ Invalid CSV");
    }
  }

  return (
    <Box sx={{ py: 10 }}>
      
        <Typography variant="h4" fontWeight={700} mb={4}>
          CSV to Excel
        </Typography>

        <Paper sx={{ p: 3 }}>
          <TextField
            multiline
            minRows={14}
            fullWidth
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            placeholder="name,age\nFento,25"
          />

          <Box mt={3}>
            <Button variant="contained" onClick={downloadExcel}>
              Download Excel
            </Button>
          </Box>
        </Paper>
    
    </Box>
  );
}
