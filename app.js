const express = require("express");
const { getDb, connectToDb } = require("./db");
const { ObjectId } = require("mongodb");
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
