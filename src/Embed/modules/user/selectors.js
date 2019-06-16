const root = state => state.user

const currentUser = state => root(state).currentUser

export const isLoggedIn = state => !!currentUser(state).data