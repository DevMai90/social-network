// Using axios.default. Set default header with axios.
// We can call this function and it will always attach the authorization header
import axios from 'axios';

const setAuthToken = token => {
  // If token exists
  if (token) {
    // Set token to every every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete Authorization header
    delete axios.headers.common['Authorization'];
  }
};

export default setAuthToken;
