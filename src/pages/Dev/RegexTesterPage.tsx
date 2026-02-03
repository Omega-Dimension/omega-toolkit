import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

type MatchResult = {
  match: string;
  index: number;
};

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState<string>("");
  const [testText, setTestText] = useState<string>("");
  const [flags, setFlags] = useState<string>("g");
  const [error, setError] = useState<string>("");

  function toggleFlag(flag: string): void {
    setFlags((prev) =>
      prev.includes(flag)
        ? prev.replace(flag, "")
        : prev + flag
    );
  }

  const results: MatchResult[] = useMemo(() => {
    setError("");

    if (!pattern || !testText) return [];
    try {
      const regex = new RegExp(pattern, flags);
      const matches: MatchResult[] = [];

      if (flags.includes("g")) {
        let match: RegExpExecArray | null;

        while ((match = regex.exec(testText)) !== null) {
          matches.push({
            match: match[0],
            index: match.index,
          });
        }
      } else {
        const single = regex.exec(testText);
        if (single) {
          matches.push({
            match: single[0],
            index: single.index,
          });
        }
      }

      return matches;
    } catch (err) {
      setError("Invalid regular expression.");
      return [];
    }
  }, [pattern, testText, flags]);

  function clearAll(): void {
    setPattern("");
    setTestText("");
    setFlags("g");
    setError("");
  }

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={700} mb={1}>
          Regex Tester
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Test regular expressions directly in your browser.
        </Typography>

        <Paper sx={{ p: 3 }}>
          {/* Pattern */}
          <TextField
            fullWidth
            label="Regex Pattern"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Example: \\b\\w+\\b"
          />

          {/* Flags */}
          <Box mt={3}>
            <Typography fontWeight={600} mb={1}>
              Flags
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap">
              {["g", "i", "m", "s", "u", "y"].map((flag) => (
                <FormControlLabel
                  key={flag}
                  control={
                    <Checkbox
                      checked={flags.includes(flag)}
                      onChange={() => toggleFlag(flag)}
                    />
                  }
                  label={flag}
                />
              ))}
            </Stack>
          </Box>

          {/* Test Text */}
          <Box mt={3}>
            <TextField
              fullWidth
              multiline
              minRows={6}
              label="Test Text"
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
            />
          </Box>

          <Box mt={3} display="flex" gap={2}>
            <Button variant="outlined" onClick={clearAll}>
              Clear
            </Button>
          </Box>

          {/* Error */}
          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}

          {/* Results */}
          {!error && pattern && testText && (
            <Box mt={4}>
              <Typography fontWeight={600} mb={2}>
                Matches ({results.length})
              </Typography>

              {results.length === 0 ? (
                <Typography color="text.secondary">
                  No matches found.
                </Typography>
              ) : (
                <Stack spacing={1}>
                  {results.map((item, index) => (
                    <Chip
                      key={index}
                      label={`"${item.match}" at index ${item.index}`}
                      variant="outlined"
                    />
                  ))}
                </Stack>
              )}
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
