<template>
  <div class="p-16 text-center">
    <p>Wir loggen Sie sicher aus... Bitte haben Sie einen Moment Geduld.</p>
  </div>
</template>

<script>
export default {
  name: 'KontoLogoutPage',
  head() {
    return {
      title: 'Logout - Traumanwalt'
    }
  },
  methods: {
    async logout() {
      try {
        this.$store.commit('RESET_STORE')
        await this.$fire.auth.signOut()
        window.setTimeout(() => {
          window.location.href = '/login'
        }, 1000)
      } catch (e) {
        // logout failed...
      }
    }
  },
  created() {
    this.logout()
  }
}
</script>