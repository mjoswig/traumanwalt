<template>
  <div class="flex flex-col items-center justify-center">
    <div class="w-full" style="max-width: 400px;">
      <h2 class="text-center">Login</h2>
      <form class="mt-4 md:mt-8" @submit.prevent>
        <fieldset class="mb-4 md:mb-8">
          <label class="font-bold block">E-Mail</label>
          <input class="border px-2 py-1 rounded-md w-full" type="email" v-model="email" required />
        </fieldset>
        <fieldset class="mb-4 md:mb-8">
          <label class="font-bold block">Passwort</label>
          <PasswordInput v-model="password" required />
          <p class="mt-2 text-right"><nuxt-link to="/passwort-anfordern">Passwort vergessen?</nuxt-link></p>
        </fieldset>
        <fieldset>
          <Btn class="w-full" :is-loading="isSigningIn" @click="signInUser">Einloggen</Btn>
        </fieldset>
      </form>
      <p class="mt-4">oder <nuxt-link class="font-bold" to="/registrieren">kostenlos registrieren</nuxt-link></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  head() {
    return {
      title: 'Login - Traumanwalt',
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  },
  data() {
    return {
      isSigningIn: false,
      email: '',
      password: ''
    }
  },
  computed: {
    canLogIn() {
      return this.email !== '' && this.email.indexOf('@') !== -1
    }
  },
  methods: {
    async signInUser() {
      try {
        this.isSigningIn = true

        // try login via firebase auth
        await this.$fire.auth.signInWithEmailAndPassword(
          this.email,
          this.password
        )

        // redirect user to dashboard page
        window.setTimeout(() => {
          window.location.href = '/konto/anwalt'
          this.isSigningIn = false
        }, 1000)
      } catch (e) {
        this.isSigningIn = false
        this.$toast.error(e)
      }
    }
  }
}
</script>
