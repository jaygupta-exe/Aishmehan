"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
  X,
  CheckCircle2,
  RefreshCw,
  Link as LinkIcon,
  Sparkles,
  FileCheck,
} from "lucide-react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Compresses an image file before base64 encoding to keep Firestore / LocalStorage fast and lightweight.
 */
function compressImageToDataUrl(file, maxWidth = 1600, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Export as WebP or JPEG
        const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
        const dataUrl = canvas.toDataURL(mimeType, quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export default function ImageDropzone({
  value = "",
  onChange,
  label = "CERTIFICATE IMAGE / DOCUMENT",
  presets = [],
  storageFolder = "certificates",
  helperText = "Drag & drop high-res certificate image (PNG, JPG, WEBP) or click to browse",
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showManualUrl, setShowManualUrl] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const fileInputRef = useRef(null);

  const processFile = useCallback(
    async (file) => {
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file (PNG, JPG, WEBP, SVG).");
        return;
      }

      setIsUploading(true);
      setUploadStatus("Optimizing & preparing image...");

      try {
        // Step 1: Immediately compress client-side for rapid rendering / fallback
        const optimizedLocalDataUrl = await compressImageToDataUrl(file);

        let finalUrl = "";

        // Step 2: Try uploading to Firebase Storage with a strict 3.5s timeout
        if (storage) {
          try {
            setUploadStatus("Uploading to Firebase Cloud Storage...");
            const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
            const storageRef = ref(
              storage,
              `${storageFolder}/${Date.now()}_${safeName}`
            );

            // 3.5s timeout promise so it never hangs in an infinite spinner
            const timeoutPromise = new Promise((_, reject) =>
              setTimeout(
                () => reject(new Error("Storage upload timed out (using optimized direct image)")),
                3500
              )
            );

            const snapshot = await Promise.race([
              uploadBytes(storageRef, file),
              timeoutPromise,
            ]);
            finalUrl = await getDownloadURL(snapshot.ref);
          } catch (storageError) {
            console.warn(
              "Firebase Storage upload bypassed/failed, using optimized direct image:",
              storageError?.message || storageError
            );
          }
        }

        // Step 3: Use Firebase URL if successful, otherwise use optimized base64
        const resolvedUrl = finalUrl || optimizedLocalDataUrl;

        onChange(resolvedUrl);
        setUploadStatus("Image ready!");
        setTimeout(() => setUploadStatus(""), 2000);
      } catch (err) {
        console.error("Error processing file:", err);
        alert("Failed to process image file. Please try entering a direct image URL.");
      } finally {
        setIsUploading(false);
      }
    },
    [onChange, storageFolder]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const handleClear = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80">
          {label} <span className="text-khaki font-bold">*</span>
        </label>
        <button
          type="button"
          onClick={() => setShowManualUrl(!showManualUrl)}
          className="text-[11px] font-mono text-khaki hover:underline flex items-center space-x-1 cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showManualUrl ? "Hide manual URL" : "Or enter URL / Path"}</span>
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/svg+xml"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Drag & Drop Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !value && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed transition-all duration-200 p-4 sm:p-5 text-center clip-chamfer-btn ${
          isDragging
            ? "border-khaki bg-khaki/15 scale-[1.01] shadow-glow-khaki"
            : value
            ? "border-khaki/60 bg-near-black/90"
            : "border-muted-olive/60 bg-deep-olive/40 hover:border-khaki hover:bg-deep-olive/70 cursor-pointer"
        }`}
      >
        {isUploading ? (
          <div className="py-6 flex flex-col items-center justify-center space-y-2">
            <RefreshCw className="w-8 h-8 text-khaki animate-spin" />
            <p className="font-geo font-bold text-xs uppercase tracking-wider text-khaki">
              {uploadStatus || "Uploading & Processing Certificate Image..."}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsUploading(false);
              }}
              className="mt-2 text-[10px] font-mono text-off-white/60 hover:text-khaki underline cursor-pointer"
            >
              Cancel / Retry
            </button>
          </div>
        ) : value ? (
          /* Image Preview Mode */
          <div className="space-y-3">
            <div className="relative w-full max-h-48 sm:max-h-56 bg-black/80 border border-muted-olive/50 overflow-hidden flex items-center justify-center p-2 group">
              <img
                src={value}
                alt="Certificate preview"
                className="max-h-44 sm:max-h-52 max-w-full object-contain rounded-none shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = "/images/Aisa certificate 2022.png";
                }}
              />
              <div className="absolute top-2 right-2 flex items-center space-x-1.5 bg-near-black/90 p-1 border border-muted-olive/60">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="px-2 py-1 bg-deep-olive hover:bg-khaki hover:text-near-black text-off-white text-[10px] font-mono uppercase transition-colors cursor-pointer"
                  title="Replace Image"
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="p-1 bg-red-950/80 hover:bg-red-800 text-red-300 transition-colors cursor-pointer"
                  title="Remove Image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-off-white/70 px-1">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>IMAGE ATTACHED & READY</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="text-khaki hover:underline cursor-pointer flex items-center space-x-1 uppercase text-[10px]"
              >
                <span>Upload different file</span>
              </button>
            </div>
          </div>
        ) : (
          /* Empty / Upload Prompt Mode */
          <div className="py-5 space-y-2">
            <div className="w-12 h-12 mx-auto bg-deep-olive border border-khaki/50 flex items-center justify-center text-khaki shadow-sm group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="font-geo font-black text-sm uppercase tracking-wider text-off-white">
                DRAG & DROP CERTIFICATE IMAGE HERE
              </p>
              <p className="text-[11px] font-mono text-off-white/60 mt-0.5">
                or <span className="text-khaki font-bold underline">Click to Browse Desktop / Device</span>
              </p>
            </div>
            <div className="text-[10px] font-mono text-off-white/40 uppercase tracking-widest pt-1">
              Supports: PNG, JPG, JPEG, WEBP, SVG • Auto-Optimized
            </div>
          </div>
        )}
      </div>

      {/* Optional Manual URL / Path Input (Toggleable) */}
      {showManualUrl && (
        <div className="bg-near-black/80 border border-muted-olive/50 p-3 space-y-2">
          <label className="block text-[11px] font-mono uppercase text-off-white/70">
            Direct Image URL or Local Public Path
          </label>
          <input
            type="text"
            placeholder="/images/Aisa certificate 2022.png or https://..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white font-mono text-xs focus:outline-none focus:border-khaki"
          />
        </div>
      )}

      {/* Quick Presets if provided */}
      {presets && presets.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] font-mono uppercase text-off-white/50">Quick Presets:</span>
          {presets.map((preset) => (
            <button
              type="button"
              key={preset.path}
              onClick={() => onChange(preset.path)}
              className={`px-2 py-0.5 border text-[10px] font-mono transition-colors cursor-pointer ${
                value === preset.path
                  ? "bg-khaki text-near-black border-khaki font-bold"
                  : "bg-deep-olive hover:bg-khaki/20 border-muted-olive text-off-white/70"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
