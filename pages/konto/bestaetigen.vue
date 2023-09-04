<template>
  <div>
    <h1 class="text-3xl mb-2 sm:mb-4">Konto bestätigen</h1>
    <p class="mb-4">Wir haben Ihnen eine Bestätigungsnachricht an <b>{{ currentEmail }}</b> geschickt. Bitte überprüfen Sie Ihren Posteingang/Spam-Ordner und klicken Sie auf den Link in der E-Mail, um Ihr Konto freizuschalten.</p>
    <Btn class="w-max" :is-loading="isResending" @click="resendEmail">Ich habe keine E-Mail erhalten</Btn>
  </div>
</template>

<script>
export default {
  name: 'BestaetigenPage',
  head() {
    return {
      title: 'Konto bestätigen - Traumanwalt'
    }
  },
  data() {
    return {
      isResending: false
    }
  },
  computed: {
    currentEmail() {
      if (!this.$fire.auth.currentUser) return null
      return this.$fire.auth.currentUser.email
    }
  },
  methods: {
    async resendEmail() {
      this.isResending = true
      try {
        await this.$fire.auth.currentUser.sendEmailVerification({
          url: 'https://traumanwalt.com/bestaetigen'
        })
        this.$toast.success(`Wir haben Ihnen eine Bestätigungsnachricht an ${this.$fire.auth.currentUser.email} geschickt`)
        this.isResending = false
      } catch (e) {
        this.$toast.error(e)
        this.isResending = false
      }
    }
  }
}
</script>

<style>
</style>
