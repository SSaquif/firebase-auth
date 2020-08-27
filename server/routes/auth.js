const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

require("dotenv").config();

const MongoURI = process.env.MONGO_URI;
console.log(MongoURI);

const MongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

router.post("/googleSignIn", async (req, res) => {
  const client = await MongoClient(MongoURI, MongoOptions);
  const { uid, displayName, email } = req.body;
  console.log("email", email);
  try {
    await client.connect();
    const db = client.db("ss-blog");
    let matchedUsers = await db
      .collection("users")
      .find({ email: email })
      .toArray();

    // If no user found
    if (matchedUsers.length === 0) {
      const insertResult = await db
        .collection("users")
        .insertOne({ uid, displayName, email });
      assert.equal(1, insertResult.insertedCount);
    }

    res.status(200).json({ dbStatus: "working" });
  } catch (err) {
    console.log("Error Message::", err.message);
    console.log("Error Stack", err.stack);
    res.status(500).json({ status: "500", message: err.message });
  } finally {
    await client.close();
  }
});

module.exports = router;
