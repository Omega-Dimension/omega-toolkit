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

type FormatType = "mp4" | "wav" | "audio" | "mp3-to-wav";

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
      case "mp3-to-wav":
        return "audio/mp3";
      default:
        return "audio/*";
    }
  }

  function getOutputConfig() {
    if (format === "mp3-to-wav") {
      return {
        outputName: "output.wav",
        mimeType: "audio/wav",
        downloadName: "converted.wav",
      };
    }

    return {
      outputName: "output.mp3",
      mimeType: "audio/mp3",
      downloadName: "converted.mp3",
    };
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

      const inputName = file.name;
      const { outputName, mimeType, downloadName } = getOutputConfig();

      await ffmpeg.writeFile(inputName, await fetchFile(file));
      await ffmpeg.exec(["-i", inputName, outputName]);

      const data = await ffmpeg.readFile(outputName);

      const blob = new Blob(
        [new Uint8Array(data as Uint8Array)],
        { type: mimeType }
      );

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = downloadName;
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
          Audio Converter
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Convert MP4, WAV, MP3 or other audio files directly in your browser.
        </Typography>

        <Paper sx={{ p: 3 }}>
          <Box mb={3}>
            <ToggleButtonGroup
              value={format}
              exclusive
              onChange={(_, value) => value && setFormat(value)}
            >
              <ToggleButton value="mp4">MP4 → MP3</ToggleButton>
              <ToggleButton value="wav">WAV → MP3</ToggleButton>
              <ToggleButton value="audio">Audio → MP3</ToggleButton>
              <ToggleButton value="mp3-to-wav">MP3 → WAV</ToggleButton>
            </ToggleButtonGroup>
          </Box>

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
