const Validator = require('validator');

module.exports = function validateRegisterInput(data) {
  // data is an object of things to validate
  let errors = {};

  // Validating name field. (name, to be validated against)
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  return {
    errors,
    isValid: errors
  };
};
