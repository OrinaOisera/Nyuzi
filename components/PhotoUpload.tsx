"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";

interface PhotoUploadProps {
  photoUrl: string | null;
  onPhotoChange: (url: string | null) => void;
}

const MAX_SIZE_MB = 8;
const ACCEPT = "image/jpeg,image/png,image/webp";

export function PhotoUpload({ photoUrl, onPhotoChange }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (photoUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  function handleFile(file: File | null) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a JPEG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`Image must be under ${MAX_SIZE_MB} MB.`);
      return;
    }

    if (photoUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(photoUrl);
    }

    onPhotoChange(URL.createObjectURL(file));
  }

  function clearPhoto() {
    if (photoUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(photoUrl);
    }
    onPhotoChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl bg-white/70 p-3 ring-1 ring-stone-200/80">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => inputRef.current?.click()}
      >
        {photoUrl ? "Change photo" : "Upload your photo"}
      </Button>
      {photoUrl && (
        <Button type="button" variant="ghost" size="sm" onClick={clearPhoto}>
          Remove
        </Button>
      )}
      <span className="text-xs text-nyuzi-muted">Full-body photo works best</span>
    </div>
  );
}
