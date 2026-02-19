import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Box, Button, Paper, Typography } from "@mui/material";

export default function QrScannerPage() {
  const qrRef = useRef<HTMLDivElement | null>(null);

  const [result, setResult] = useState<string>("");
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  async function startScanner(): Promise<void> {
    if (!qrRef.current) return;

    const html5QrCode = new Html5Qrcode("qr-reader");

    setScanner(html5QrCode);

    try {
      await html5QrCode.start(
        {
          facingMode: "environment",
        },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          setResult(decodedText);

          html5QrCode.stop();

          setIsScanning(false);
        },
        () => {},
      );

      setIsScanning(true);
    } catch (err) {
      console.error("Camera start failed", err);
    }
  }

  async function stopScanner(): Promise<void> {
    if (scanner) {
      await scanner.stop();
      setIsScanning(false);
    }
  }

  useEffect(() => {
    return () => {
      if (scanner) {
        scanner.stop().catch(() => {});
      }
    };
  }, [scanner]);

  return (
    <Box sx={{ py: 10 }}>
      <Typography variant="h4" mb={2}>
        QR Code Scanner
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Box
          id="qr-reader"
          ref={qrRef}
          sx={{ width: "100%", maxWidth: 400, mx: "auto" }}
        />

        <Box mt={3} display="flex" gap={2}>
          {!isScanning ? (
            <Button variant="contained" onClick={startScanner}>
              Start Scanner
            </Button>
          ) : (
            <Button variant="outlined" onClick={stopScanner}>
              Stop Scanner
            </Button>
          )}
        </Box>

        {result && (
          <Box mt={3}>
            <Typography fontWeight={600}>Scanned Result:</Typography>
            <Typography color="text.secondary">{result}</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
