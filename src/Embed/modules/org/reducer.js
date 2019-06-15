import { merge } from 'ramda';

import { ActionTypes } from 'modules/org/constants';


const defaultState = {
  org: {
    data: undefined,
    status: undefined,
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.fetchPublicOrgSuccess:
      const org = action.payload;
      return merge(state, { org });
    default:
      return state;
  }
}