const authMiddleware = async ({ app, redirect, route, store }) => {
  const loggedIn = store.getters.isLoggedIn
  const onLoginPage = route.path === '/login' || route.path === '/registrieren' || route.path === '/passwort-anfordern'
  const onVisitorPage = !route.path.startsWith('/konto')

  if (!loggedIn) {
    if (onVisitorPage || onLoginPage) return
    // redirect user to login page if he is not logged in and tries to access an internal page
    return redirect('/login')
  } else {
    const emailVerified = store.state.authUser.emailVerified
    if (!emailVerified && !onVisitorPage && route.path !== '/konto/logout' && route.path !== '/konto/bestaetigen') {
      return redirect('/konto/bestaetigen')
    }

    if (onLoginPage || (emailVerified && route.path === '/konto/bestaetigen')) {
      // redirect user to account page if he is logged in and wants to access certain pages
      return redirect('/konto')
    }

    // fetch account data related to the user
    let userData = await app.$axios.$get(`/api/users/${store.state.authUser.uid}`)

    // update user data
    store.commit('SET_USER_DATA', userData)

    // synchronize firebase email with database email
    if (emailVerified && userData.email !== store.state.authUser.email) {
      await app.$axios.$post('/api/users/update', {
        ...userData,
        email: store.state.authUser.email
      })
    }
  }
}

export default authMiddleware