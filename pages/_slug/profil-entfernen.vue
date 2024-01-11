<template>
  <div>
    <h1 class="mb-4">Profil von {{ fullName }} entfernen</h1>
    <p class="md:text-lg mb-4">Sehr geehrte{{ profile.salutation === 'Herr' ? 'r' : '' }} {{ profile.salutation }} {{ profile.last_name }},</p>
    <p class="md:text-lg mb-4">die Daten einiger Rechtsanwälte stammen aus öffentlich und allgemein zugänglichen Verzeichnissen. Bei diesen Daten war uns nicht ersichtlich, dass kein Interesse an der Veröffentlichung der Rechtsanwaltsdaten besteht.</p>
    <p class="md:text-lg mb-4">Es ist erfahrungsgemäß davon auszugehen, dass Rechtsanwälte ein großes Interesse daran haben, Ihre Kanzleidaten einer breiten Öffentlichkeit bekannt zu machen, um so ihren Bekanntheitsgrad zu steigern und potentielle Mandanten auf sich aufmerksam zu machen (vgl. § 27 Abs. 1 BRAO). Die listengemäße Verarbeitung, Nutzung und Speicherung der angezeigten Daten ist gemäß § 28 BDSG a.F. ebenso zulässig, wie gemäß §§ 28, 29 BDSG a.F. die Veröffentlichung der Daten ohne die Verpflichtung einer vorherigen Benachrichtigung.</p>
    <p class="md:text-lg mb-4">Wir bitten Sie von einer Abmahnung abzusehen.</p>
    <p class="md:text-lg mb-4">Sie können Ihre Daten völlig <b>kostenlos entfernen</b> lassen. Kontaktieren Sie uns hierfür einfach via E-Mail oder WhatsApp.</p>
    <p class="md:text-lg mb-6 md:mb-8"></p>
    <div class="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
      <div>
        <div class="h-28 w-28 md:h-36 md:w-36 bg-cover rounded-full" :style="`background-image: url(${require('@/assets/images/manuel-joswig.jpg')}); background-position: center 20%;`"></div>
      </div>
      <div>
        <b class="block md:text-xl">Manuel Joswig</b>
        <span class="block md:text-lg mb-2">Traumanwalt Gründer</span>
        <ul class="flex flex-col space-y-1">
          <li class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
            </svg>
            <span>support@traumanwalt.com</span>
          </li>
          <li class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
            </svg>
            <span>+49 172 763 6181</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileEntfernenPage',
  head() {
    return {
      title: `Profil von ${this.fullName} entfernen - Traumanwalt`,
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  },
  async asyncData({ app, params, redirect }) {
    const profile = await app.$axios.$get(`/api/profiles/${params.slug}`)
    if (!profile || !profile.fake) redirect('/anwaelte')
    return {
      profile
    }
  },
  computed: {
    fullName() {
      return `${this.profile.first_name} ${this.profile.last_name}`
    }
  }
}
</script>
