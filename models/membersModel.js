const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema({
  name: 
  {
    type: String,
    required: true,
    minlength: 3,
  },
  instrument: 
  {
    type: String,
    required: true,
    minlength: 3,
  },
  distance: 
  {
    type: Number,
    required: true,
  },
  colour: 
  {
    type: String,
    required: true,
  },
  biography: 
  {
    type: String,
    required: true,
  },
  avatar: 
  {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Member", memberSchema);