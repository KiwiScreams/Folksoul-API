const Joi = require("joi");
const socialMediaSchema = Joi.object({
  mediaName: Joi.string().min(2).required().messages({
    "string.base": `"mediaName" should be a type of 'text'`,
    "string.empty": `mediaName cannot be an empty field`,
    "string.min": `"mediaName" should have a minimum length of {#limit}`,
    "any.required": `"mediaName" is a required field`,
  }),
  mediaLink: Joi.string().uri().required().messages({
    "string.base": `"mediaLink" should be a type of 'text'`,
    "string.empty": `"mediaLink" cannot be an empty field`,
    "string.uri": `"mediaLink" must be a valid URI`,
    "any.required": `"mediaLink" is a required field`,
  }),
  mediaIcon: Joi.string()
    .uri()
    .pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))$/i)
    .required()
    .messages({
      "string.base": `"mediaIcon" should be a type of 'text'`,
      "string.empty": `"mediaIcon" cannot be an empty field`,
      "string.uri": `"mediaIcon" must be a valid URI`,
      "string.pattern.base": `"mediaIcon" must be a valid image URL (png, jpg, jpeg, gif, bmp, webp, svg)`,
      "any.required": `"mediaIcon" is a required field`,
    }),
});

module.exports = socialMediaSchema;
