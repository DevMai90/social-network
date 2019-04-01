const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  // data is an object of things to validate - req.body
  let errors = {};

  // If they send the request without the name field, it's not going to be an empty string.
  // If we test for something to be empty, it must first be an empty STRING.
  // Using our custom isEmpty() - Note, not on Validator
  data.name = !isEmpty(data.name) ? data.name : '';

  // Validating name field. (name, to be validated against)
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  // Check if name field is empty
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
