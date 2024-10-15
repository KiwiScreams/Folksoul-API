const Joi = require("joi");
const bandchema = Joi.object({
  bandTitle: Joi.string().min(3).required().messages({
    "string.base": `"bandTitle" should be a type of 'text'`,
    "string.empty": `"bandTitle" cannot be an empty field`,
    "string.min": `"bandTitle" should have a minimum length of {#limit}`,
    "any.required": `"bandTitle" is a required field`,
  }),
  bandDescription: Joi.string().min(50).required().messages({
    "string.base": `"bandDescription" should be a type of 'text'`,
    "string.empty": `"bandDescription" cannot be an empty field`,
    "string.min": `"bandDescription" should have a minimum length of {#limit}`,
    "any.required": `"bandDescription" is a required field`,
  }),
  bandIcon: Joi.string()
    .uri()
    .pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))$/i)
    .required()
    .messages({
      "string.base": `"bandIcon" should be a type of 'text'`,
      "string.empty": `"bandIcon" cannot be an empty field`,
      "string.uri": `"bandIcon" must be a valid URI`,
      "string.pattern.base": `"bandIcon" must be a valid image URL (png, jpg, jpeg, gif, bmp, webp, svg)`,
      "any.required": `"bandIcon" is a required field`,
    }),
});

module.exports = bandchema;
