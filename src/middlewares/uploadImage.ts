import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";
import { Request } from "express";
import path from "path";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => ({
    folder: "products",
    public_id: Date.now() + "-" + path.parse(file.originalname).name,
  }),
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: any) => {
  const allowedFormats = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml",
    "image/heic",
    "image/heif",
  ];

  if (allowedFormats.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // max 5MB
  },
});
