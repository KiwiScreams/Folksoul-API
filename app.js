const express = require("express");
const { getDb, connectToDb } = require("./db");
const { ObjectId } = require("mongodb");

const SocialMedia = require("./models/socialMediaModel");
const Band = require("./models/bandModel");
const Member = require("./models/membersModel");

const socialMediaSchema = require("./validations/socialMediaValidation");
const bandValidationSchema = require("./validations/bandValidation");
const memberValidationSchema = require("./validations/membersValidation");

const bandMembers = "bandMembers";
const socialMedia = "socialMedia";

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

app.get("/socialmedia", async (req, res) => {
  try {
    const socialLinks = await db
      .collection(socialMedia)
      .find()
      .sort({ mediaName: 1 })
      .toArray();
    res.status(200).json(socialLinks);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch the social media" });
  }
});

app.get("/socialmedia/:id", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    try {
      const doc = await db
        .collection(socialMedia)
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

app.post("/socialmedia", async (req, res) => {
  const { error } = socialMediaSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const newLink = new SocialMedia(req.body);
    await db.collection(socialMedia).insertOne(newLink);
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ error: "Could not create new document" });
  }
});

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
      .collection(socialMedia)
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

app.delete("/socialmedia/:id", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    try {
      const result = await db
        .collection(socialMedia)
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

app.get("/band", async (req, res) => {
  try {
    const band = await db.collection("band").findOne();
    if (!band) {
      return res.status(404).json({ error: "Band not found" });
    }
    res.status(200).json(band);
  } catch (error) {
    console.error("Error fetching band:", error.message);
    res.status(500).json({ error: "Could not fetch band" });
  }
});

app.put("/band", async (req, res) => {
  const { error } = bandValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const result = await db.collection("band").replaceOne({}, req.body);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Band not found" });
    }

    res.status(200).json({ message: "Band updated successfully" });
  } catch (error) {
    console.error("Error updating band:", error.message);
    res.status(500).json({ error: "Could not update band" });
  }
});

app.get("/members", async (req, res) => {
  try {
    const members = await db.collection(bandMembers).find().toArray();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch members" });
  }
});

app.get("/members/:id", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    try {
      const member = await db
        .collection(bandMembers)
        .findOne({ _id: new ObjectId(req.params.id) });
      if (!member) return res.status(404).json({ error: "Member not found" });
      res.status(200).json(member);
    } catch (error) {
      res.status(500).json({ error: "Could not fetch the member" });
    }
  } else {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

app.post("/members", async (req, res) => {
  const { error } = memberValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const newMember = new Member(req.body);
    await db.collection(bandMembers).insertOne(newMember);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: "Could not create new member" });
  }
});

app.put("/members/:id", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const { error } = memberValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const result = await db
        .collection(bandMembers)
        .replaceOne({ _id: new ObjectId(req.params.id) }, req.body);

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Member not found" });
      }
      res.status(200).json({ message: "Member replaced successfully" });
    } catch (error) {
      res.status(500).json({ error: "Could not replace member" });
    }
  } else {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

app.delete("/members/:id", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    try {
      const result = await db
        .collection(bandMembers)
        .deleteOne({ _id: new ObjectId(req.params.id) });
      if (result.deletedCount === 0)
        return res.status(404).json({ error: "Member not found" });
      res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Could not delete member" });
    }
  } else {
    res.status(400).json({ error: "Invalid ID format" });
  }
});
