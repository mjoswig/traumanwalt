<template>
  <div class="flex flex-col items-center justify-center">
    <div class="w-full" style="max-width: 400px;">
      <h2 class="text-center">Passwort zurücksetzen</h2>
      <p class="mt-3">Bitte geben Sie Ihre E-Mail-Adresse ein, um eine Nachricht mit Anweisungen zum Zurücksetzen Ihres Passwortes zu erhalten.</p>
      <form class="mt-4" @submit.prevent>
        <fieldset class="mb-4 md:mb-8">
          <label class="font-bold block">E-Mail-Adresse</label>
          <input class="border px-2 py-1 rounded-md w-full" type="email" v-model="email" required />
        </fieldset>
        <fieldset>
          <Btn class="w-full" :is-disabled="!isValidEmail" :is-loading="isResetting" @click="resetPassword">Bestätigen</Btn>
        </fieldset>
      </form>
      <p class="mt-4">oder <nuxt-link class="font-bold" to="/login">mit Zugangsdaten einloggen</nuxt-link></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswortZuruecksetzenPage',
  head() {
    return {
      title: 'Passwort zurücksetzen - Traumanwalt',
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  },
  data() {
    return {
      isResetting: false,
      email: ''
    }
  },
  computed: {
    isValidEmail() {
      return this.email !== '' && this.email.indexOf('@') !== -1
    }
  },
  methods: {
    async resetPassword() {
      if (this.isValidEmail) {
        try {
          this.isResetting = true

          await this.$fire.auth.sendPasswordResetEmail(this.email)
          this.$toast.success(`Wir haben Ihnen eine E-Mail an ${this.email} mit Anweisungen zur Änderung Ihres Passwortes geschickt!`)

          this.email = ''
          this.isResetting = false
        } catch (e) {
          this.isResetting = false
          this.$toast.error(e)
        }
      }
    }
  }
}
</script>

<style>
</style>
