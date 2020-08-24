const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;

require("dotenv").config();
console.log("in auth.js", process.env.MONGO_URI);

router.get("/", (req, res) => {
  res.json({ status: "hello" });
});

router.post("/googleSignIn", (req, res) => {});

module.exports = router;
