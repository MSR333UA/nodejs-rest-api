const Joi = require('joi');

const addSchema = Joi.object({
  //   name: Joi.string().alphanum().min(3).max(30).required(),
  //   email: Joi.string().email({
  //     minDomainSegments: 2,
  //     tlds: { allow: ["com", "net"] },
  //   }),
  //   phone: Joi.string()
  //     .regex(/^[0-9]{10}$/)
  //     .messages({
  //       "string.pattern.base": `Phone number must have 10 digits.`,
  //     })
  //     .required(),

  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
      .pattern(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)
      .required(),
  password: Joi.string().min(6).required(),
});
const resendVerificationSchema = Joi.object({
  email: Joi.string()
      .pattern(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)
      .required(),
});

module.exports = {
  addSchema,
  updateFavoriteSchema,
  registerSchema,
  resendVerificationSchema,
};
