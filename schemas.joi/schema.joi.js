const Joi = require("joi");

const schemaPostContact = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  favorite: Joi.bool(),
});

const schemaPatchContact = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string(),
  favorite: Joi.bool(),
}).min(1);

// const schemaPatchContact = Joi.object({
//   favorite: Joi.bool().required(),
// });

module.exports = { schemaPostContact, schemaPatchContact };
