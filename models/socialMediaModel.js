const mongoose = require("mongoose");
const socialMediaSchema = new mongoose.Schema({
  mediaName:
  {
    type: String,
    required: true,
  },
  mediaLink:
  {
    type: String,
    required: true,
  },
  mediaIcon:
  {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("SocialMedia", socialMediaSchema);