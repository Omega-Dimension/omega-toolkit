import { useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { Box, CircularProgress, Typography } from "@mui/material";

type Props = {
  accept: string;
};

export default function Mp3Converter({ accept }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const ffmpegRef = useRef<FFmpeg | null>(null);

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

      const blob = new Blob([new Uint8Array(data as Uint8Array)], {
        type: "audio/mp3",
      });

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
    <Box>
      <input
        type="file"
        accept={accept}
        onChange={(e) => e.target.files && convert(e.target.files[0])}
      />

      {loading && (
        <Box mt={2}>
          <CircularProgress />
          <Typography mt={1}>Converting...</Typography>
        </Box>
      )}
    </Box>
  );
}
