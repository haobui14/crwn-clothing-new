import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../utils/firebase/firebase.utils";

export class ImageUploadService {
  private readonly STORAGE_PATHS = {
    PRODUCTS: "cms/products",
    CATEGORIES: "cms/categories",
    ADMIN_AVATARS: "cms/admin-avatars",
  };

  // Upload image to Firebase Storage
  async uploadImage(
    file: File,
    path: keyof typeof this.STORAGE_PATHS,
    fileName?: string
  ): Promise<string> {
    try {
      console.log("Starting image upload:", {
        fileName: file.name,
        size: file.size,
        type: file.type,
      });

      // Validate file
      if (!file.type.startsWith("image/")) {
        throw new Error("File must be an image");
      }

      // Check file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error("File size must be less than 5MB");
      }

      // Generate unique filename if not provided
      const finalFileName = fileName || `${Date.now()}-${file.name}`;
      const storagePath = `${this.STORAGE_PATHS[path]}/${finalFileName}`;

      console.log("Upload path:", storagePath);

      // Create reference and upload
      const storageRef = ref(storage, storagePath);
      const uploadResult = await uploadBytes(storageRef, file);

      console.log("Upload completed:", uploadResult.metadata.name);

      // Get download URL
      const downloadURL = await getDownloadURL(uploadResult.ref);
      console.log("Download URL generated:", downloadURL);

      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error(
        `Failed to upload image: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  // Delete image from Firebase Storage
  async deleteImage(imageUrl: string): Promise<void> {
    try {
      console.log("Deleting image:", imageUrl);

      // Extract path from URL
      const url = new URL(imageUrl);
      const pathMatch = url.pathname.match(/\/o\/(.+?)(\?|$)/);

      if (!pathMatch) {
        throw new Error("Invalid image URL format");
      }

      const imagePath = decodeURIComponent(pathMatch[1]);
      console.log("Extracted path:", imagePath);

      // Delete from storage
      const storageRef = ref(storage, imagePath);
      await deleteObject(storageRef);

      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      // Don't throw error for image deletion failures
      // as the main data operation might still succeed
    }
  }

  // Upload multiple images
  async uploadMultipleImages(
    files: File[],
    path: keyof typeof this.STORAGE_PATHS
  ): Promise<string[]> {
    try {
      console.log(`Uploading ${files.length} images`);

      const uploadPromises = files.map((file, index) =>
        this.uploadImage(file, path, `${Date.now()}-${index}-${file.name}`)
      );

      const urls = await Promise.all(uploadPromises);
      console.log("All images uploaded successfully");

      return urls;
    } catch (error) {
      console.error("Error uploading multiple images:", error);
      throw error;
    }
  }

  // Compress image before upload (client-side)
  async compressImage(
    file: File,
    maxWidth: number = 800,
    quality: number = 0.8
  ): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        const newWidth = img.width * ratio;
        const newHeight = img.height * ratio;

        // Set canvas dimensions
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              console.log("Image compressed:", {
                original: file.size,
                compressed: compressedFile.size,
                reduction: `${Math.round(
                  (1 - compressedFile.size / file.size) * 100
                )}%`,
              });
              resolve(compressedFile);
            } else {
              reject(new Error("Failed to compress image"));
            }
          },
          "image/jpeg",
          quality
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = URL.createObjectURL(file);
    });
  }
}

export const imageUploadService = new ImageUploadService();
