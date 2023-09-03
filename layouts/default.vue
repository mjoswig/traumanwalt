<template>
  <div class="flex justify-center">
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
              <nuxt-link to="/">Login</nuxt-link>
              <Btn>Sie sind Anwalt?</Btn>
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
          <nuxt-link to="/" class="md:hidden">Login</nuxt-link>
          <Btn class="w-fit md:hidden">Sie sind Anwalt?</Btn>
        </div>
      </header>
      <main class="mb-8 md:mb-12">
        <nuxt />
      </main>
      <footer class="border-t flex flex-col pt-4 md:pt-8 w-full">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-8 lg:mb-12">
          <div>
            <img class="h-10 md:h-12 w-auto mb-1" src="@/assets/images/traumanwalt-logo.png" />
            <p class="mb-2">In nur wenigen Klicks zum passenden Fachanwalt!</p>
            <img class="h-10 md:h-12 w-auto" src="@/assets/images/serverstandort-deutschland.svg" />
          </div>
          <div>
            <h3 class="text-lg mb-2">Für Anwälte</h3>
            <ul class="flex flex-col space-y-2">
              <li><nuxt-link to="/">Anmelden</nuxt-link></li>
              <li><nuxt-link to="/">Registrieren</nuxt-link></li>
              <li><nuxt-link to="/">Mitgliedschaft</nuxt-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg mb-2">Rechtliches</h3>
            <ul class="flex flex-col space-y-2">
              <li><nuxt-link to="/impressum">Impressum</nuxt-link></li>
              <li><nuxt-link to="/agb">AGB</nuxt-link></li>
              <li><nuxt-link to="/datenschutz">Datenschutz</nuxt-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg mb-2">Kontakt</h3>
            <span>support@traumanwalt.com</span>
          </div>
        </div>
        <p class="text-left text-sm">Copyright &copy; {{ copyrightYear }} Traumanwalt – eine Lösung von <a href="https://joswigsolutions.com/" target="_blank">Joswig Solutions</a>. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMobileMenu: false
    }
  },
  computed: {
    copyrightYear() {
      const year = new Date().getFullYear()
      if (year === 2023) return year
      return `2023-${year}`
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
  color: #4477ce;

  &:hover {
    @apply underline;
    color: #8cabff;
  }
}

.text-brand {
  color: #512b81;
}

.bg-brand {
  background-color: #35155d;
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