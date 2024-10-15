const express = require("express");
const { getDb, connectToDb } = require("./db");
const { ObjectId } = require("mongodb");

// models
const SocialMedia = require("./models/socialMediaModel");
const Band = require("./models/bandModel");

// validations
const socialMediaSchema = require("./validations/socialMediaValidation");
const bandValidationSchema = require("./validations/bandValidation");

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

// Get a social media link by ID
app.get("/socialmedia/:id", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    try {
      const doc = await db
        .collection("socialMedia")
        .findOne({ _id: new ObjectId(req.params.id) });
      if (!doc)
        return res.status(404).json({ error: "Social media link not found" });
      res.status(200).json(doc);
    } catch (error) {
      res.status(500).json({ error: "Could not fetch the social media" });
    }
  } else {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

// Create a new social media link
app.post("/socialmedia", async (req, res) => {
  const { error } = socialMediaSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const newLink = new SocialMedia(req.body);
    await db.collection("socialMedia").insertOne(newLink);
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ error: "Could not create new document" });
  }
});

// Update a social media link
app.put("/socialmedia/:id", async (req, res) => {
  console.log("PUT /socialmedia/:id", req.params.id, req.body);

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const { error } = socialMediaSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const result = await db
      .collection("socialMedia")
      .replaceOne({ _id: new ObjectId(req.params.id) }, req.body);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Social media link not found" });
    }
    res
      .status(200)
      .json({ message: "Social media link replaced successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Could not replace document" });
  }
});

// Delete a social media link
app.delete("/socialmedia/:id", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    try {
      const result = await db
        .collection("socialMedia")
        .deleteOne({ _id: new ObjectId(req.params.id) });
      if (result.deletedCount === 0)
        return res.status(404).json({ error: "Social media link not found" });
      res
        .status(200)
        .json({ message: "Social media link deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Could not delete document" });
    }
  } else {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

// BAND

// Get band
app.get("/band", async (req, res) => {
  try {
    const band = await db.collection("band").find().toArray();
    res.status(200).json(band);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch band" });
  }
});

// Update a band by ID
app.put("/band/:id", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const { error } = bandValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const result = await db
        .collection("band")
        .replaceOne({ _id: new ObjectId(req.params.id) }, req.body);

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Band not found" });
      }
      res.status(200).json({ message: "Band replaced successfully" });
    } catch (error) {
      res.status(500).json({ error: "Could not replace band" });
    }
  } else {
    res.status(400).json({ error: "Invalid ID format" });
  }
});
