const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const { MongoClient, ObjectID } = require("mongodb");
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
          metadata: { id: req.body.text },
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

router.get("/gridSingleFileRetrieval/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const client = await MongoClient(MongoURI, MongoOptions);

  try {
    await client.connect();
    const db = client.db("firebase-auth-mongo-gridFS");
    // const gridfs = Grid(db,mongo)
    // const readStream = gridfs.createReadStream();

    const matchedFilesData = await db
      .collection("fileUploads.files")
      .find({ "metadata.id": id })
      .toArray();

    console.log(matchedFilesData);

    for (const file of matchedFilesData) {
      const fileId = ObjectID(file._id);
      console.log("fileId", fileId);

      const fileChunks = await db
        .collection("fileUploads.chunks")
        .find({ files_id: ObjectID(file._id) })
        .sort({ n: 1 })
        .toArray();

      console.log(fileChunks);
      //change to reduce if this works
      let data = "";
      fileChunks.forEach((chunk) => {
        data += chunk.toString("base64");
      });
      console.log(data);
      //This has to be outside, or multiple
      return res.send(data);
    }
    res.status(200).json({ status: "200", message: "done" });
  } catch (err) {
    console.log("Error Message::", err.message);
    console.log("Error Stack", err.stack);
    res.status(500).json({ status: "500", message: err.message });
  } finally {
    await client.close();
  }
});

module.exports = router;
