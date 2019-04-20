import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  PROFILE_NOT_FOUND,
  GET_ERRORS
} from './types';

export const getCurrentProfile = () => dispatch => {
  dispatch(profileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Profile loading
export const profileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
