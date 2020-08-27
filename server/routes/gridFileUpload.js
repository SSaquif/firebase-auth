const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const methodOverride = require("method-override");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

require("dotenv").config();

const MongoURI = process.env.MONGO_URI;

const MongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const router = express.Router();

const storage = new GridFsStorage({
  url: MongoURI,
  options: MongoOptions,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buffer) => {
        if (err) {
          return reject(err);
        }

        const filename =
          buffer.toString("hex") + path.extname(file.originalname);

        const fileInfo = {
          filename: filename,
          bucketName: "fileUploads", //The gridfs collection to store the file, default fs
          metadata: { name: req.body.text },
        };

        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

router.post("/addSingleFileWithGrid", upload.single("file1"), (req, res) => {
  res.status(201).json({ msg: "file uploaded" });
});

router.get("/gridSingleFileRetrieval/:info", (req, res) => {});

module.exports = router;
