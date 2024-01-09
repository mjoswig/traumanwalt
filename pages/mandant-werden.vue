<template>
  <div class="flex flex-col items-center justify-center">
    <div class="lg:w-2/3">
      <h1 class="md:text-center mb-2">Jetzt Mandant werden und beraten lassen</h1>
      <p class="md:text-center text-lg lg:text-xl">Registrieren Sie sich kostenlos und buchen Sie Beratungsleistungen.</p>
      <form class="mt-4 md:mt-8" @submit.prevent>
        <div class="grid lg:grid-cols-3 gap-4 mb-4">
          <fieldset>
            <label class="font-bold block">Anrede</label>
            <select class="border px-2 py-1 rounded-md w-full" v-model="salutation">
              <option value="Herr">Herr</option>
              <option value="Frau">Frau</option>
            </select>
          </fieldset>
          <fieldset>
            <label class="font-bold block">Vorname</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihr Vorname" v-model="firstName" required />
          </fieldset>
          <fieldset>
            <label class="font-bold block">Nachname</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihr Nachname" v-model="lastName" required />
          </fieldset>
        </div>
        <div class="grid lg:grid-cols-2 gap-4 mb-5 md:mb-8">
          <fieldset>
            <label class="font-bold block">E-Mail</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihre E-Mail-Adresse" type="email" v-model="email" required />
          </fieldset>
          <fieldset>
            <label class="font-bold block">Telefonnummer</label>
            <VuePhoneNumberInput class="w-full" :translations="{ countrySelectorLabel: 'Vorwahl', phoneNumberLabel: 'Ihre Telefonnummer', example: 'Beispiel:' }" default-country-code="DE" valid-color="green" v-model="phoneInput" @update="value => phone = value.formattedNumber" />
          </fieldset>
          <fieldset>
            <label class="font-bold block">Passwort</label>
            <PasswordInput v-model="password" required />
          </fieldset>
          <fieldset>
            <label class="font-bold block">Passwort bestätigen</label>
            <PasswordInput v-model="confirmPassword" required />
          </fieldset>
        </div>
        <div>
          <fieldset class="mb-4 md:mb-7">
            <input class="h-4 w-4" type="checkbox" v-model="acceptTerms" required />
            <label>Ich akzeptiere die <nuxt-link class="font-bold" to="/agb">AGB</nuxt-link> und <nuxt-link class="font-bold" to="/datenschutz">Datenschutzerklärung</nuxt-link> von Traumanwalt.</label>
          </fieldset>
          <fieldset>
            <Btn class="w-full sm:w-fit" :is-loading="isSigningUp" :is-disabled="!hasEnteredValidRegistrationData" @click="signUpUser">Kostenlos registrieren</Btn>
          </fieldset>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MandantWerdenPage',
  head() {
    return {
      title: 'Traummandant werden - Traumanwalt',
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  },
  data() {
    return {
      isSigningUp: false,
      salutation: 'Herr',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      phoneInput: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    }
  },
  computed: {
    hasEnteredValidRegistrationData() {
      return (
        this.salutation !== ''
        && this.firstName !== ''
        && this.lastName !== ''
        && this.email !== ''
        && this.email.indexOf('@') !== -1
        && this.phone !== ''
        && this.password !== ''
        && this.password === this.confirmPassword
        && this.acceptTerms
      )
    }
  },
  methods: {
    async signUpUser() {
      if (!this.hasEnteredValidRegistrationData) {
        return
      }

      try {
        this.isSigningUp = true

        const text = `Neue Registrierung\n\nPfad: ${this.$route.path}\nE-Mail: ${this.email}`
        await this.$axios.$post(`https://api.telegram.org/bot${process.env.telegramBotApiKey}/sendMessage?chat_id=${process.env.telegramBotChatId}&text=${encodeURIComponent(text)}`)

        await this.$fire.auth.createUserWithEmailAndPassword(
          this.email,
          this.password
        )

        // send verification email
        await this.$fire.auth.currentUser.sendEmailVerification({
          url: 'https://traumanwalt.com/konto/mandant'
        })

        // create user data
        await this.$axios.$post('/api/users/create', {
          firebase_uid: this.$fire.auth.currentUser.uid,
          salutation: this.salutation,
          first_name: this.firstName,
          last_name: this.lastName,
          mobile_number: this.phone,
          client: true
        })

        // sign in with registration data
        await this.$fire.auth.signInWithEmailAndPassword(
          this.email,
          this.password
        )

        window.setTimeout(() => {
          window.location.href = '/konto/mandant'
          this.isSigningUp = false
        }, 1000)
      } catch (e) {
        this.isSigningUp = false
        this.$toast.error(e)
      }
    }
  }
}
</script>

<style scoped>
input[type="text"], input[type="email"], select {
  height: 40px;
}
</style>
