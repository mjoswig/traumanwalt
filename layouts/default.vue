<template>
  <div v-if="!isLoading">
    <div v-show="showPublicLayout" class="flex justify-center">
      <div class="p-4 sm:p-8 wrapper flex flex-col w-full">
        <header class="mb-8 md:mb-12">
          <div class="flex items-center justify-between">
            <div>
              <nuxt-link to="/"><img class="h-10 md:h-12 w-auto" src="@/assets/images/traumanwalt-logo.png" /></nuxt-link>
            </div>
            <div class="flex items-center space-x-8">
              <div class="hidden md:flex items-center space-x-6 sm:space-x-8 sm:text-lg">
                <nuxt-link to="/anwaelte" class="hidden lg:inline-block">Anwälte finden</nuxt-link>
                <nuxt-link to="/rechtstipps" class="hidden lg:inline-block">Rechtstipps</nuxt-link>
                <nuxt-link v-show="!$store.getters.isLoggedIn" to="/login">Login</nuxt-link>
                <nuxt-link v-show="$store.getters.isLoggedIn" to="/konto/logout">Logout</nuxt-link>
                <Btn v-show="!isLoggedIn" @click="$router.push('/mitgliedschaft')">Sie sind Anwalt?</Btn>
                <Btn v-show="isLoggedIn" @click="$router.push('/konto')">
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
            <nuxt-link to="/anwaelte">Anwälte finden</nuxt-link>
            <nuxt-link to="/rechtstipps">Rechtstipps</nuxt-link>
            <nuxt-link v-show="!isLoggedIn" to="/login" class="md:hidden">Login</nuxt-link>
            <nuxt-link v-show="isLoggedIn" to="/konto/logout" class="md:hidden">Logout</nuxt-link>
            <Btn v-show="!isLoggedIn" class="w-fit md:hidden" @click="$router.push('/mitgliedschaft')">Sie sind Anwalt?</Btn>
            <Btn v-show="isLoggedIn" class="w-fit md:hidden" @click="$router.push('/konto')">
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
              <span class="block mb-2">Mit nur wenigen Klicks zum Rechtsanwalt Ihrer Träume!</span>
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
    <div v-show="!showPublicLayout">
      <div class="md:flex flex-wrap text-gray-700 w-full h-screen">
        <div class="w-full md:w-1/3 lg:w-1/5 p-4 shadow-lg">
          <div class="flex items-center justify-between">
            <nuxt-link class="w-64" to="/konto">
              <img class="w-40 sm:w-56 h-auto" src="@/assets/images/traumanwalt-logo.png" />
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
          <ul class="admin-sidebar md:text-lg flex flex-col space-y-3 md:space-y-6 mt-3 md:mt-6" :class="{ 'hidden md:block': !showMobileMenu }">
            <li class="flex flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2 xl:flex-row xl:space-x-2 xl:space-y-0 items-center md:items-start xl:items-center">
              <div>
                <img class="bg-cover border h-10 w-10 md:h-12 md:w-12 rounded-full" :style="`background-image: url(${photoUrl});`" />
              </div>
              <div>
                <b class="block text-base" style="margin-bottom: -6px; margin-top: 2px;">{{ fullName }}</b>
                <nuxt-link class="text-sm" :to="profileUrl">Zum Anwaltsprofil</nuxt-link>
              </div>
            </li>
            <li v-show="!trialExpired || hasSubscribed">
              <nuxt-link to="/konto" class="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-speedometer2 h-5 w-5 md:h-6 md:w-6" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
                  <path fill-rule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"/>
                </svg>
                <span>Startseite</span>
              </nuxt-link>
            </li>
            <li v-show="!trialExpired || hasSubscribed">
              <nuxt-link to="/konto" class="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person h-5 w-5 md:h-6 md:w-6" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                </svg>
                <span>Mein Profil</span>
              </nuxt-link>
            </li>
            <li v-show="!trialExpired || hasSubscribed">
              <nuxt-link to="/konto" class="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-building h-5 w-5 md:h-6 md:w-6" viewBox="0 0 16 16">
                  <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
                  <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z"/>
                </svg>
                <span>Kanzleiprofil</span>
              </nuxt-link>
            </li>
            <li v-show="!trialExpired || hasSubscribed">
              <nuxt-link to="/konto" class="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chat-left-text h-5 w-5 md:h-6 md:w-6" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <span>Nachrichten</span>
              </nuxt-link>
            </li>
            <li v-show="!trialExpired || hasSubscribed">
              <nuxt-link to="/konto" class="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil h-5 w-5 md:h-6 md:w-6" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
                <span>Rechtstipps</span>
              </nuxt-link>
            </li>
            <li v-show="!trialExpired || hasSubscribed">
              <nuxt-link to="/konto" class="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-star h-5 w-5 md:h-6 md:w-6" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                </svg>
                <span>Bewertungen</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/konto/einstellungen" class="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-gear h-5 w-5 md:h-6 md:w-6" viewBox="0 0 16 16">
                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                </svg>
                <span>Einstellungen</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/konto/logout" class="flex items-center space-x-3">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-return-right h-5 w-5 md:h-6 md:w-6" viewBox="0 0 16 16">
  						      <path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>
						      </svg>
                </span>
                <span>Logout</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="w-full md:w-2/3 lg:w-4/5">
          <div v-show="!trialExpired && !hasSubscribed" class="text-orange-700 px-4 text-sm sm:text-base sm:px-8 py-3" style="background-color: rgb(255, 245, 236);">
            Ihre kostenlose Testphase endet in <b>{{ trialDaysRemaining }} Tag{{ trialDaysRemaining !== 1 ? 'en': '' }}</b>. <nuxt-link to="/konto/einstellungen">Bitte klicken Sie hier</nuxt-link>, um Mitglied zu werden.
          </div>
          <div v-show="trialExpired && !hasSubscribed" class="bg-red-100 text-red-700 px-4 text-sm sm:text-base sm:px-8 py-3">
            Ihre kostenlose Testphase ist abgelaufen. Bitte schließen Sie eine Mitgliedschaft ab, um Ihr Traumanwalt-Profil zu reaktivieren.
          </div>
          <div v-show="$route.query.subscribed && hasSubscribed" class="bg-green-100 text-green-700 px-4 text-sm sm:text-base sm:px-8 py-3">
            Herzlichen Glückwunsch, Sie sind jetzt <b>Traumanwalt</b>! Ihr Account wurde soeben für die uneingeschränkte Nutzung freigeschaltet.
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
      isLoading: true,
      showMobileMenu: false
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    showPublicLayout() {
      return (
        !this.isLoggedIn ||
        this.isLoggedIn && (
          this.$route.path === '/konto/bestaetigen' ||
          this.$route.path === '/konto/logout' ||
          !this.$route.path.startsWith('/konto')
        )
      )
    },
    trialDaysRemaining() {
      if (!this.$store.state.userData) return 0
      const trialExpirationDate = new Date(this.$store.state.userData.trial_expires_at)
      return Math.ceil(Math.round(trialExpirationDate - new Date()) / (24 * 60 * 60 * 1000))
    },
    trialExpired() {
      return this.trialDaysRemaining <= 0
    },
    hasSubscribed() {
      if (!this.$store.state.userData) return false
      return this.$store.state.userData.subscribed
    },
    photoUrl() {
      if (!this.$store.state.userData) return null
      return this.$store.state.userData.photo_url || require('@/assets/images/photo-default.jpeg')
    },
    profileUrl() {
      if (!this.$store.state.userData) return '/konto'
      return `/${this.$store.state.userData.slug}`
    },
    fullName() {
      if (!this.$store.state.userData) return
      const firstName = this.$store.state.userData.first_name
      const lastName = this.$store.state.userData.last_name
      return `${firstName} ${lastName}`
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
  },
  created() {
    this.$nextTick(() => {
      this.isLoading = false
    })
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