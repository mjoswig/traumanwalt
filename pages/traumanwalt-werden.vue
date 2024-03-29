<template>
  <div class="flex flex-col items-center justify-center">
    <div class="w-full">
      <h1 class="md:text-center mb-2">Jetzt Traumanwalt kostenlos testen</h1>
      <p class="md:text-center text-lg lg:text-xl">Überzeugen Sie sich selbst mit einem 30-tägigen Testzugang. Keine Zahlungsinformationen erforderlich.</p>
      <form class="grid md:grid-cols-2 gap-0 md:gap-8 mt-4 md:mt-8" @submit.prevent>
        <div>
          <div class="grid lg:grid-cols-2 gap-4 mb-4 md:mb-8">
            <fieldset>
              <label class="font-bold block">Anrede</label>
              <select class="border px-2 py-1 rounded-md w-full" v-model="salutation">
                <option value="Herr">Herr</option>
                <option value="Frau">Frau</option>
              </select>
            </fieldset>
            <fieldset>
              <label class="font-bold block">Titel (optional)</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihr akademischer Titel" v-model="academicTitle" />
            </fieldset>
          </div>
          <div class="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-8">
            <fieldset>
              <label class="font-bold block">Vorname</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihr Vorname" v-model="firstName" required />
            </fieldset>
            <fieldset>
              <label class="font-bold block">Nachname</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihr Nachname" v-model="lastName" required />
            </fieldset>
          </div>
          <div class="grid lg:grid-cols-2 gap-4 mb-4 md:mb-8">
            <fieldset>
              <label class="font-bold block">Adresse</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="Straße und Hausnummer" v-model="addressLine" required />
            </fieldset>
            <fieldset>
              <label class="font-bold block">Postleitzahl</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="PLZ" v-model="postalCode" required />
            </fieldset>
          </div>
          <div class="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-8">
            <fieldset>
              <label class="font-bold block">Stadt</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="Stadt" v-model="city" required />
            </fieldset>
            <fieldset>
              <label class="font-bold block">Land</label>
              <select class="border px-2 py-1 rounded-md w-full" v-model="country">
                <option v-for="(country, index) in countries" :key="index" :value="index">{{ country }}</option>
              </select>
            </fieldset>
          </div>
        </div>
        <div>
          <div class="grid lg:grid-cols-2 gap-4 mb-4 md:mb-8">
            <fieldset>
              <label class="font-bold block">E-Mail</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihre E-Mail-Adresse" type="email" v-model="email" required />
            </fieldset>
            <fieldset>
              <label class="font-bold block">Telefonnummer</label>
              <VuePhoneNumberInput class="w-full" :translations="{ countrySelectorLabel: 'Vorwahl', phoneNumberLabel: 'Ihre Telefonnummer', example: 'Beispiel:' }" default-country-code="DE" valid-color="green" v-model="phoneInput" @update="value => phone = value.formattedNumber" />
            </fieldset>
          </div>
          <fieldset class="mb-4 md:mb-8">
            <label class="font-bold block">Passwort</label>
            <PasswordInput v-model="password" required />
          </fieldset>
          <fieldset class="mb-5 md:mb-8">
            <label class="font-bold block">Passwort bestätigen</label>
            <PasswordInput v-model="confirmPassword" required />
          </fieldset>
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
import countryData from '@/assets/json/countries.json'

export default {
  name: 'TraumanwaltWerdenPage',
  head() {
    return {
      title: 'Jetzt kostenlos testen - Traumanwalt',
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  },
  data() {
    return {
      isSigningUp: false,
      salutation: 'Herr',
      academicTitle: '',
      firstName: '',
      lastName: '',
      addressLine: '',
      postalCode: '',
      city: '',
      country: 'DE',
      email: '',
      phone: '',
      phoneInput: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      countries: countryData.countries
    }
  },
  computed: {
    hasEnteredValidRegistrationData() {
      return (
        this.salutation !== ''
        && this.firstName !== ''
        && this.lastName !== ''
        && this.addressLine !== ''
        && this.postalCode !== ''
        && this.city !== ''
        && this.country !== ''
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
        //await this.$axios.$post(`https://api.telegram.org/bot${process.env.telegramBotApiKey}/sendMessage?chat_id=${process.env.telegramBotChatId}&text=${encodeURIComponent(text)}`)

        await this.$fire.auth.createUserWithEmailAndPassword(
          this.email,
          this.password
        )

        // send verification email
        await this.$fire.auth.currentUser.sendEmailVerification({
          url: 'https://traumanwalt.com/konto/anwalt'
        })

        // create user data
        await this.$axios.$post('/api/users/create', {
          firebase_uid: this.$fire.auth.currentUser.uid,
          salutation: this.salutation,
          academic_title: this.academicTitle,
          first_name: this.firstName,
          last_name: this.lastName,
          address_line: this.addressLine,
          postal_code: this.postalCode,
          city: this.city,
          country: this.country,
          mobile_number: this.phone,
          client: false
        })

        // sign in with registration data
        await this.$fire.auth.signInWithEmailAndPassword(
          this.email,
          this.password
        )

        window.setTimeout(() => {
          window.location.href = '/konto/anwalt'
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
