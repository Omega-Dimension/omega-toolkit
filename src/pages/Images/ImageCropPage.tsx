import { useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";

type Crop = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export default function ImageCropPage() {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [imgSrc, setImgSrc] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [crop, setCrop] = useState<Crop | null>(null);
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      setImgSrc(reader.result as string);
      setResult("");
      setCrop(null);
    };
    reader.readAsDataURL(file);
  }

  function onMouseDown(e: React.MouseEvent) {
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStart({ x, y });
    setCrop({ x, y, w: 0, h: 0 });
    setDragging(true);
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!dragging || !start || !imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCrop({
      x: Math.min(start.x, x),
      y: Math.min(start.y, y),
      w: Math.abs(x - start.x),
      h: Math.abs(y - start.y),
    });
  }

  function onMouseUp() {
    setDragging(false);
  }

  function doCrop() {
    if (!crop || !imgRef.current) return;

    const img = imgRef.current;

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    const canvas = document.createElement("canvas");
    canvas.width = crop.w * scaleX;
    canvas.height = crop.h * scaleY;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      img,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.w * scaleX,
      crop.h * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    setResult(canvas.toDataURL("image/png"));
  }

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={700} mb={1}>
          Image Crop
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Upload image, select area, and crop
        </Typography>

        <Paper sx={{ p: 3 }}>
          {/* Upload */}
          <Button variant="contained" component="label">
            Upload Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </Button>

          {/* Image + Crop box */}
          {imgSrc && (
            <Box
              mt={4}
              position="relative"
              display="inline-block"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                style={{ maxWidth: "100%", userSelect: "none" }}
                draggable={false}
              />

              {crop && (
                <Box
                  sx={{
                    position: "absolute",
                    left: crop.x,
                    top: crop.y,
                    width: crop.w,
                    height: crop.h,
                    border: "2px dashed #1976d2",
                    backgroundColor: "rgba(25,118,210,0.15)",
                    pointerEvents: "none",
                  }}
                />
              )}
            </Box>
          )}

          {/* Crop button */}
          {crop && (
            <Box mt={3}>
              <Button variant="contained" onClick={doCrop}>
                Crop Image
              </Button>
            </Box>
          )}

          {/* Result */}
          {result && (
            <Box mt={4}>
              <Typography mb={1}>Preview</Typography>

              <Box mb={2}>
                <img src={result} style={{ maxWidth: "100%" }} />
              </Box>

              <Button variant="outlined" href={result} download="cropped.png">
                Download Image
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
