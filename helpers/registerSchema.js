const Joi = require("joi");

//#region person

//#region location
const streetSchema = Joi.object({
  name: Joi.string().allow(""),
  number: Joi.string().allow(""),
});

const citySchema = Joi.object({
  name: Joi.string().allow(""),
  zipCode: Joi.string().allow(""),
});

const countrySchema = Joi.object({
  fullName: Joi.string().allow(""),
  code: Joi.string().allow(""),
});

const locationSchema = Joi.object({
  country: countrySchema,
  city: citySchema,
  street: streetSchema,
});
//#endregion

const nameSchema = Joi.object({
  firstName: Joi.string()
    .allow("")
    .regex(/^([^0-9\.\-\_]*)$/)
    .required(),
  lastName: Joi.string()
    .regex(/^([^0-9\.\-\_]*)$/)
    .required(),
});
const personSchema = Joi.object({
  gender: Joi.string().allow("").valid("male", "female", "diverse").required(),
  birthday: Joi.date().required(),
  name: nameSchema.required(),
  location: locationSchema,
});
//#endregion
//#region info
const phoneSchema = Joi.object({
  prefix: Joi.string().allow(""),
  number: Joi.string().allow(""),
});

const infoSchmea = Joi.object({
  email: Joi.string().email().required(),
  phone: phoneSchema,
  password: Joi.string()
    .allow("")
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .required(),
});
//#endregion
const registerSchema = Joi.object({
  username: Joi.string()
    .allow("")
    .regex(/(?!.*[\.\-\_]{2,})^[a-z0-9\.\-\_]{3,24}$/)
    .required(),
  person: personSchema,
  info: infoSchmea.required(),
});

module.exports.registerSchema = registerSchema;
