import { ActionTypes } from 'modules/auth/constants';
import produce from 'immer';


const defaultState = {
  jwt: {
    data: undefined,
    status: undefined,
  }
};

const loginSuccess = (newState, { token }) => {
  newState.jwt.data = token;
  newState.jwt.status = ActionTypes.LOGIN_SUCCESS;

  return newState;
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return produce(state, draftState => loginSuccess(draftState, action.payload))
    default:
      return state;
  }
};