require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGO_URL;

const connectToDb = (callback) => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
      callback();
    })
    .catch((err) => {
      console.error("Database connection error:", err);
      callback(err);
    });
};

const getDb = () => mongoose.connection;

module.exports = {
  connectToDb,
  getDb,
};
