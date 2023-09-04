<template>
  <div>
    <div v-if="!isLoggedIn || isLoggedIn && !$route.path.startsWith('/konto')" class="flex justify-center">
      <div class="p-4 sm:p-8 wrapper flex flex-col w-full">
        <header class="mb-8 md:mb-12">
          <div class="flex items-center justify-between">
            <div>
              <nuxt-link to="/"><img class="h-10 md:h-12 w-auto" src="@/assets/images/traumanwalt-logo.png" /></nuxt-link>
            </div>
            <div class="flex items-center space-x-8">
              <div class="hidden md:flex items-center space-x-6 sm:space-x-8 sm:text-lg">
                <nuxt-link to="/" class="hidden lg:inline-block">Anwälte finden</nuxt-link>
                <nuxt-link to="/" class="hidden lg:inline-block">Rechtstipps</nuxt-link>
                <nuxt-link v-if="!$store.getters.isLoggedIn" to="/login">Login</nuxt-link>
                <nuxt-link v-if="$store.getters.isLoggedIn" to="/konto/logout">Logout</nuxt-link>
                <Btn v-if="!isLoggedIn" @click="$router.push('/mitgliedschaft')">Sie sind Anwalt?</Btn>
                <Btn v-if="isLoggedIn" @click="$router.push('/konto')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                  </svg>
                  Ihr Konto
                </Btn>
              </div>
              <div class="lg:hidden mt-1">
                <svg v-show="!showMobileMenu" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16" @click="showMobileMenu = true">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <svg v-show="showMobileMenu" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16" @click="showMobileMenu = false">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="bg-gray-100 p-4 flex-col space-y-4 rounded-md shadow-sm mt-4" :class="{ 'flex lg:hidden': showMobileMenu, 'hidden': !showMobileMenu }">
            <nuxt-link to="/">Anwälte finden</nuxt-link>
            <nuxt-link to="/">Rechtstipps</nuxt-link>
            <nuxt-link v-if="!isLoggedIn" to="/login" class="md:hidden">Login</nuxt-link>
            <nuxt-link v-if="isLoggedIn" to="/konto/logout" class="md:hidden">Logout</nuxt-link>
            <Btn v-if="!isLoggedIn" class="w-fit md:hidden" @click="$router.push('/mitgliedschaft')">Sie sind Anwalt?</Btn>
            <Btn v-if="isLoggedIn" class="w-fit md:hidden" @click="$router.push('/konto')">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
              </svg>
              Ihr Konto
            </Btn>
          </div>
        </header>
        <main class="mb-8 md:mb-12">
          <nuxt />
        </main>
        <footer class="border-t flex flex-col pt-4 md:pt-8 w-full">
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-8 lg:mb-12">
            <div>
              <img class="h-10 w-auto mb-1" src="@/assets/images/traumanwalt-logo.png" />
              <span class="block mb-2">Mit nur wenigen Klicks zum Fachanwalt Ihrer Träume!</span>
              <img class="h-10 w-auto" src="@/assets/images/serverstandort-deutschland.svg" />
            </div>
            <div>
              <h3 class="text-lg mb-2">Für Anwälte</h3>
              <ul class="flex flex-col space-y-2">
                <li><nuxt-link to="/login">Anmelden</nuxt-link></li>
                <li><nuxt-link to="/registrieren">Registrieren</nuxt-link></li>
                <li><nuxt-link to="/mitgliedschaft">Mitgliedschaft</nuxt-link></li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg mb-2">Rechtliches</h3>
              <ul class="flex flex-col space-y-2">
                <li><nuxt-link to="/agb">AGB</nuxt-link></li>
                <li><nuxt-link to="/impressum">Impressum</nuxt-link></li>
                <li><nuxt-link to="/datenschutz">Datenschutz</nuxt-link></li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg mb-2">Kontakt</h3>
              <span>support@traumanwalt.com</span>
            </div>
          </div>
          <p class="text-gray-500 text-left text-sm">Copyright &copy; {{ copyrightYear }} Traumanwalt – eine Lösung von <a href="https://joswigsolutions.com/" target="_blank">Joswig Solutions</a>. Alle Rechte vorbehalten.</p>
        </footer>
      </div>
    </div>
    <div v-if="isLoggedIn && $route.path.startsWith('/konto')">
      <div class="md:flex flex-wrap text-gray-700 w-full h-screen">
        <div class="w-full md:w-3/12 lg:w-2/12 p-4 shadow-lg">
          <div class="flex items-center justify-between">
            <nuxt-link class="w-64" to="/">
              <img class="w-40 sm:w-48 h-auto" src="@/assets/images/traumanwalt-logo.png" />
            </nuxt-link>
            <div class="md:hidden">
              <svg v-show="!showMobileMenu" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16" @click="showMobileMenu = true">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
              <svg v-show="showMobileMenu" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16" @click="showMobileMenu = false">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
              </svg>
            </div>
          </div>
          <ul class="admin-sidebar flex flex-col space-y-3 md:space-y-6 mt-5 md:mt-8" :class="{ 'hidden md:block': !showMobileMenu }">
            <li>
              <nuxt-link to="/konto" class="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-speedometer2" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
                  <path fill-rule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"/>
                </svg>
                <span>Startseite</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/konto" class="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                </svg>
                <span>Mein Profil</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/konto" class="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-telephone-outbound" style="margin-top: 0.25rem;" viewBox="0 0 16 16">
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <span>Nachrichten</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/settings" class="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                </svg>
                <span>Rechtstipps</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/konto/logout" class="flex items-center space-x-3">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-return-right" viewBox="0 0 16 16">
  						      <path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>
						      </svg>
                </span>
                <span>Logout</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="w-full md:w-9/12 lg:w-10/12">
          <div class="border-b border-white bg-orange-500 text-white px-4 py-2 sm:px-8 md:text-center flex items-center md:justify-center space-x-3 text-sm">
            Ihr Testkonto läuft in 30 Tagen ab.
          </div>
          <div class="px-4 py-6 sm:p-8">
            <Nuxt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      showMobileMenu: false
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn && this.$store.state.userData
    },
    copyrightYear() {
      const year = new Date().getFullYear()
      if (year === 2023) return year
      return `2023-${year}`
    }
  },
  watch: {
    $route() {
      this.showMobileMenu = false
    }
  }
}
</script>


<style lang="postcss">
html {
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
  line-height: 1.5;
  word-spacing: 1px;
  word-break: break-word;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: #2d3748;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

h1 {
  @apply text-4xl font-bold;
  line-height: 1.2;
}

h2 {
  @apply text-3xl font-bold;
  line-height: 1.2;
}

h3 {
  @apply text-2xl font-bold;
  line-height: 1.2;
}

h4 {
  @apply text-xl font-bold;
  line-height: 1.2;
}

h5 {
  @apply text-lg font-bold;
  line-height: 1.2;
}

h6 {
  @apply text-base font-bold;
  line-height: 1.2;
}

a {
  color: #008abd;

  &:hover {
    @apply underline;
    color: #00aff0;
  }
}

.wrapper {
  max-width: 1400px;
}

@media (max-width: 1280px) {
  h1 {
    @apply text-3xl;
  }

  h2 {
    @apply text-2xl;
  }

  h3 {
    @apply text-xl;
  }

  h4 {
    @apply text-lg;
  }

  h5 {
    @apply text-base;
  }

  h6 {
    @apply text-base;
  }
}
</style>