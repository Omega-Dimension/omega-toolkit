import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function JsonFormatterPage() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  function formatJson() {
    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setOutput(pretty);
    } catch (e) {
      setOutput("❌ Invalid JSON");
    }
  }

  return (
    <Box sx={{ py: 10 }}>
  
        <Typography variant="h4" mb={1}>
          JSON Formatter
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Paste your JSON and format it beautifully ✨
        </Typography>

        <Paper sx={{ p: 3 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "1fr 1fr" },
              gap: 3,
            }}
          >
            {/* Input */}
            <Box>
              <Typography mb={1}>Input JSON</Typography>
              <TextField
                multiline
                minRows={14}
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"name":"Fento"}'
              />
            </Box>

            {/* Output */}

            <Box>
              <Typography mb={1}>Formatted Output</Typography>
              <TextField
                multiline
                minRows={14}
                fullWidth
                value={output}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Box>
          </Box>

          <Box mt={3} display="flex" gap={2}>
            <Button variant="contained" onClick={formatJson}>
              Format
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                setInput("");
                setOutput("");
              }}
            >
              Clear
            </Button>
          </Box>
        </Paper>
   
    </Box>
  );
}
