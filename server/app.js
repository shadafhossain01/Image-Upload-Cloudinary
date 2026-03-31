const express = require("express");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const uploadPath = path.resolve("public/uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/image-upload", upload.single("profileImage"), async (req, res) => {
  if (!req.file) {
    return res.json({
      message: "Please Upload a Image",
    });
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "uploads",
  });

  fs.unlinkSync(req.file.path);

  res.json({
    message: "File Uploaded Successfully",
    imageURL: result.secure_url,
  });
  
});

app.listen(PORT, () => console.log("Server created Successfully"));