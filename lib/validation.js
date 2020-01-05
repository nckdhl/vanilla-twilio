const Joi = require("@hapi/joi");

// Login Validation

const loginValidation = data => {

    const schema = Joi.object({
        email: Joi
          .string()
          .email()
          .required(),
        password: Joi
          .string()
          .min(6)
          .required()
      });
    
    return schema.validate(data);
      
}

module.exports.loginValidation = loginValidation;

// Registration Validation

const registerValidation = data => {

    const schema = Joi.object({
        firstName: Joi
          .string()
          .min(1)
          .required(),
        lastName: Joi
          .string()
          .min(2)
          .required(),
        email: Joi
          .string()
          .email()
          .required(),
        password: Joi
          .string()
          .min(6)
          .required()
      });
    
    return schema.validate(data);
      
}

module.exports.registerValidation = registerValidation;