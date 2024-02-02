<template>
  <div>
    <h1 class="mb-6">Einstellungen</h1>
    <AccountSection heading="E-Mail" class="mb-4">
      <form @submit.prevent>
        <span class="block mb-4">{{ currentEmail }}</span>
        <fieldset class="mb-4">
          <label class="font-bold">Neue E-Mail</label>
          <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihre neue E-Mail-Adresse" type="email" v-model="changeEmailForm.newEmail" />
        </fieldset>
        <fieldset>
          <label class="font-bold">Passwort</label>
          <PasswordInput v-model="changeEmailForm.password" />
        </fieldset>
        <div class="flex justify-end mt-5">
          <Btn :is-disabled="!canUpdateEmail" :is-loading="changeEmailForm.isLoading" @click="updateEmail">E-Mail ändern</Btn>
        </div>
      </form>
    </AccountSection>
    <AccountSection heading="Passwort" class="mb-4">
      <p class="mb-4">Bitte klicken Sie auf "Passwort zurücksetzen", um eine E-Mail an <b>{{ currentEmail }}</b> mit Anweisungen zur Änderung Ihres Passwortes zu erhalten.</p>
      <div class="flex justify-end">
        <Btn :is-loading="resetPasswordForm.isLoading" @click="resetPassword">Passwort zurücksetzen</Btn>
      </div>
    </AccountSection>
    <AccountSection v-show="!isClient" heading="Mitgliedschaft">
      <form v-if="!hasSubscribed" class="flex flex-col" @submit.prevent>
        <fieldset class="flex flex-col lg:flex-row lg:space-x-4 mb-4">
          <div>
            <input type="radio" name="interval" value="year" v-model="membershipForm.subscriptionInterval" />
            <label for="year" @click="membershipForm.subscriptionInterval = 'year'">499,00 € jährlich (<span class="font-semibold">17% sparen</span>)</label>
          </div>
          <div>
            <input type="radio" name="interval" value="month" v-model="membershipForm.subscriptionInterval" />
            <label for="month" @click="membershipForm.subscriptionInterval = 'month'">49,99 € monatlich</label>
          </div>
        </fieldset>
        <Btn class="w-fit mb-4" :is-loading="membershipForm.isLoading" @click="payMembershipFee">Jetzt abonnieren</Btn>
        <span class="text-gray-500 text-sm">Alle Preise verstehen sich zzgl. MwSt. Keine Verträge, jederzeit kündbar.</span>
      </form>
      <Btn v-if="hasSubscribed" class="w-fit" type="light" @click="manageBilling">Abonnement verwalten</Btn>
    </AccountSection>
  </div>
</template>

<script>
import { EmailAuthProvider } from 'firebase/auth'

export default {
  name: 'KontoEinstellungenPage',
  head() {
    return {
      title: 'Einstellungen - Traumanwalt'
    }
  },
  data() {
    return {
      changeEmailForm: {
        newEmail: '',
        password: '',
        isLoading: false
      },
      resetPasswordForm: {
        isLoading: false
      },
      membershipForm: {
        subscriptionInterval: 'year',
        isLoading: false
      }
    }
  },
  computed: {
    isClient() {
      if (!this.$store.state.userData) return false
      return this.$store.state.userData.client
    },
    currentEmail() {
      if (!this.$fire.auth.currentUser) return null
      return this.$fire.auth.currentUser.email
    },
    canUpdateEmail() {
      return this.changeEmailForm.newEmail !== '' && this.changeEmailForm.password !== ''
    },
    hasSubscribed() {
      if (!this.$store.state.userData) return false
      return this.$store.state.userData.subscribed
    }
  },
  methods: {
    async updateEmail() {
      this.changeEmailForm.isLoading = true
      const credential = EmailAuthProvider.credential(
        this.$fire.auth.currentUser.email,
        this.changeEmailForm.password
      )
      const newEmail = this.changeEmailForm.newEmail
      this.$fire.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(credential).then(async () => {
        await this.$fire.auth.currentUser.updateEmail(newEmail)
        await this.$fire.auth.currentUser.sendEmailVerification()
        this.changeEmailForm.isLoading = false
        this.$toast.success('Ihre E-Mail-Adresse wurde geändert. Bitte prüfen Sie Ihren Posteingang/Spam-Ordner. Sie haben eine Bestätigungsnachricht erhalten!')
        window.location.href = '/konto/bestaetigen'
      }).catch(error => {
        this.$toast.error(error.message)
        this.changeEmailForm.isLoading = false
      })
    },
    async resetPassword() {
      this.resetPasswordForm.isLoading = true
      await this.$fire.auth.sendPasswordResetEmail(this.$fire.auth.currentUser.email)
      this.resetPassword.isLoading = false
      this.$toast.success(`Wir haben Ihnen eine E-Mail an ${this.$fire.auth.currentUser.email} mit Anweisungen zur Änderung Ihres Passwortes geschickt!`)
    },
    async payMembershipFee() {
      this.membershipForm.isLoading = true
      /*const response = await this.$axios.$post(`/api/stripe/membership/subscribe`, {
        uid: this.$store.state.userData.id,
        email: this.$store.state.userData.email,
        subscription_interval: this.membershipForm.subscriptionInterval
      })*/
      const subject = 'Anfrage zur Mitgliedschaft'
      const body = `Ich interessiere mich für eine Mitgliedschaft bei Traumanwalt (${ this.membershipForm.subscriptionInterval === 'year' ? '499,99 € jährlich' : '49,99 € monatlich' }). Bitte kontaktieren Sie mich.`
      window.open(`mailto:support@traumanwalt.com?subject=${subject}&body=${body}`)
      this.membershipForm.isLoading = false
      //window.location.href = response.url
    },
    manageBilling() {
      window.location.href = 'https://billing.stripe.com/p/login/3csbMs730gP66L6288'
    }
  }
}
</script>
