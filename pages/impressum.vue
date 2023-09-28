<template>
  <div>
    <h1 class="mb-4">Impressum</h1>
    <p class="mb-4">Inhaltlich verantwortlich gem. § 55 Staatsvertrag für Rundfunk und Telemedien (Rundfunk-Staatsvertrag) und Anbieter gem. § 5 Telemediengesetz (TMG) ist:</p>
    <p class="mb-1">Joswig Solutions UG (haftungsbeschränkt)</p>
    <p class="mb-1">Schaperstraße 14</p>
    <p class="mb-4">10719 Berlin</p>
    <p>Handelsregister: Amtsgericht Charlottenburg (HRB 204652)</p>
    <p class="mb-4">Umsatzsteuer-Identifikationsnummer: DE321357009</p>
    <p class="mb-4">E-Mail: support@traumanwalt.com</p>
    <p class="mb-4">Verantwortlich für den Inhalt nach § 18 MStV: Manuel Joswig</p>
    <p>Informationen zur alternativen Streitbeilegung nach Art. 14 Abs. 1 Verordnung (EU) Nr. 524/2013 (ODR-Verordnung) und nach § 36 VSBG (Verbraucherstreitbeilegungsgesetz):</p>
    <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter <a href="http://ec.europa.eu/consumers/odr/" target="_blank">http://ec.europa.eu/consumers/odr/</a> finden. Wir sind nicht bereit und auch nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
  </div>
</template>

<script>
export default {
  name: 'ImpressumPage',
  head() {
    return {
      title: 'Impressum - Traumanwalt',
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  }
}
</script>
