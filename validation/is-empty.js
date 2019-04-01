// We must compare strings in Validator.
// This function checks if it is empty - Returns boolean

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().trim.length === 0);

module.exports = isEmpty;
