import { merge } from 'ramda';

import { ActionTypes } from 'modules/auth/constants';


const defaultState = {
  jwt: {
    data: undefined,
    status: undefined,
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};