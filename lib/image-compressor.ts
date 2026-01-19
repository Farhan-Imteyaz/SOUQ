"use client";

import imageCompression from "browser-image-compression";

type CompressOptions = {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  quality?: number;
};

type CompressResult = {
  files: File[];
  failed: string[];
};

export async function compressImages(
  input: File | File[],
  options?: CompressOptions
): Promise<File | File[] | CompressResult> {
  if (typeof window === "undefined") {
    throw new Error("compressImages must be called on the client");
  }

  const files = Array.isArray(input) ? input : [input];
  const failed: string[] = [];

  const compressionOptions = {
    maxSizeMB: options?.maxSizeMB ?? 1,
    maxWidthOrHeight: options?.maxWidthOrHeight ?? 1920,
    initialQuality: options?.quality ?? 0.8,
    useWebWorker: true,
  };

  const compressed = await Promise.all(
    files.map(async (file) => {
      try {
        return await imageCompression(file, compressionOptions);
      } catch (err) {
        console.error(`Compression failed for ${file.name}`, err);
        failed.push(file.name);
        return file; // fallback
      }
    })
  );

  if (!Array.isArray(input)) {
    return compressed[0];
  }

  return { files: compressed, failed };
}
