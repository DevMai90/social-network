const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  // data is an object of things to validate - req.body
  let errors = {};

  // If they send the request without the name field, it's not going to be an empty string.
  // If we test for something to be empty, it must first be an empty STRING.
  // Using our custom isEmpty() - Note, not on Validator
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // Validating name field. (name, to be validated against)
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';

    // Check if name field is empty
    if (Validator.isEmpty(data.name)) {
      errors.name = 'Name field is required';
    }
  }

  // Check if email field is empty
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  // Check if email field is a valid email
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email format is invalid';
  }

  // Validating password field.
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters';
  }

  // Check if password field is empty
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  // Check if passwords match
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  // Check if password2 field is empty
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
