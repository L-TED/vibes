const Joi = require("joi");

const dogSchema = Joi.object({
  name: Joi.string().required(),
  breed: Joi.string().required(),
  age: Joi.number().required(),
});

module.exports = dogSchema;
