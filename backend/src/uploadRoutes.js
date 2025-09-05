// uploadRoutes.js
import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// ----- Multer Setup -----
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store in "public" folder so files are accessible
    cb(null, path.join("public", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "audio/mpeg",
    "audio/wav",
  ];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

// ----- Simple Auth Middleware -----
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized - Please log in" });
  }
}

// ----- Routes -----

// Public: URL
router.post("/submit-url", (req, res) => {
  const { url } = req.body;
  //   if (!url) return res.status(400).json({ message: "URL is required" });
  console.log("Received URL:", url);
  res.json({ success: true, message: "URL received successfully" });
});

// Public: Text
router.post("/submit-text", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: "Text is required" });
  console.log("Received Text:", text);
  res.json({ success: true, message: "Text received successfully" });
});

// Protected: QR Code
router.post(
  "/submit-qrcode",
  isAuthenticated,
  upload.single("file"),
  (req, res) => {
    if (!req.file)
      return res.status(400).json({ message: "QR code is required" });
    console.log("QR Code uploaded:", req.file.path);
    res.json({
      success: true,
      message: "QR code uploaded successfully",
      filePath: `/uploads/${req.file.filename}`,
    });
  }
);

// Protected: Audio
router.post(
  "/submit-audio",
  isAuthenticated,
  upload.single("file"),
  (req, res) => {
    if (!req.file)
      return res.status(400).json({ message: "Audio file is required" });
    console.log("Audio uploaded:", req.file.path);
    res.json({
      success: true,
      message: "Audio uploaded successfully",
      filePath: `/uploads/${req.file.filename}`,
    });
  }
);

export default router;
