import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Alert,
  IconButton,
  Card,
  CardMedia,
  CardActions,
  FormControlLabel,
  Switch,
} from "@mui/material";
import {
  CloudUpload,
  Delete as DeleteIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import { imageUploadService } from "../image-upload.service";

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
  onImageDeleted?: () => void;
  currentImageUrl?: string;
  path: "PRODUCTS" | "CATEGORIES" | "ADMIN_AVATARS";
  accept?: string;
  maxSize?: number; // in MB
  compress?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUploaded,
  onImageDeleted,
  currentImageUrl,
  path,
  accept = "image/*",
  maxSize = 5,
  compress = true,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    try {
      setUploading(true);
      setUploadProgress(0);
      setError(null);

      console.log("Starting upload for file:", file.name);

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        throw new Error(`File size must be less than ${maxSize}MB`);
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        throw new Error("Please select a valid image file");
      }

      setUploadProgress(25);

      // Compress image if enabled
      let fileToUpload = file;
      if (compress && file.size > 500 * 1024) {
        // Compress if > 500KB
        console.log("Compressing image...");
        fileToUpload = await imageUploadService.compressImage(file);
        setUploadProgress(50);
      }

      setUploadProgress(75);

      // Upload to Firebase Storage
      const imageUrl = await imageUploadService.uploadImage(fileToUpload, path);

      setUploadProgress(100);

      console.log("Upload successful:", imageUrl);
      onImageUploaded(imageUrl);
    } catch (error) {
      console.error("Upload error:", error);
      setError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteImage = async () => {
    if (!currentImageUrl) return;

    try {
      await imageUploadService.deleteImage(currentImageUrl);
      onImageDeleted?.();
    } catch (error) {
      console.error("Delete error:", error);
      setError("Failed to delete image");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {currentImageUrl && !uploading && (
        <Card sx={{ mb: 2, maxWidth: 300 }}>
          <CardMedia
            component="img"
            height="200"
            image={currentImageUrl}
            alt="Current image"
            sx={{ objectFit: "cover" }}
          />
          <CardActions>
            <Button size="small" onClick={() => fileInputRef.current?.click()}>
              Replace
            </Button>
            {onImageDeleted && (
              <IconButton
                size="small"
                color="error"
                onClick={handleDeleteImage}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </CardActions>
        </Card>
      )}

      {!currentImageUrl && (
        <Box
          sx={{
            border: "2px dashed",
            borderColor: dragOver ? "primary.main" : "grey.300",
            borderRadius: 2,
            p: 4,
            textAlign: "center",
            cursor: "pointer",
            bgcolor: dragOver ? "primary.50" : "transparent",
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: "primary.50",
            },
          }}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <ImageIcon sx={{ fontSize: 48, color: "grey.400", mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {uploading ? "Uploading..." : "Upload Image"}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Drag & drop an image here, or click to select
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Maximum file size: {maxSize}MB • Supported: JPG, PNG, GIF
          </Typography>
        </Box>
      )}

      {uploading && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {uploadProgress < 25 && "Preparing upload..."}
            {uploadProgress >= 25 &&
              uploadProgress < 50 &&
              "Validating file..."}
            {uploadProgress >= 50 &&
              uploadProgress < 75 &&
              "Compressing image..."}
            {uploadProgress >= 75 &&
              uploadProgress < 100 &&
              "Uploading to cloud..."}
            {uploadProgress === 100 && "Upload complete!"}
          </Typography>
        </Box>
      )}

      {currentImageUrl && (
        <FormControlLabel
          control={<Switch size="small" />}
          label="Compress images (recommended)"
          checked={compress}
          disabled
          sx={{ mt: 1 }}
        />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={(e) => handleFileSelect(e.target.files)}
        style={{ display: "none" }}
      />

      <Button
        variant="outlined"
        startIcon={<CloudUpload />}
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        sx={{ mt: 2, display: currentImageUrl ? "none" : "inline-flex" }}
      >
        Choose File
      </Button>
    </Box>
  );
};

export default ImageUpload;
