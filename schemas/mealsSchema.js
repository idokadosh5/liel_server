const Joi = require('joi');

const validationOptions = {
  stripUnknown:true,
  abortEarly:false,
}

const schemas = {
  createNewMeal:
    Joi.object().keys({
      name: Joi.string().required(),
      type: Joi.string().required(),
      price: Joi.string().required(),
      description: Joi.string().optional(),
      image: Joi.object().keys({
        url: Joi.string().required(),
        alt: Joi.string().optional(),
      }),
    }).options(validationOptions),

  updateMeal:
  Joi.object().keys({
    name: Joi.string().optional(),
    type: Joi.string().optional(),
    price:Joi.string().optional(),
    description: Joi.string().optional(),
    image: Joi.object().keys({
      url: Joi.string().optional(),
      alt: Joi.string().optional(),
    }),
  }).options(validationOptions).min(1).message("The request's body must include at-least one valid key"),

  searchMeal: Joi.object().keys({
    searchTerm: Joi.string().min(3).max(30).required(),
    searchFields: Joi.array()
      .items(Joi.string().valid("name", "type", "description"))  
      .min(1)
      .required(),
  }).options(validationOptions),
}

module.exports = schemas;