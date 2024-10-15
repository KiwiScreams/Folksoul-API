const Joi = require("joi");
const memberValidationSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "string.min": `"name" should have a minimum length of {#limit}`,
    "any.required": `"name" is a required field`,
  }),

  instrument: Joi.string().min(3).required().messages({
    "string.base": `"instrument" should be a type of 'text'`,
    "string.empty": `"instrument" cannot be an empty field`,
    "string.min": `"instrument" should have a minimum length of {#limit}`,
    "any.required": `"instrument" is a required field`,
  }),

  distance: Joi.number().greater(0).required().messages({
    "number.base": `"distance" should be a number`,
    "number.greater": `"distance" must be a positive number greater than zero`,
    "any.required": `"distance" is a required field`,
  }),

  colour: Joi.string()
    .pattern(/^#[0-9A-F]{6}$/i)
    .required()
    .messages({
      "string.base": `"colour" should be a type of 'text'`,
      "string.empty": `"colour" cannot be an empty field`,
      "string.pattern.base": `"colour" must be a valid hex color code`,
      "any.required": `"colour" is a required field`,
    }),

  biography: Joi.string().min(50).required().messages({
    "string.base": `"biography" should be a type of 'text'`,
    "string.empty": `"biography" cannot be an empty field`,
    "string.min": `"biography" should have a minimum length of {#limit}`,
    "any.required": `"biography" is a required field`,
  }),

  avatar: Joi.string()
    .uri()
    .pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))$/i)
    .required()
    .messages({
      "string.base": `"avatar" should be a type of 'text'`,
      "string.empty": `"avatar" cannot be an empty field`,
      "string.uri": `"avatar" must be a valid URI`,
      "string.pattern.base": `"avatar" must be a valid image URL (png, jpg, jpeg, gif, bmp, webp, svg)`,
      "any.required": `"avatar" is a required field`,
    }),
});

module.exports = memberValidationSchema;
