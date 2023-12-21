<template>
  <div>
    <div class="flex space-x-4 justify-between items-center lg:mb-12">
      <div class="mb-8 md:mb-12 lg:mb-0 lg:w-1/2">
        <h1 class="text-left mb-2">Traumanwalt werden und online neue Mandanten gewinnen</h1>
        <p class="block text-left text-lg lg:text-xl mb-3 xl:mb-5">Präsentieren Sie sich mit einem professionellen Anwaltsprofil und stärken Sie Ihre Sichtbarkeit bei Google. Es rechnet sich schon mit einem Mandat!</p>
        <form class="flex flex-col items-center md:items-start" @submit.prevent>
          <fieldset class="flex flex-col xl:flex-row xl:space-x-4 lg:text-lg w-full mb-4 xl:mb-6">
            <div>
              <input type="radio" name="interval" value="year" v-model="subscriptionInterval" />
              <label for="year" @click="subscriptionInterval = 'year'">499,00 € jährlich (<span class="font-semibold">17% sparen</span>)</label>
            </div>
            <div>
              <input type="radio" name="interval" value="month" v-model="subscriptionInterval" />
              <label for="month" @click="subscriptionInterval = 'month'">49,99 € monatlich</label>
            </div>
          </fieldset>
          <Btn class="w-full md:w-fit mb-4" @click="$router.push('/traumanwalt-werden')">Jetzt 30 Tage kostenlos testen</Btn>
          <span class="text-gray-500 text-sm lg:text-base">Alle Preise verstehen sich zzgl. MwSt. Keine Verträge, jederzeit kündbar.</span>
        </form>
      </div>
      <div class="hidden lg:flex justify-center w-1/2">
        <img class="h-auto w-96" src="@/assets/images/traumanwalt-werden-illustration.png" />
      </div>
    </div>
    <h2 class="mb-6 md:mb-8 lg:mb-12">Was Sie bei uns bekommen:</h2>
    <article class="flex flex-col space-y-8 lg:space-y-16 mb-8 md:mb-12 lg:mb-16">
      <section class="flex flex-col-reverse items-center lg:flex-row lg:space-x-12">
        <div class="w-full">
          <div class="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4 mb-2 lg:mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#daba6b" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
            </svg>
            <h3>Anwaltsprofil</h3>
          </div>
          <p class="mb-4 lg:mb-8 lg:text-lg">Hinterlegen Sie Informationen zu Ihrer Anwaltstätigkeit: Lebenslauf, Schwerpunkte, Standorte, Sprachen, uvm.</p>
          <Btn class="w-fit" @click="$router.push('/traumanwalt-werden')">Kostenlos testen</Btn>
        </div>
        <div class="w-full mb-4 lg:mb-0">
          <img class="border rounded-md shadow-sm" src="@/assets/images/landing-page/traumanwalt-anwaltsprofil.png" />
        </div>
      </section>
      <section class="flex flex-col items-center space-y-4 lg:space-y-0 lg:space-x-12 lg:flex-row">
        <div class="w-full">
          <img class="border rounded-md shadow-sm" src="@/assets/images/landing-page/traumanwalt-direkt-kontakt.png" />
        </div>
        <div class="w-full">
          <div class="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4 mb-2 lg:mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#daba6b" class="bi bi-chat-left-text" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
            </svg>
            <h3>Direkt-Kontakt</h3>
          </div>
          <p class="mb-4 lg:mb-8 lg:text-lg">Über Ihr Anwaltsprofil können potentielle Mandanten Sie direkt kontaktieren und Nachrichten mit Ihnen austauschen.</p>
          <Btn class="w-fit" @click="$router.push('/traumanwalt-werden')">Kostenlos testen</Btn>
        </div>
      </section>
      <section class="flex flex-col-reverse items-center lg:flex-row lg:space-x-12">
        <div class="w-full">
          <div class="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4 mb-2 lg:mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#daba6b" class="bi bi-star" viewBox="0 0 16 16">
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
            </svg>
            <h3>Bewertungen erhalten</h3>
          </div>
          <p class="mb-4 lg:mb-8 lg:text-lg">Erhalten Sie Bewertungen für Ihre Leistungen als Anwalt und steigern Sie damit Ihre Position in den Suchmaschinen.</p>
          <Btn class="w-fit" @click="$router.push('/traumanwalt-werden')">Kostenlos testen</Btn>
        </div>
        <div class="w-full mb-4 lg:mb-0">
          <img class="border rounded-md shadow-sm" src="@/assets/images/landing-page/traumanwalt-bewertungen.png" />
        </div>
      </section>
      <section class="flex flex-col items-center space-y-4 lg:space-y-0 lg:space-x-12 lg:flex-row">
        <div class="w-full">
          <img class="border rounded-md shadow-sm" src="@/assets/images/landing-page/traumanwalt-statistiken.png" />
        </div>
        <div class="w-full">
          <div class="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4 mb-2 lg:mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#daba6b" class="bi bi-graph-up" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
            </svg>
            <h3>Besucherstatistiken</h3>
          </div>
          <p class="mb-4 lg:mb-8 lg:text-lg">Sie erhalten für Ihr Anwaltsprofil und jeden Fachbeitrag gezielte Besucherstatistiken und Klickzahlen.</p>
          <Btn class="w-fit" @click="$router.push('/traumanwalt-werden')">Kostenlos testen</Btn>
        </div>
      </section>
      <section class="flex flex-col-reverse items-center lg:flex-row lg:space-x-12">
        <div class="w-full">
          <div class="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4 mb-2 lg:mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#daba6b" class="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
            <h3>Rechtstipps</h3>
          </div>
          <p class="mb-4 lg:mb-8 lg:text-lg">Veröffentlichen Sie Fachbeiträge zu Ihren Schwerpunkten und erlangen Sie so mehr Sichtbarkeit für Ihr Anwaltsprofil.</p>
          <Btn class="w-fit" @click="$router.push('/traumanwalt-werden')">Kostenlos testen</Btn>
        </div>
        <div class="w-full mb-4 lg:mb-0">
          <img class="border rounded-md shadow-sm" src="@/assets/images/landing-page/traumanwalt-rechtstipps.png" />
        </div>
      </section>
      <section class="flex flex-col items-center space-y-4 lg:space-y-0 lg:space-x-12 lg:flex-row">
        <div class="w-full">
          <img class="border rounded-md shadow-sm" src="@/assets/images/landing-page/traumanwalt-kanzleiprofil.png" />
        </div>
        <div class="w-full">
          <div class="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4 mb-2 lg:mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#daba6b" class="bi bi-building" viewBox="0 0 16 16">
              <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
              <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z"/>
            </svg>
            <h3>Kanzleiprofil</h3>
          </div>
          <p class="mb-4 lg:mb-8 lg:text-lg">Mehr als ein Anwaltsprofil? Kein Problem – mit unserem Kanzleiprofil, welches Sie selbst verwalten können.</p>
          <Btn class="w-fit" @click="$router.push('/traumanwalt-werden')">Kostenlos testen</Btn>
        </div>
      </section>
    </article>
    <div class="relative flex items-center justify-center bg-cover sm:h-48 lg:h-72 border p-4 rounded-md" :style="`background-image: url(${require('@/assets/images/traumanwalt-clients.jpeg')}); background-position: 50% 0;`">
      <div class="absolute top-0 left-0 h-full w-full opacity-30 bg-black rounded-md"></div>
      <div class="flex flex-col lg:items-center z-10 text-white lg:text-center lg:w-96 lg:px-0 lg:-ml-40">
        <h2 class="text-xl xl:text-2xl mb-3 lg:mb-4">Werden Sie als Anwalt sichtbar: Wir helfen Ihnen schneller über Google gefunden zu werden</h2>
        <Btn @click="$router.push('/traumanwalt-werden')">Traumanwalt-Profil erstellen</Btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MitgliedschaftPage',
  head() {
    return {
      title: 'Mitgliedschaft - Traumanwalt',
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  },
  data() {
    return {
      subscriptionInterval: 'year'
    }
  }
}
</script>