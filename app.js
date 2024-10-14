const express = require("express");
const { getDb, connectToDb } = require("./db");
const { ObjectId } = require("mongodb");

// models
const SocialMedia = require("./models/socialMediaModel");

// validations
const socialMediaSchema = require("./validations/socialMediaValidation");

const app = express();
app.use(express.json());
let db;
connectToDb((err) => {
  if (err) {
    console.error("Failed to connect to the database");
    return;
  }
  db = getDb();
  app.listen(3000, () => {
    console.log("App listening on port 3000");
  });
});
// SOCIAL MEDIA
// Get all social media
app.get("/socialmedia", async (req, res) => {
  try {
    const socialLinks = await db
      .collection("socialMedia")
      .find()
      .sort({ mediaName: 1 })
      .toArray();
    res.status(200).json(socialLinks);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch the social media" });
  }
});
