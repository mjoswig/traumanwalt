export default {
  async nuxtServerInit({ dispatch }, ctx) {
    // get the verified auth user on the server
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user

      await dispatch('onAuthStateChanged', {
        authUser,
        claims,
      })
    }
  },

  async onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
    if (authUser && authUser.getIdToken) {
      try {
        // const idToken = await authUser.getIdToken(true)
        // console.info('idToken', idToken)
        await authUser.getIdToken(true)
      } catch (e) {
        console.error(e)
      }
    }
    commit('SET_AUTH_USER', { authUser })
  }
}