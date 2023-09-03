<template>
  <div>
    <div class="flex space-x-4 items-center lg:mb-12">
      <div class="mb-8 md:mb-12 lg:mb-0 lg:w-3/4">
        <h1 class="text-center md:text-left mb-2">Jetzt Traumanwalt werden und neue Mandanten gewinnen</h1>
        <p class="block text-center md:text-left text-lg lg:text-xl mb-4">Präsentieren Sie sich mit einem professionellen Anwaltsprofil und stärken Sie Ihre Sichtbarkeit bei Google. Es rechnet sich schon mit einem Mandat!</p>
        <form class="flex flex-col items-center md:items-start" @submit.prevent>
          <fieldset class="flex space-x-3 sm:text-lg mb-3">
            <div>
              <input type="radio" name="year" value="year" v-model="subscriptionInterval" />
              <label for="year">jährlich (17% sparen)</label>
            </div>
            <div>
              <input type="radio" name="month" value="month" v-model="subscriptionInterval" />
              <label for="month">monatlich</label>
            </div>
          </fieldset>
          <div class="flex flex-col space-y-2 md:flex-row items-center md:space-x-4 md:space-y-0 mb-2">
            <Btn @click="$router.push('/')">Jetzt registrieren – <span>{{ subscriptionPrice }}<span class="ml-1 text-xs">/ {{ subscriptionIntervalLabel }}</span></span></Btn>
          </div>
          <span class="text-gray-500 text-center text-sm">Alle Preise verstehen sich zzgl. MwSt. Keine festen Verträge, jederzeit kündbar.</span>
        </form>
      </div>
      <div class="hidden lg:flex justify-center w-1/3">
        <img class="h-72 w-72" src="@/assets/images/traumanwalt-mitgliedschaft.png" />
      </div>
    </div>
    <h2 class="mb-6 md:mb-8">Was Sie bei uns bekommen:</h2>
    <div class="grid md:grid-cols-2 gap-4 md:gap-8">
      <div class="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4 border bg-white p-4 rounded-md shadow-md">
        <div class="lg:pt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#daba6b" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
          </svg>
        </div>
        <div>
          <h3 class="text-lg mb-1">Anwaltsprofil</h3>
          <p>Hinterlegen Sie Informationen zu Ihrer Anwaltstätigkeit: Lebenslauf, Schwerpunkte, Standorte, Sprachen, uvm.</p>
        </div>
      </div>
      <div class="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4 border bg-white p-4 rounded-md shadow-md">
        <div class="lg:pt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#daba6b" class="bi bi-chat-left-text" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </div>
        <div>
          <h3 class="text-lg mb-1">Direkt-Kontakt</h3>
          <p>Über Ihr Anwaltsprofil können potentielle Mandanten Sie direkt kontaktieren und Nachrichten mit Ihnen austauschen.</p>
        </div>
      </div>
      <div class="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4 border bg-white p-4 rounded-md shadow-md">
        <div class="lg:pt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#daba6b" class="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>
        </div>
        <div>
          <h3 class="text-lg mb-1">Fachbeiträge</h3>
          <p>Veröffentlichen Sie Fachbeiträge zu Ihren Schwerpunkten und erlangen Sie so mehr Sichtbarkeit für Ihr Anwaltsprofil.</p>
        </div>
      </div>
      <div class="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4 border bg-white p-4 rounded-md shadow-md">
        <div class="lg:pt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#daba6b" class="bi bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
          </svg>
        </div>
        <div>
          <h3 class="text-lg mb-1">Bewertungen erhalten</h3>
          <p>Erhalten Sie Bewertungen für Ihre Leistungen als Anwalt und steigern Sie damit Ihre Position in den Suchmaschinen.</p>
        </div>
      </div>
      <div class="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4 border bg-white p-4 rounded-md shadow-md">
        <div class="lg:pt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#daba6b" class="bi bi-graph-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
          </svg>
        </div>
        <div>
          <h3 class="text-lg mb-1">Statistiken</h3>
          <p>Sie erhalten für Ihr Anwaltsprofil und jeden Fachbeitrag gezielte Besucherstatistiken und Klickzahlen.</p>
        </div>
      </div>
      <div class="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4 border bg-white p-4 rounded-md shadow-md">
        <div class="lg:pt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#daba6b" class="bi bi-building" viewBox="0 0 16 16">
            <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
            <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z"/>
          </svg>
        </div>
        <div>
          <h3 class="text-lg mb-1">Kanzleiprofil</h3>
          <p>Mehr als ein Anwaltsprofil? Kein Problem – mit unserem Kanzleiprofil, welches Sie selbst verwalten können.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MitgliedschaftPage',
  head() {
    return {
      title: 'Mitgliedschaft - Traumanwalt'
    }
  },
  data() {
    return {
      subscriptionInterval: 'year'
    }
  },
  computed: {
    subscriptionIntervalLabel() {
      return this.subscriptionInterval === 'month' ? 'Monat' : 'Jahr'
    },
    subscriptionPrice() {
      return this.subscriptionInterval === 'month' ? '49,90 €' : '499,00 €'
    }
  }
}
</script>