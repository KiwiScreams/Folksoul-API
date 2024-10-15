const mongoose = require("mongoose");
const bandchema = new mongoose.Schema({
  bandTitle: 
  {
    type: String,
    required: true,
  },
  bandDescription:
  {
    type: String,
    required: true,
  },
  bandIcon:
  {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("bandchema", bandchema);