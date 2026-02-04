import { useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

type FormatType = "mp4" | "wav" | "audio";

export default function Mp3ConverterPage() {
  const [format, setFormat] = useState<FormatType>("mp4");
  const [loading, setLoading] = useState<boolean>(false);
  const ffmpegRef = useRef<FFmpeg | null>(null);

  function getAcceptType(): string {
    switch (format) {
      case "mp4":
        return "video/mp4";
      case "wav":
        return "audio/wav";
      case "audio":
        return "audio/*";
      default:
        return "audio/*";
    }
  }

  async function loadFFmpeg() {
    if (!ffmpegRef.current) {
      const ffmpeg = new FFmpeg();
      await ffmpeg.load();
      ffmpegRef.current = ffmpeg;
    }
  }

  async function convert(file: File) {
    try {
      setLoading(true);

      await loadFFmpeg();
      const ffmpeg = ffmpegRef.current!;

      await ffmpeg.writeFile(file.name, await fetchFile(file));
      await ffmpeg.exec(["-i", file.name, "output.mp3"]);

      const data = await ffmpeg.readFile("output.mp3");

      const blob = new Blob(
        [new Uint8Array(data as Uint8Array)],
        { type: "audio/mp3" }
      );

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.mp3";
      a.click();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="md">
        <Typography variant="h4" mb={1}>
          MP3 Converter
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Convert MP4, WAV or any audio file to MP3 directly in your browser.
        </Typography>

        <Paper sx={{ p: 3 }}>
          {/* Format Selector */}
          <Box mb={3}>
            <ToggleButtonGroup
              value={format}
              exclusive
              onChange={(_, value) => value && setFormat(value)}
            >
              <ToggleButton value="mp4">MP4 → MP3</ToggleButton>
              <ToggleButton value="wav">WAV → MP3</ToggleButton>
              <ToggleButton value="audio">Audio → MP3</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* File Input */}
          <input
            type="file"
            accept={getAcceptType()}
            onChange={(e) =>
              e.target.files && convert(e.target.files[0])
            }
          />

          {loading && (
            <Box mt={2}>
              <CircularProgress />
              <Typography mt={1}>Converting...</Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
