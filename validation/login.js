const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Check for empty fields and convert to empty strings
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // Check for empty fields with Validator
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  // Check if email is not a valid format
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email format is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
