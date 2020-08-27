const express = require("express");
const fs = require("fs");
const multer = require("multer");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

console.log(`${process.cwd()}/uploads`);

require("dotenv").config();

router.post("/addSingleMulterFile", upload.single("file1"), (req, res) => {
  console.log("hello");
  console.log(req.file);
  console.log(req.body);

  const fileType = req.file.mimetype.split("/")[1];
  console.log(fileType);

  const filename = `${req.file.filename}.${fileType}`;

  fs.rename(`./uploads/${req.file.filename}`, `./uploads/${filename}`, () => {
    res.json({ text: "file uploaded to server/uploads " });
  });
});

module.exports = router;
