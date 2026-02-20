
import { useRef, useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Typography,
  type SelectChangeEvent,
  CircularProgress,
} from "@mui/material";

type ScanMode = "camera" | "upload";

export default function QrScannerPage() {
  const qrRef = useRef<HTMLDivElement | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [mode, setMode] = useState<ScanMode>("camera");
  const [result, setResult] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // --- Camera Scanner ---
  async function startScanner() {
    if (!qrRef.current) return;

    const html5QrCode = new Html5Qrcode("qr-reader");
    scannerRef.current = html5QrCode;

    try {
      await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          setResult(decodedText);
          stopScanner();

          // Redirect if valid URL
          try {
            const url = new URL(decodedText);
            setTimeout(() => {
              window.location.href = url.toString();
            }, 1000); // Small delay to show the result
          } catch {}
        },
        () => {} // required by TS
      );

      setIsScanning(true);
    } catch (err) {
      console.error("Camera start failed", err);
    }
  }

  async function stopScanner() {
    if (scannerRef.current) {
      await scannerRef.current.stop();
      await scannerRef.current.clear();
      scannerRef.current = null;
      setIsScanning(false);
    }
  }

  // --- Upload QR Image with Preview and Scanning Effect ---
  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  async function scanUploadedImage() {
    if (!previewImage) return;

    setIsUploading(true);
    setResult("");

    // Convert base64 to file
    const base64Response = await fetch(previewImage);
    const blob = await base64Response.blob();
    const file = new File([blob], "qr-image.jpg", { type: "image/jpeg" });

    const html5QrCode = new Html5Qrcode("upload-preview-scanner");

    try {
      // Create a temporary div for scanning
      const tempDiv = document.createElement("div");
      tempDiv.id = "temp-scanner";
      tempDiv.style.display = "none";
      document.body.appendChild(tempDiv);

      // Simulate scanning with delay
      await new Promise(resolve => setTimeout(resolve, 1500)); // Scanning animation delay
      
      const decodedText = await html5QrCode.scanFile(file, true);
      setResult(decodedText);

      // Clear preview after successful scan
      setTimeout(() => {
        setPreviewImage(null);
        
        // Redirect if valid URL
        try {
          const url = new URL(decodedText);
          window.location.href = url.toString();
        } catch {
          // Not a URL, just show the result
        }
      }, 1000);

    } catch {
      setResult("❌ No QR code found in image");
      setTimeout(() => {
        setPreviewImage(null);
      }, 2000);
    } finally {
      html5QrCode.clear();
      setIsUploading(false);
    }
  }

  // Cancel upload preview
  function handleCancelUpload() {
    setPreviewImage(null);
    setResult("");
  }

  // --- Mode Switch ---
  function handleModeChange(e: SelectChangeEvent) {
    stopScanner(); // stop camera if switching
    setPreviewImage(null); // clear preview
    setResult("");
    setMode(e.target.value as ScanMode);
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <Box sx={{ py: 10, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" mb={2}>
        QR Code Scanner
      </Typography>

      {/* Mode Selector */}
      <Box mb={3}>
        <Select value={mode} onChange={handleModeChange} fullWidth>
          <MenuItem value="camera">Scan with Camera</MenuItem>
          <MenuItem value="upload">Upload QR Image</MenuItem>
        </Select>
      </Box>

      <Paper sx={{ p: 3, minHeight: 400 }}>
        {/* Camera Mode */}
        {mode === "camera" && (
          <>
            <Box
              id="qr-reader"
              ref={qrRef}
              sx={{ 
                width: "100%", 
                maxWidth: 400, 
                mx: "auto",
                "& video": { 
                  borderRadius: 2,
                  width: "100%",
                  height: "auto"
                }
              }}
            />
            <Box mt={3} display="flex" gap={2} justifyContent="center">
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
          </>
        )}

        {/* Upload Mode */}
        {mode === "upload" && !previewImage && (
          <Box textAlign="center">
            <Button 
              variant="contained" 
              component="label"
              size="large"
              sx={{ mb: 2 }}
            >
              Select QR Image
              <input
                ref={fileInputRef}
                hidden
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </Button>
            <Typography variant="body2" color="text.secondary">
              Choose an image containing a QR code
            </Typography>
          </Box>
        )}

        {/* Upload Preview with Scanning Effect */}
        {mode === "upload" && previewImage && (
          <Box>
            <Box 
              sx={{ 
                position: "relative",
                width: "100%",
                maxWidth: 400,
                height: 400,
                mx: "auto",
                border: "2px solid",
                borderColor: "primary.main",
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: "#f5f5f5"
              }}
            >
              {/* Image Preview */}
              <Box
                component="img"
                src={previewImage}
                alt="QR Code Preview"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain"
                }}
              />
              
              {/* Scanning Overlay */}
              {isUploading && (
                <>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 2
                    }}
                  >
                    <CircularProgress sx={{ color: "white", mb: 2 }} />
                    <Typography color="white">
                      Scanning for QR code...
                    </Typography>
                  </Box>
                  
                  {/* Scanning Line Animation */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: "linear-gradient(90deg, transparent, #ff0000, transparent)",
                      animation: "scan 2s linear infinite",
                      zIndex: 3,
                      "@keyframes scan": {
                        "0%": { top: "0%" },
                        "100%": { top: "100%" }
                      }
                    }}
                  />
                </>
              )}
            </Box>

            {/* Action Buttons */}
            <Box mt={3} display="flex" gap={2} justifyContent="center">
              <Button 
                variant="contained" 
                onClick={scanUploadedImage}
                disabled={isUploading}
              >
                Scan This Image
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleCancelUpload}
                disabled={isUploading}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}

        {/* Result */}
        {result && (
          <Box mt={3} p={2} bgcolor="action.hover" borderRadius={1}>
            <Typography fontWeight={600}>Result:</Typography>
            <Typography color="text.secondary" sx={{ wordBreak: "break-all" }}>
              {result}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Hidden div for HTML5Qrcode (required for file scanning) */}
      <div id="upload-preview-scanner" style={{ display: 'none' }} />
    </Box>
  );
}