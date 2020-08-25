const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

console.log(`${process.cwd()}/uploads`);

require("dotenv").config();

router.post("/updateProfile", upload.single("file1"), (req, res) => {
  console.log("hello");
  console.log(req.file);
  console.log(req.body);
  res.json({ text: "text" });
});

module.exports = router;
