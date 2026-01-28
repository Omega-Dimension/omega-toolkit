import { useState } from "react";

export default function JpgToPng() {
  const [preview, setPreview] = useState<string>("");

  function handleFile(file: File) {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const png = canvas.toDataURL("image/png");
      setPreview(png);
    };
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">JPG to PNG</h1>
      <p className="text-gray-500 mb-6">Convert JPG images to PNG format</p>

      <input
        type="file"
        accept="image/jpeg"
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
      />

      {preview && (
        <div className="mt-6">
          <img src={preview} className="max-w-sm mb-3" />
          <a
            href={preview}
            download="converted.png"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Download PNG
          </a>
        </div>
      )}
    </div>
  );
}
