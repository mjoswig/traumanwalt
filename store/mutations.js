import initialState from './state'

export default {
  RESET_STORE: (state) => {
    Object.assign(state, initialState())
  },

  SET_AUTH_USER: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
      emailVerified: authUser.emailVerified
    }
  },

  SET_USER_DATA: (state, userData) => {
    state.userData = userData
  }
}