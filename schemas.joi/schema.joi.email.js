const Joi = require("joi");

const schemaEmail = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

module.exports = { schemaEmail };
