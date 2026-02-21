import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

function decodeBase64Url(str: string): string | null {
  try {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const padded =
      base64 + "=".repeat((4 - (base64.length % 4)) % 4);

    const binary: string = atob(padded);
    const bytes: Uint8Array = Uint8Array.from(binary, (c) =>
      c.charCodeAt(0)
    );

    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

type JWTPayload = {
  exp?: number;
  iat?: number;
  [key: string]: unknown;
};

export default function JWTDecoderPage() {
  const [token, setToken] = useState<string>("");
  const [header, setHeader] = useState<string>("");
  const [payload, setPayload] = useState<string>("");
  const [error, setError] = useState<string>("");

  function decodeJWT(): void {
    setError("");
    setHeader("");
    setPayload("");

    if (!token.trim()) return;

    const parts: string[] = token.split(".");

    if (parts.length !== 3) {
      setError("Invalid JWT format.");
      return;
    }

    const decodedHeader: string | null = decodeBase64Url(parts[0]);
    const decodedPayload: string | null = decodeBase64Url(parts[1]);

    if (!decodedHeader || !decodedPayload) {
      setError("Failed to decode JWT.");
      return;
    }

    try {
      const headerObj: unknown = JSON.parse(decodedHeader);
      const payloadObj: JWTPayload = JSON.parse(decodedPayload);

      setHeader(JSON.stringify(headerObj, null, 2));
      setPayload(JSON.stringify(payloadObj, null, 2));
    } catch {
      setError("Invalid JSON inside JWT.");
    }
  }

  function clearAll(): void {
    setToken("");
    setHeader("");
    setPayload("");
    setError("");
  }

  function checkExpiration(): string | null {
    if (!payload) return null;

    try {
      const obj: JWTPayload = JSON.parse(payload);

      if (!obj.exp) return "No expiration field";

      const now: number = Math.floor(Date.now() / 1000);

      return obj.exp < now
        ? "Token Expired"
        : "Token Valid (not expired)";
    } catch {
      return null;
    }
  }

  const expirationStatus: string | null = checkExpiration();

  return (
    <Box sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight={700} mb={1}>
          JWT Decoder
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Decode JWT tokens locally. No data is sent to any server.
        </Typography>

        <Paper sx={{ p: 3 }}>
          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Paste JWT Token"
            value={token}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setToken(e.target.value)
            }
          />

          <Box mt={3} display="flex" gap={2}>
            <Button variant="contained" onClick={decodeJWT}>
              Decode
            </Button>
            <Button variant="outlined" onClick={clearAll}>
              Clear
            </Button>
          </Box>

          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}

          {header && (
            <Box mt={4}>
              <Typography fontWeight={600} mb={1}>
                Header
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={4}
                value={header}
                  slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Box>
          )}

          {payload && (
            <Box mt={4}>
              <Typography fontWeight={600} mb={1}>
                Payload
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={6}
                value={payload}
                  slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />

              {expirationStatus && (
                <Typography
                  mt={2}
                  color={
                    expirationStatus === "Token Expired"
                      ? "error"
                      : "success.main"
                  }
                >
                  {expirationStatus}
                </Typography>
              )}
            </Box>
          )}
        </Paper>
    </Box>
  );
}
