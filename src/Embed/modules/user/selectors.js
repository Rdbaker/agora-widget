const root = state => state.user;

const defaultUser = {
  username: 'Member',
  id: 0,
}

const currentUser = state => root(state).currentUser;
const byIdRoot = state => root(state).byId;

export const isLoggedIn = state => !!currentUser(state).data;
export const getUser = (state, userId) => byIdRoot(state)[userId] || defaultUser